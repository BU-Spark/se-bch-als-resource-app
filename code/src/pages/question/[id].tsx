import Title from '../../components/Title/Titles'
import { Stack, Text} from '@mantine/core';
import { bodyContentUseStyles } from '../../components/MainBody/HelperFunctions/BodyContentStyle';
import { IChoice, IQuestion, ISolution } from "@/types/api_types";
import { useEffect, useState } from "react";
import { getNextQuestionOrSolution, getQuestionNChoices } from "../api/getAPI";
import ToggleButton from "../../components/MainBody/TogglebButton";
import { useRouter } from 'next/router';
import Link from "next/link";



const Questionnaire = () => {
    const { classes } = bodyContentUseStyles();
    const router = useRouter();
    
    let [category, setCategory] = useState<string>("Home")
    let [question, setQuestion] = useState<IQuestion>({id: "", title:""})
    let [currChoices, setCurChoices] = useState<IChoice[] >([])
    let [nextQuestionOrSolutions, setNextQuestionOrSolutions] = useState<{nextQuestion: IQuestion, solution: ISolution}[]>([])

    const getData = async(questionId: string) => {
        const {question, choices} = await getQuestionNChoices(questionId)
        // TODO:
        // get the category based on the questionId
        // setCategory()
        setCategory("Communication")
        setQuestion(question)
        setCurChoices(choices)
        for (var choice of choices) {
            const {nextQuestion, solution}  = await getNextQuestionOrSolution(choice.id)
            setNextQuestionOrSolutions(current => [...current, {nextQuestion: nextQuestion, solution: solution}])
        }
    }
    
    
    useEffect(() => {
        const { id } = router.query
        if (id) {
            setNextQuestionOrSolutions([])
            console.log(id)
            getData(id as string)
        }
    }, [router.query])



    return (
        <>
        <Title hasPrev={true} router={router} titleImg={`/titleImg${category}.png`} title={category} />
        <Stack
            spacing="xl"
            className={classes.outer}
            sx={(theme) => ({
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            })}
        >
            <Text className={classes.text}> {question.title} </Text>
            {nextQuestionOrSolutions.length > currChoices.length && nextQuestionOrSolutions.length == currChoices.length*2?
            currChoices.map((choice, index) => (  
                <div key={choice.id}>
                    {nextQuestionOrSolutions[index*2].nextQuestion.id == ""?
                        <ToggleButton title={choice.title} />:
                        <Link href={`/question/${nextQuestionOrSolutions[index*2].nextQuestion.id}`}>
                            <ToggleButton title={choice.title} />
                        </Link>
                    }
                </div>)):
            nextQuestionOrSolutions.length == currChoices.length?
            currChoices.map((choice, index) => (  
                <div key={choice.id}>
                    {nextQuestionOrSolutions[index].solution.id != ""? // next page is solution
                        <Link href={`/solution/${nextQuestionOrSolutions[index].solution.id}`}>
                            <ToggleButton title={choice.title} />
                        </Link>
                    :
                    nextQuestionOrSolutions[index].nextQuestion.id == ""?  // next page is question
                        <ToggleButton title={choice.title} />:
                        <Link href={`/question/${nextQuestionOrSolutions[index].nextQuestion.id}`}>
                            <ToggleButton title={choice.title} />
                        </Link>
                    }
                </div>)):
            <></>} 
        </Stack>
        
        </>
    )

}

export default Questionnaire