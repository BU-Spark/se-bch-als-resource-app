import { NextApiRequest, NextApiResponse } from "next";
import {
  COMMUNICATION_FORM_ID,
  TYPEFORM_API_URL,
} from "../../constants/globals";
import {
  IQuestionList,
  IQuestion,
  IAttachment,
} from "../../types/api_types";

import {
  getYouTubeEmbedUrl,
  extractBetweenResources,
  removeResourcesSection,
} from "../../utils/apiUtils";


export default async function retrieveQuestions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { flowName } = req.query;
  //flowName would be either communication, computer-access, home-access, or smart-phone-access. This is the name of the form that we want to retrieve the questions for.
  if (flowName === "communication") {
    try {
      const response = await fetch(
        `${TYPEFORM_API_URL}/forms/${COMMUNICATION_FORM_ID}`
      );
      const data = await response.json();

      // Transform fields to IQuestion[]
      const questions: IQuestion[] = data.fields.map((field: any) => {
        const descriptionWithResources = field.properties.description || "";
        const descriptionWithoutResources = field.properties.description
          ? removeResourcesSection(field.properties.description)
          : "";
        const attachmentUrl = field.attachment
          ? getYouTubeEmbedUrl(field.attachment.href)
          : null;
        const attachmentItem: IAttachment | undefined = attachmentUrl
          ? {
              type: field.attachment.type,
              href: attachmentUrl,
            }
          : undefined;
        const question: IQuestion = {
          id: field.id,
          title: field.title,
          ref: field.ref,
          type: field.type,
          attachment: attachmentItem,
          choices: field.properties.choices?.map((choice: any) => {
            // Find the logic action that corresponds to this choice
            const action = data.logic.find(
              (logic: any) =>
                logic.ref === field.ref &&
                logic.actions.some((a: any) =>
                  a.condition.vars.some(
                    (v: any) => v.type === "choice" && v.value === choice.ref
                  )
                )
            );

            // Find the 'to' value in the actions
            const toValue = action?.actions.find((a: any) =>
              a.condition.vars.some(
                (v: any) => v.type === "choice" && v.value === choice.ref
              )
            )?.details.to.value;

            return {
              id: choice.id,
              ref: choice.ref,
              label: choice.label,
              link: toValue, // Set the link to the ref ID of the next question
            };
          }),
          description: descriptionWithoutResources,
        };

        const resourceMatch = extractBetweenResources(descriptionWithResources);

        if (field.type === "statement" && resourceMatch) {
          console.log("found URL");

          const cleanedResourceString = resourceMatch.replace(
            /\[https?:\/\/[^\]]+\]\((https?:\/\/[^\)]+)\)/g,
            "$1"
          );
          //console.log("resourceMatch", cleanedResourceString);
          try {
            const resourceData: Array<{ title: string; url: string }> =
              JSON.parse(cleanedResourceString);

            question.solutions = resourceData.map((rd) => ({
              id: field.ref,
              title: rd.title,
              url: rd.url,
            }));
          } catch (jsonParseError) {
            console.error(
              "Error parsing JSON from resources tag",
              jsonParseError
            );
            // Handle error or set default values if required
          }
        }

        return question;
      });

      const questionList: IQuestionList = {
        questions: questions,
        logic: data.logic,
      };

      res.status(200).json(questionList);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Invalid flowName" });
  }
}
