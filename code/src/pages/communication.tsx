import { useState, useEffect, useRef, useCallback } from "react";
import Head from 'next/head';
import Title from '../components/Title/Titles';
import { IQuestionList,IBodyContent,IChoice,IQuestion } from "../types/api_types";
import { Loader, Stack, Text,Button,Tooltip, rem } from '@mantine/core';
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import { useRouter } from 'next/router';

interface Props {}

const CommunicationPage: React.FC<Props> = () => {
    const router = useRouter();
    const { classes } = bodyContentUseStyles();
    const [tooltipChoiceId, setTooltipChoiceId] = useState("");
    const heroImage = useRef("/titleImgCommunication.png");
    const pageTitle = useRef("Communication");
    const [questionList, setQuestionList] = useState<IQuestionList | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSolution, setHasSolution] = useState(false);
    const [solutionContent, setSolutionContent] = useState<IQuestion>({
      id: "",
      title: "",
      ref: "",
      type: "",
      });
    const [currQuestion, setCurrQuestion] = useState<IQuestion>({
        id: "0",
        title: "Which area do you want to look into?",
        ref: "0",
        type: "multiple_choice",
      });
      const initialChoices = [
        { id: "695",ref: "0", label: "Communication", link: "/communication" },
        { id: "696",ref: "0", label: "Computer Access", link: "/computer-access" },
        { id: "697",ref: "0", label: "Home Access", link: "/home-access" },
        { id: "698",ref: "0", label: "Smart Phone Access", link: "/smart-phone-access" },
      ];
      const [currChoices, setCurrChoices] = useState<IChoice[]>(initialChoices);
      const [bodyContent, setBodyContent] = useState<IBodyContent>({
        currentQuestion: currQuestion,
        prevChoice: initialChoices[0],
        choiceList: [],
        currentCategory: "" 
        });
        const handleChoiceClick = useCallback((choice: IChoice) => {
            if(!choice.link){
                setTooltipChoiceId(choice.id);
                setTimeout(() => setTooltipChoiceId(""), 2300); // hide tooltip after 4 seconds
                return;
            }
            // Append the selected choice to the choiceList in IBodyContent
            const updatedChoiceList = [...bodyContent.choiceList, choice];
            setBodyContent({...bodyContent, choiceList: updatedChoiceList, prevChoice: choice});
    
            // Find the next question based on the choice (if applicable)
            // For example, assuming 'link' field in IChoice is used to determine the next question
            const nextQuestionId = choice.link; 
            const nextQuestion = questionList?.questions.find(q => q.ref === nextQuestionId);
            if (nextQuestion) {
                setCurrQuestion(nextQuestion);
                setCurrChoices(nextQuestion.choices || []);

                if (nextQuestion.type === "statement") {
                    setHasSolution(true);
                    setSolutionContent(nextQuestion);
                }
                else{
                    setHasSolution(false);
                }
                console.log(updatedChoiceList);
            }
        }, [bodyContent, questionList]);
      useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/retrieveQuestions?flowName=communication");
                const data: IQuestionList = await response.json();
                setQuestionList(data);
    
                // Check if the question list is not empty
                if (data.questions && data.questions.length > 0) {
                    const firstQuestion = data.questions[0];
                    setCurrQuestion(firstQuestion);
                    setCurrChoices(firstQuestion.choices || []);
                    const choice: IChoice = { id: "0", ref: "0", label: "Communication", link: firstQuestion.ref };
                    const updatedChoiceList = [...bodyContent.choiceList, choice];
                    setBodyContent({...bodyContent, choiceList: updatedChoiceList, prevChoice: choice});
        console.log("updatedChoiceList", updatedChoiceList);
                }
    
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);
    const goBackToPreviousQuestion = () => {
        console.log("goBackToPreviousQuestion Triggered");
        // Check if there are any previous choices
        if (bodyContent.choiceList.length > 1) {
          // Create a copy of the current choice list and remove the last choice
          const prevChoices = [...bodyContent.choiceList];
          const lastChoice = prevChoices[prevChoices.length - 2];
          prevChoices.pop();
          bodyContent.choiceList = prevChoices;
            setBodyContent({ ...bodyContent });
      
          if (lastChoice) {
            const previousQuestion = findPreviousQuestion(lastChoice);
            if (previousQuestion) {
              setCurrQuestion(previousQuestion);
              setCurrChoices(previousQuestion.choices || []);
              if (previousQuestion.type === "statement") {
                setHasSolution(true);
              } else {
                setHasSolution(false);
              }
            }
          }
        } else {
          router.push("/");
        }
      };

      const findPreviousQuestion = (lastChoice: IChoice): IQuestion | null => {
      
        const previousQuestionRef = lastChoice.link /* logic to determine the previous question ref */;
        return questionList?.questions.find(question => question.ref === previousQuestionRef) || null;
      };
      

    return (
       <div>
            <Head>
                <title>{pageTitle.current}</title>
            </Head>
            <Title
                hasPrev={true} 
                titleImg={heroImage.current}
                title={pageTitle.current}
                onPrevClick={goBackToPreviousQuestion} 
            />
                {isLoading ? (
                     <div style={{ display: "flex",marginTop:"15vh", justifyContent: "center", alignItems: "center" }}>
                    <Loader  color="blue" size={110} />
                    </div>
                ) : (
                    !hasSolution ? (

                        <Stack
                        spacing="xl"
                        className={classes.outer}

                      >
                        <Text className={classes.text}> {currQuestion.title} </Text>
                        <Text className={classes.descriptionText}>
                          {" "}
                          {currQuestion.description}{" "}
                        </Text>
                        {currChoices?.map((choice) => (
    <Tooltip
        key={choice.id}
        label="No logic set for this question"
        opened={tooltipChoiceId === choice.id}
        position="top"
        withArrow
    >
        <Button
            variant="outline"
            className={classes.inner}
            onClick={() => handleChoiceClick(choice)}
        >
            <Text fz="xl" style={{ fontSize: '16px', whiteSpace: "normal", textAlign: 'center', textDecoration: 'none' }}>
                {choice.label}
            </Text>
        </Button>
    </Tooltip>
))}
                      </Stack>

                    ) : (
                      // If there is a solution:
                      <div>
                      <Stack spacing="xl" className={classes.outer}>
                          <Text className={classes.text}>{currQuestion.title}</Text>
                          <Text className={classes.descriptionText}>{currQuestion.description}</Text>
              
                          <Text className={classes.text}>Resources</Text>
                          {solutionContent.solutions && solutionContent.solutions.map((solution, index) => (
                              <Button key={index} onClick={() => window.open(solution.url, "_blank")}>
                                  {solution.title}
                              </Button>
                          ))}
                      </Stack>
                  </div>
                    )
                )}
      
        </div>
    );
};

export default CommunicationPage;
