import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import Title from "../components/Title/Titles";
import {
  IQuestionList,
  IBodyContent,
  IChoice,
  IQuestion,
} from "../types/api_types";
import { Loader, Stack, Text, Button, Tooltip, rem } from "@mantine/core";
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import { useRouter } from "next/router";
import { IconFileDescription } from "@tabler/icons-react";
import BookmarkButton from "@/components/BookmarkButton/BookmarkButton";

import { useFocusedBookmark } from "@/contexts/FocusedBookmarkContext";

interface Props {}

const CommunicationPage: React.FC<Props> = () => {
  const router = useRouter();
  const { focusedBookmark, setFocusedBookmark } = useFocusedBookmark();
  const { classes } = bodyContentUseStyles();
  const [tooltipChoiceId, setTooltipChoiceId] = useState("");
  const heroImage = useRef("/titleImgCommunication.png");
  const pageTitle = useRef("Communication");
  const [questionList, setQuestionList] = useState<IQuestionList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [hasSolution, setHasSolution] = useState(false);
  // const [solutionContent, setSolutionContent] = useState<IQuestion>({
  //   id: "",
  //   title: "",
  //   ref: "",
  //   type: "",
  // });
  // const [currQuestion, setCurrQuestion] = useState<IQuestion>({
  //   id: "0",
  //   title: "Which area do you want to look into?",
  //   ref: "0",
  //   type: "multiple_choice",
  // });

  const [hasSolution, setHasSolution] = useState(() => {
    const savedHasSolution = localStorage.getItem('hasSolution');
    return savedHasSolution ? JSON.parse(savedHasSolution) : false;
  });

  const [solutionContent, setSolutionContent] = useState<IQuestion>(() => {
    const savedSolutionContent = localStorage.getItem('solutionContent');
    return savedSolutionContent ? JSON.parse(savedSolutionContent) : {
      id: "",
      title: "",
      ref: "",
      type: ""
    };
  });

  const [currQuestion, setCurrQuestion] = useState<IQuestion>(() => {
    const savedCurrQuestion = localStorage.getItem('currQuestion');
    return savedCurrQuestion ? JSON.parse(savedCurrQuestion) : {
      id: "0",
      title: "Which area do you want to look into?",
      ref: "0",
      type: ""
    };
  });

  const initialChoices = [
    { id: "695", ref: "0", label: "Communication", link: "/communication" },
    { id: "696", ref: "0", label: "Computer Access", link: "/computer-access" },
    { id: "697", ref: "0", label: "Home Access", link: "/home-access" },
    {
      id: "698",
      ref: "0",
      label: "Smart Phone Access",
      link: "/smart-phone-access",
    },
  ];
  const [currChoices, setCurrChoices] = useState<IChoice[]>(() => {
    const savedChoices = localStorage.getItem('currChoices');
    return savedChoices ? JSON.parse(savedChoices) : initialChoices;
  });
  /*const [bodyContent, setBodyContent] = useState<IBodyContent>({
    currentQuestion: currQuestion,
    prevChoice: initialChoices[0],
    choiceList: [],
    currentCategory: "",
  });*/

  const [bodyContent, setBodyContent] = useState<IBodyContent>(() => {
    const savedContent = localStorage.getItem('bodyContent');
    return savedContent ? JSON.parse(savedContent) : {
      currentQuestion: currQuestion, 
      prevChoice: initialChoices[0], 
      choiceList: [],
      currentCategory: ""
    };
  });

  //update bodyContent in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('bodyContent', JSON.stringify(bodyContent));

    if (bodyContent.choiceList.length > 0) {
          const lastPage = bodyContent.choiceList[bodyContent.choiceList.length - 1];
          setCurrQuestion(
            bodyContent.currentQuestion
          );
          setCurrChoices(
            bodyContent.choiceList
          );
    }

  }, [bodyContent]);

  
  useEffect(() => {
    localStorage.setItem('hasSolution', JSON.stringify(hasSolution));
  }, [hasSolution]);

  useEffect(() => {
    localStorage.setItem('solutionContent', JSON.stringify(solutionContent));
  }, [solutionContent]);

  useEffect(() => {
    localStorage.setItem('currQuestion', JSON.stringify(currQuestion));
  }, [currQuestion]);

  useEffect(() => {
    localStorage.setItem('currChoices', JSON.stringify(currChoices));
  }, [currChoices]);


  // // Load progress save on component mount
  // useEffect(() => {
  //   console.log("Loading from save");
  //   const serializedBodyContent = localStorage.getItem('prevSelectedContent');
  //   const serializedHasSolution = localStorage.getItem('hasSolution');
  //   console.log("Serialized" + serializedHasSolution);
  //   console.log("Currently: " + hasSolution);
  //   const serializedSolutionContent = localStorage.getItem('solution');
  //   if (serializedBodyContent) {
  //     setBodyContent(JSON.parse(serializedBodyContent) as IBodyContent);      
  //   }
  //   if (serializedHasSolution) {
  //     setHasSolution(JSON.parse(serializedHasSolution) as boolean);
  //   }
  //   if (serializedSolutionContent) {
  //     setSolutionContent(JSON.parse(serializedSolutionContent) as IQuestion);
  //   }
  //   console.log("After: " + hasSolution);

  //   if (bodyContent.choiceList.length > 0) {
  //     const lastPage = bodyContent.choiceList[bodyContent.choiceList.length - 1];
  //     setCurrQuestion(
  //       bodyContent.currentQuestion
  //     );
  //     setCurrChoices(
  //       bodyContent.choiceList
  //     );
  //     }
      
  //   else { 
  //     bodyContent.choiceList.push({
  //       question: currQuestion,
  //       prevChoice: clickedChoice,
  //       choiceList: currChoices,
  //     });
  //   }
  // }, []); 

  // // Update local storage
  // const saveProgress = useCallback(() => {
  //   localStorage.setItem('prevSelectedContent', JSON.stringify(prevSelectedContent.current));
  //   localStorage.setItem('hasSolution', JSON.stringify(hasSolution));
  //   localStorage.setItem('solution', JSON.stringify(solution));
  // }, [hasSolution, solution]);

  // //Save progress whenever these state variables change.
  // useEffect(() => {


  //   if (isFirstRender.current) {
  //     isFirstRender.current = false; 
  //     return; 
  //   }
    
  //   saveProgress();
  // }, [saveProgress, hasSolution, solution]);

  // //New Code
  // // Load progress save on component mount
  // useEffect(() => {
  //   console.log("Loading from save");
  //   const serializedPrevContent = localStorage.getItem('prevSelectedContent');
  //   const serializedHasSolution = localStorage.getItem('hasSolution');
  //   console.log("Serialized" + serializedHasSolution);
  //   console.log("Currently: " + hasSolution);
  //   const serializedSolution = localStorage.getItem('solution');
  //   if (serializedPrevContent) {
  //     prevSelectedContent.current = JSON.parse(serializedPrevContent) as IBodyContent[];      
  //   }
  //   if (serializedHasSolution) {
  //     setHasSolution(JSON.parse(serializedHasSolution) as boolean);
  //   }
  //   if (serializedSolution) {
  //     setSolution(JSON.parse(serializedSolution) as ISolution);
  //   }
  //   console.log("After: " + hasSolution);

  //   if (prevSelectedContent.current.length > 0) {
  //     const lastPage = prevSelectedContent.current[prevSelectedContent.current.length - 1];
  //     setCurrQuestion(
  //       lastPage
  //         .question
  //     );
  //     setClickedChoice(
  //       lastPage
  //         .prevChoice
  //     );
  //     setCurrChoices(
  //       lastPage
  //         .choiceList
  //     );
  //     }
      
  //   else { 
  //     prevSelectedContent.current.push({
  //       question: currQuestion,
  //       prevChoice: clickedChoice,
  //       choiceList: currChoices,
  //     });
  //   }
  // }, []); 

  // // Update local storage
  // const saveProgress = useCallback(() => {
  //   localStorage.setItem('prevSelectedContent', JSON.stringify(prevSelectedContent.current));
  //   localStorage.setItem('hasSolution', JSON.stringify(hasSolution));
  //   localStorage.setItem('solution', JSON.stringify(solution));
  // }, [hasSolution, solution]);

  // //Save progress whenever these state variables change.
  // useEffect(() => {


  //   if (isFirstRender.current) {
  //     isFirstRender.current = false; 
  //     return; 
  //   }
    
  //   saveProgress();
  // }, [saveProgress, hasSolution, solution]);


  const handleChoiceClick = useCallback(
    (choice: IChoice) => {
      if (!choice.link) {
        setTooltipChoiceId(choice.id);
        setTimeout(() => setTooltipChoiceId(""), 2300); // hide tooltip after 4 seconds
        return;
      }
      // Append the selected choice to the choiceList in IBodyContent
      const updatedChoiceList = [...bodyContent.choiceList, choice];
      setBodyContent({
        ...bodyContent,
        choiceList: updatedChoiceList,
        prevChoice: choice,
      });

      // Find the next question based on the choice (if applicable)
      // For example, assuming 'link' field in IChoice is used to determine the next question
      const nextQuestionId = choice.link;
      const nextQuestion = questionList?.questions.find(
        (q) => q.ref === nextQuestionId
      );
      if (nextQuestion) {
        setCurrQuestion(nextQuestion);
        setCurrChoices(nextQuestion.choices || []);

        if (nextQuestion.type === "statement") {
          setHasSolution(true);
          setSolutionContent(nextQuestion);
        } else {
          setHasSolution(false);
        }
        console.log(updatedChoiceList);
      }
    },
    [bodyContent, questionList]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "/api/retrieveQuestions?flowName=communication"
        );
        const data: IQuestionList = await response.json();
        setQuestionList(data);

        // Check if the question list is not empty
        if (data.questions && data.questions.length > 0) {
          const firstQuestion = data.questions[0];
          setCurrQuestion(firstQuestion);
          setCurrChoices(firstQuestion.choices || []);
          const choice: IChoice = {
            id: "0",
            ref: "0",
            label: "Communication",
            link: firstQuestion.ref,
          };
          const updatedChoiceList = [...bodyContent.choiceList, choice];
          setBodyContent({
            ...bodyContent,
            choiceList: updatedChoiceList,
            prevChoice: choice,
          });
          console.log("updatedChoiceList", updatedChoiceList);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
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
    const previousQuestionRef =
      lastChoice.link; /* logic to determine the previous question ref */
    return (
      questionList?.questions.find(
        (question) => question.ref === previousQuestionRef
      ) || null
    );
  };

  useEffect(() => {
    if (focusedBookmark) {
      // Clear the focused bookmark after loading the state
      console.log(focusedBookmark);

      // Set solution state using the focusedBookmark ResourceLink

      setFocusedBookmark(null);
    }
  }, [focusedBookmark, setFocusedBookmark]);

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
        <div
          style={{
            display: "flex",
            marginTop: "15vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader color="blue" size={110} />
        </div>
      ) : !hasSolution ? (
        <Stack spacing="xl" className={classes.outer}>
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
                <Text
                  fz="xl"
                  style={{
                    fontSize: "16px",
                    whiteSpace: "normal",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
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
            <Text className={classes.descriptionText}>
              {currQuestion.description}
            </Text>
            {solutionContent.attachment &&
              solutionContent.attachment.type === "video" && (
                <iframe
                  width="100%"
                  height="315"
                  src={solutionContent.attachment.href}
                  allowFullScreen
                ></iframe>
              )}
            <Text className={classes.text}>Resources:</Text>
            {solutionContent.solutions &&
              solutionContent.solutions.map((solution, index) => (
                <div
                  style={{ display: "flex", alignItems: "flex-end" }}
                  key={index}
                >
                  <div style={{ flexGrow: 1, marginBottom: "10px" }}>
                    <Button
                      className={classes.inner}
                      variant="outline"
                      leftIcon={<IconFileDescription color="#254885" />}
                      component="a"
                      href={solution.url}
                      target="_blank"
                      style={{
                        justifyContent: "flex-start",
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                        textDecorationThickness: "2px",
                      }}
                    >
                      {solution.title}
                    </Button>
                  </div>
                </div>
              ))}
            <BookmarkButton
              id={solutionContent.ref}
              title={solutionContent.title}
              url={pageTitle.current}
              solutionPage={true}
            />
            {/* setting url to pagetitle because need to switch url to category */}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default CommunicationPage;
