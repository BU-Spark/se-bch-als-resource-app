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
            const questions: IQuestion[] = data.fields.map((field: any) => ({
                id: field.id,
                title: field.title,
                ref: field.ref,
                type: field.type,
                choices: field.properties.choices?.map((choice: any) => ({
                    id: choice.id,
                    ref: choice.ref,
                    label: choice.label,
                    link: choice.link || null
                })),
                description: field.properties.description
            }));

            
            const logic: ILogic[] = data.logic;

            const questionList: IQuestionList = {
                questions: questions,
                logic: logic
            };

            res.status(200).json(questionList);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'Invalid flowName' });
    }
}