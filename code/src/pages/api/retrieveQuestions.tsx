import { NextApiRequest, NextApiResponse } from 'next';
import { COMMUNICATION_FORM_ID, TYPEFORM_API_URL } from '../../constants/globals';
import {
    IChoice, ILogic, IQuestionList, IQuestion, IAttachment,ISolution, IBodyContent
} from '../../types/api_types';

function getYouTubeEmbedUrl(url:string) {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    } else {
        
        return null;
    }
}


function extractBetweenResources(text: string): string | null {
    const startTag = "[\\*resources\\*]";
    const endTag = "[\\*resources\\*]";
    const startIndex = text.indexOf(startTag);
    const endIndex = text.indexOf(endTag, startIndex + startTag.length);

    if (startIndex === -1 || endIndex === -1) {
        return null; // One of the tags not found
    }

    return text.substring(startIndex + startTag.length, endIndex).trim();
}

function removeResourcesSection(text: string): string {
    const startTag = "[\\*resources\\*]";
    const endTag = "[\\*resources\\*]";
    const startIndex = text.indexOf(startTag);
    const endIndex = text.indexOf(endTag, startIndex + startTag.length);

    if (startIndex === -1 || endIndex === -1) {
        return text; // Tags not found, return original text
    }

    // Get the part of the string before the start tag and after the end tag
    const beforeStartTag = text.substring(0, startIndex);
    const afterEndTag = text.substring(endIndex + endTag.length);

    // Combine these two parts to form the new string
    return (beforeStartTag + afterEndTag).trim();
}

export default async function retrieveQuestions(req: NextApiRequest, res: NextApiResponse) {
    const { flowName } = req.query; 
    //flowName would be either communication, computer-access, home-access, or smart-phone-access. This is the name of the form that we want to retrieve the questions for. 
        if (flowName === 'communication') {
            try {
                const response = await fetch(`${TYPEFORM_API_URL}/forms/${COMMUNICATION_FORM_ID}`);
                const data = await response.json();
         
    
                // Transform fields to IQuestion[]
                const questions: IQuestion[] = data.fields.map((field: any) => {
                const descriptionWithResources = field.properties.description || '';
                const descriptionWithoutResources = field.properties.description ? removeResourcesSection(field.properties.description) : "";
                const attachmentUrl = field.attachment ? getYouTubeEmbedUrl(field.attachment.href) : null;
                const attachmentItem: IAttachment | undefined = attachmentUrl ? {
                    type: field.attachment.type,
                    href: attachmentUrl
                } : undefined;
                const question: IQuestion = {
                        id: field.id,
                        title: field.title,
                        ref: field.ref,
                        type: field.type,
                        attachment: attachmentItem,
                        choices: field.properties.choices?.map((choice: any) => {
                            // Find the logic action that corresponds to this choice
                            const action = data.logic.find((logic: any) => 
                                logic.ref === field.ref &&
                                logic.actions.some((a: any) => 
                                    a.condition.vars.some((v: any) => 
                                        v.type === "choice" && v.value === choice.ref
                                    )
                                )
                            );
        
                            // Find the 'to' value in the actions
                            const toValue = action?.actions.find((a: any) => 
                                a.condition.vars.some((v: any) => 
                                    v.type === "choice" && v.value === choice.ref
                                )
                            )?.details.to.value;
                           
                            return {
                                id: choice.id,
                                ref: choice.ref,
                                label: choice.label,
                                link: toValue // Set the link to the ref ID of the next question
                            };
                        }),
                        description: descriptionWithoutResources
                        
                    };

                    const resourceMatch = extractBetweenResources(descriptionWithResources)

                   
                    if (field.type === 'statement' && resourceMatch) {
                        console.log("found URL");
                        
                        const cleanedResourceString = resourceMatch.replace(/\[https?:\/\/[^\]]+\]\((https?:\/\/[^\)]+)\)/g, '$1');
                        console.log("resourceMatch", cleanedResourceString);
                        try {
                        const resourceData: Array<{ title: string; url: string }> = JSON.parse(cleanedResourceString);

                        question.solutions = resourceData.map(rd => ({
                            id: field.ref,
                            title: rd.title,
                            url: rd.url
                        }));

                    
                        } catch (jsonParseError) {
                            console.error("Error parsing JSON from resources tag", jsonParseError);
                            // Handle error or set default values if required
                        }
                    }
                    
    
    
                    return question;
                
                });
    
                const questionList: IQuestionList = {
                    questions: questions,
                    logic: data.logic 
                };
    
                res.status(200).json(questionList);
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(400).json({ error: 'Invalid flowName' });
        }
    }