import { IChoice, IQuestion, ISolution } from '@/types/api_types';
import { API_URL } from '@/constants/globals';


const fetchAnyData = async (APIURL:string): Promise<any> => {
    const res = await fetch(APIURL, {
      method: "GET",
      });
    return await res.json();
}


// Get the choices of the Question based on questionId
export const getChoices = async(questionId: string) => {
    let choices_list : IChoice[] = []
    const choice_json = await fetchAnyData(API_URL+"/api/question-to-choice-maps/"+questionId+"?populate=*")
    for (const element of choice_json.data.attributes.question_to_choices.data) {
        choices_list.push({id: element.id, title: element.attributes.ChoiceName})
    }
    return choices_list
}


// Get the Question and Choiecs based on questionId
export const getQuestionNChoices = async(questionId: string) => {
    let question: IQuestion = {id:"", title:""}
    let choices_list : IChoice[] = []

    const response = await fetchAnyData(API_URL+"/api/question-to-choice-maps/"+questionId+"?populate=*")
    
    question = {
        id: response.data.id,
        title: response.data.attributes.QuestionName
    }
    
    for (const element of response.data.attributes.question_to_choices.data) {
        choices_list.push({id: element.id, title: element.attributes.ChoiceName})
    }
    return {question: question, choices: choices_list}
}



export const getPrevQuestion = async(choiceId: string) => {
    let prevQuestion: IQuestion = {id:"", title:""}
    const question_json = await fetchAnyData(API_URL+"/api/choice-to-question-maps/"+choiceId+"?populate=*")
    prevQuestion = {
        id: question_json.data.attributes.previous_questions_connected.data[0].id,
        title: question_json.data.attributes.previous_questions_connected.data[0].attributes.QuestionName
    }
    return prevQuestion
}


// Get the next question based on choiceId
export const getNextQuestion = async(choiceId: string) => {
    let nextQuestion: IQuestion = {id:"", title:""}
    let solution : ISolution = {id: "", title: ""}
    const question_json = await fetchAnyData(API_URL+"/api/choice-to-question-maps/"+choiceId+"?populate=*")
    
    if (question_json.data.attributes.choice_to_question.data == null){
        return nextQuestion
    }
    
    nextQuestion = {
        id: question_json.data.attributes.choice_to_question.data.id,
        title: question_json.data.attributes.choice_to_question.data.attributes.QuestionName
    }
    return nextQuestion
}