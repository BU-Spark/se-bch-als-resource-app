import React, { useEffect, useState } from 'react'
import Title from '../components/Title/Titles'
import { Stack, Text} from '@mantine/core';
import { IChoice, IQuestion } from '@/types/api_types';
import { bodyContentUseStyles } from '../components/MainBody/HelperFunctions/BodyContentStyle';
import { getChoices, getNextQuestionOrSolution } from './api/getAPI';
import ToggleButton from '../components/MainBody/TogglebButton';
import Link from "next/link";
import { useRouter } from 'next/router';

const HomePage = () => {
  const { classes } = bodyContentUseStyles();
  const router = useRouter();

  const question = {id: "1", title:"How can I assist you?"}
  let [currChoices, setCurChoices] = useState<IChoice[]>([])
  let [nextQuestions, setNextQuestions] = useState<IQuestion[]>([])


  const getAllChoices = async (questionId: string) => {
    const choices = await getChoices(questionId)
    setCurChoices(choices)
    for (var choice of choices) {
      const {nextQuestion} = await getNextQuestionOrSolution(choice.id)
      setNextQuestions(current => [...current, nextQuestion])
    }
  }


  useEffect(() => {
    getAllChoices(question.id)
  }, [])


  
  return (
    <div>
      <Title hasPrev={false} router={router} titleImg={"/titleimghome.PNG"} title={"Home"} />
      <Stack
        spacing="xl"
        className={classes.outer}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        })}
      >
        <Text className={classes.text}> {question.title} </Text>
        {nextQuestions.length == currChoices.length*2?
        currChoices.map((choice, index) => (  
        <div key={choice.id}>
          {nextQuestions[index*2].id == ""?
            <ToggleButton title={choice.title} />:
            <Link href={`/question/${nextQuestions[index*2].id}`}>
              <ToggleButton title={choice.title} />
            </Link>
          }
        </div>
        )):
        <></>} 
      </Stack>
     </div>
  )
}
export default HomePage


