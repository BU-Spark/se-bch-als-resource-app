import { NextApiRequest, NextApiResponse } from 'next';
import { COMMUNICATION_FORM_ID, TYPEFORM_API_URL } from '../../constants/globals';
import {
    IChoice, ILogic, IQuestionList, IQuestion, ISolution, IBodyContent
} from '../../types/api_types';

export default async function retrieveQuestions(req: NextApiRequest, res: NextApiResponse) {
    const { flowName } = req.query; 
    //flowName would be either communication, computer-access, home-access, or smart-phone-access. This is the name of the form that we want to retrieve the questions for. 
        if (flowName === 'communication') {
            try {
                const response = await fetch(`${TYPEFORM_API_URL}/forms/${COMMUNICATION_FORM_ID}`);
                const data = await response.json();
    
                // Transform fields to IQuestion[]
                const questions: IQuestion[] = data.fields.map((field: any) => {
                    const question: IQuestion = {
                        id: field.id,
                        title: field.title,
                        ref: field.ref,
                        type: field.type,
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
                        description: field.properties.description
                    };

    
                    const resourceTagPattern = /\[\\\*resources\\\*\] \{[^}]*\} \[\\\*resources\\\*\]/;
                    const resourceMatch = resourceTagPattern.exec(field.properties.description);
                    if (field.type === 'statement' && resourceMatch) {
                        console.log("found URL");
                        const tagPattern = /{([^}]*)}/;
                        const tagMatch = tagPattern.exec(resourceMatch[0]);
                        if (tagMatch) {
                            const tagValue = tagMatch[1];
                            const resourceString = `{${tagValue.replace(/\[https?:\/\/[^\]]+\]\((https?:\/\/[^\)]+)\)/g, '$1')}}`;
               
    
                        try {
                            const resourceData = JSON.parse(resourceString);
                            question.solutions = [{
                                id: field.ref,
                                title: resourceData.title,
                                url: resourceData.url
                            }];
                        } catch (jsonParseError) {
                            console.error("Error parsing JSON from resources tag", jsonParseError);
                            // Handle error or set default values if required
                        }
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
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(400).json({ error: 'Invalid flowName' });
        }
    }