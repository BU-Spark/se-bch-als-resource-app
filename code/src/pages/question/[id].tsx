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
    
    // current category state
    let [category, setCategory] = useState<string>("Home")
    
    // current question state
    let [question, setQuestion] = useState<IQuestion>({id: "", title:""})
    
    // current choices state
    let [currChoices, setCurChoices] = useState<IChoice[] >([])
    
    // nextChoice or solution of each currentChoice
    let [nextQuestionOrSolutions, setNextQuestionOrSolutions] = useState<{nextQuestion: IQuestion, solution: ISolution}[]>([])

    
    /**
     * Get the data based on current questionId
     * @param questionId: id of the question
     */
    const getData = async(questionId: string) => {
        const {question, choices} = await getQuestionNChoices(questionId)
        // TODO:
        // get the category based on the questionId
        // setCategory()
        setCategory("Communication")
        setQuestion(question)
        setCurChoices(choices)

        // Iterates through the currentCoices array and get it's nextQuestionOrSolution
        for (var choice of choices) {
            const {nextQuestion, solution}  = await getNextQuestionOrSolution(choice.id)
            setNextQuestionOrSolutions(current => [...current, {nextQuestion: nextQuestion, solution: solution}])
        }
    }
    
    
    /**
     * Get data when routes to a new question page (question/[id])
     */
    useEffect(() => {
        const { id } = router.query
        if (id) {
            setNextQuestionOrSolutions([])
            console.log(id)
            getData(id as string)
        }
    }, [router.query])


    /**
     * Function use to display the choice component
     * @param choice current choice
     * @param index in the nextQuestionOrSolutions array
     * @returns the coice component
     */
    const renderChoiceComponent = (choice: IChoice, index: number) => {
        return (
            <div key={choice.id}>
                {
                nextQuestionOrSolutions[index].solution.id != "" ? // Next page is solution
                    // Route to the specific solution page (solution/[solutionId])
                    <Link href={`/solution/${nextQuestionOrSolutions[index].solution.id}`}>
                        <ToggleButton title={choice.title} />
                    </Link>
                :
                nextQuestionOrSolutions[index].nextQuestion.id == "" ? // Next page is question
                    // Didn't set up the next question for this choice in backend yet, will not trigger the routing
                    <ToggleButton title={choice.title} />:
                    // Route to the specific question page (question/[questionId])
                    <Link href={`/question/${nextQuestionOrSolutions[index].nextQuestion.id}`}>
                        <ToggleButton title={choice.title} />
                    </Link>
                }
            </div>
        )
    }


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
            {/* Dispaly the current question */}
            <Text className={classes.text}> {question.title} </Text>
            
            {/* Display the current choices and will route to the specific quesiton page or solution page based on nextQuestionOrSolutions array */}
            {
            // Make sure all the data gets (page renders twice)
            nextQuestionOrSolutions.length > currChoices.length && nextQuestionOrSolutions.length == currChoices.length*2?
            // Iterates through the currentCoices array and render the current choice component
            currChoices.map((choice, index) => (
                renderChoiceComponent(choice, index*2)
            )):
            // Make sure all the data gets (page renders once)
            nextQuestionOrSolutions.length == currChoices.length?
            // Iterates through the currentCoices array and render the current choice component
            currChoices.map((choice, index) => (  
                renderChoiceComponent(choice, index)
            )):
            // Did not get all the data yet
            <></>} 
        </Stack>
        
        </>
    )

}

export default Questionnaire