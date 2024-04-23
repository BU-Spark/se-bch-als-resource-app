import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import Title from "../components/Title/Titles";
import {
  IQuestionList,
  IBodyContent,
  IChoice,
  IQuestion,
  IAttachment,
  ISolution
} from "../types/api_types";
import { Loader, Stack, Text, Button, Tooltip, rem, Alert } from "@mantine/core";
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import { useRouter } from "next/router";
import { IconFileDescription } from "@tabler/icons-react";
import BookmarkButton from "@/components/BookmarkButton/BookmarkButton";

import { useFocusedBookmark } from "@/contexts/FocusedBookmarkContext";

interface Props { }

//function to see if typeform data has changed
function isTypeformConsistent(oldData: IQuestionList, newData: IQuestionList): boolean {
  if (oldData.questions.length !== newData.questions.length) {
    return false;
  }

  for (let i = 0; i < oldData.questions.length; i++) {
    if (!areQuestionsEqual(oldData.questions[i], newData.questions[i])) {
      return false;
    }
  }

  return true;
}

function areQuestionsEqual(question1: IQuestion, question2: IQuestion): boolean {
  return (
    question1.id === question2.id &&
    question1.title === question2.title &&
    question1.ref === question2.ref &&
    question1.type === question2.type &&
    areChoicesEqual(question1.choices, question2.choices) &&
    areSolutionsEqual(question1.solutions, question2.solutions) &&
    question1.description === question2.description && // updated
    areAttachmentsEqual(question1.attachment, question2.attachment)
  );
}

function areChoicesEqual(choices1: IChoice[] | undefined, choices2: IChoice[] | undefined): boolean {
  if (!choices1 && !choices2) {
    return true;
  }
  if (!choices1 || !choices2 || choices1.length !== choices2.length) {
    return false;
  }
  for (let i = 0; i < choices1.length; i++) {
    if (
      choices1[i].id !== choices2[i].id ||
      choices1[i].label !== choices2[i].label ||
      choices1[i].ref !== choices2[i].ref
    ) {
      return false;
    }
  }
  return true;
}

function areSolutionsEqual(solutions1: ISolution[] | undefined, solutions2: ISolution[] | undefined): boolean {
  if (!solutions1 && !solutions2) {
    return true;
  }
  if (!solutions1 || !solutions2 || solutions1.length !== solutions2.length) {
    return false;
  }
  for (let i = 0; i < solutions1.length; i++) {
    if (
      solutions1[i].id !== solutions2[i].id ||
      solutions1[i].title !== solutions2[i].title ||
      solutions1[i].url !== solutions2[i].url
    ) {
      return false;
    }
  }
  return true;
}

function areAttachmentsEqual(attachment1: IAttachment | undefined, attachment2: IAttachment | undefined): boolean {
  if (!attachment1 && !attachment2) {
    return true;
  }
  if (!attachment1 || !attachment2) {
    return false;
  }

  if (attachment1.type !== attachment2.type || attachment1.href !== attachment2.href) {
    return false;
  }
  else {
    return true;
  }
}


//Utility functions to save and load from local storage without error
function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("Saved value of " + key + ":");
    console.log(value);
  }
  else {
    console.log("could not save " + key + " : " + value);
  }
}

function loadFromLocalStorage<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) as T : null;
  }
  return null;
}



function hideResetNotification() {
  const notificationBanner = document.getElementById('notification-banner');
  if(notificationBanner) {
    notificationBanner.classList.add('hidden');
  }
}

// Event listener for dismissing the notification
if (typeof window !== 'undefined') {
  const dismissButton = document.getElementById('dismiss-notification');
  if (dismissButton) {
      dismissButton.addEventListener('click', () => {
          hideResetNotification();
      });
  }
}

const CommunicationPage: React.FC<Props> = () => {
  const router = useRouter();
  const { focusedBookmark, setFocusedBookmark } = useFocusedBookmark();
  const { classes } = bodyContentUseStyles();
  const [tooltipChoiceId, setTooltipChoiceId] = useState("");
  const heroImage = useRef("/titleImgCommunication.png");
  const pageTitle = useRef("Communication");
  const [questionList, setQuestionList] = useState<IQuestionList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetBanner, setShowResetBanner] = useState(false);


  // so that we don't rewrite the save on first render with the initial data
  const isRendering = useRef(true);

  const [hasSolution, setHasSolution] = useState(false);
  const [fromSolutionPage, setFromSolutionPage] = useState(false);
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

  const [currChoices, setCurrChoices] = useState<IChoice[]>(initialChoices);
  const [bodyContent, setBodyContent] = useState<IBodyContent>({
    currentQuestion: currQuestion,
    prevChoice: initialChoices[0],
    choiceList: [],
    currentCategory: "",
  });
  // Update local storage
  useEffect(() => {
    if (!isRendering.current) {
      saveToLocalStorage<boolean>('hasSolution', hasSolution);
    }
  }, [hasSolution]);

  useEffect(() => {
    if (!isRendering.current) {
      saveToLocalStorage<IQuestion>('solutionContent', solutionContent);
    }
  }, [solutionContent]);

  useEffect(() => {
    if (!isRendering.current) {
      saveToLocalStorage<IQuestion>('currQuestion', currQuestion);
    }
  }, [currQuestion]);

  useEffect(() => {
    if (!isRendering.current) {
      saveToLocalStorage<IChoice[]>('currChoices', currChoices);
    }
  }, [currChoices]);

  useEffect(() => {
    if (!isRendering.current) {
      saveToLocalStorage<IBodyContent>('bodyContent', bodyContent);
    }
  }, [bodyContent]);


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

        const savedCurrQuestion = loadFromLocalStorage<IQuestion | null>('currQuestion');
        const savedChoices = loadFromLocalStorage<IChoice[]>('currChoices');
        const savedHasSolution = loadFromLocalStorage<boolean>('hasSolution');
        const savedSolutionContent = loadFromLocalStorage<IQuestion | null>('solutionContent');
        const savedBodyContent = loadFromLocalStorage<IBodyContent | null>('bodyContent');

        // Check if the question list is not empty
        if (data.questions && data.questions.length > 0) {

          
          const savedTypeformData = loadFromLocalStorage<IQuestionList>('savedTypeformData');
          console.log(savedTypeformData);
          console.log(data);
          if (savedTypeformData && isTypeformConsistent(savedTypeformData, data)) {
            if (savedCurrQuestion) {
              setCurrQuestion(savedCurrQuestion);
            }
            if (savedChoices) {
              setCurrChoices(savedChoices);
            }

            if (savedBodyContent) {
              setBodyContent(savedBodyContent);
            }

            if (savedHasSolution != null) {
              setHasSolution(savedHasSolution);
              if (savedHasSolution && savedSolutionContent) {
                setSolutionContent(savedSolutionContent);
              }
            }

          }
          else { //start from first question
            if (savedTypeformData) { //typeform has changed
              setShowResetBanner(true);
              setTimeout(() => {
                setShowResetBanner(false);
              }, 5000); 
            }

            //reset local storage
            saveToLocalStorage<IQuestion | null>('currQuestion', null);
            saveToLocalStorage<IChoice[]>('currChoices', []);
            saveToLocalStorage<boolean>('hasSolution', false);
            saveToLocalStorage<IQuestion | null>('solutionContent', null);
            saveToLocalStorage<IBodyContent | null>('bodyContent', null);

            const firstQuestion = data.questions[0];
            setCurrQuestion(firstQuestion);
            setCurrChoices(firstQuestion.choices || []);

            const initialChoice: IChoice = {
              id: "0",
              ref: "0",
              label: "Communication",
              link: firstQuestion.ref,
            };
            setBodyContent({
              currentQuestion: firstQuestion,
              prevChoice: initialChoice,
              choiceList: [initialChoice],
              currentCategory: "",
            });

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


          saveToLocalStorage<IQuestionList>('savedTypeformData', data);


        }

        setIsLoading(false);
        isRendering.current = false;
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setIsLoading(false);
        isRendering.current = false;
      }
    };

    fetchData();
  }, []);

  const goBackToPreviousQuestion = () => {
    console.log("goBackToPreviousQuestion Triggered");
    //Check if came from bookmark
    if (fromSolutionPage) {
      setFromSolutionPage(false);
      router.push("/bookmarks");
      return;
    }
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
      const solutionRef = focusedBookmark.id;
      setFromSolutionPage(true);

      if (!questionList) {
        setIsLoading(true);

        const fetchData = async () => {
          try {
            const response = await fetch(
              "/api/retrieveQuestions?flowName=communication"
            );
            const data = await response.json();
            setQuestionList(data);
          } catch (error) {
            console.error("Failed to fetch questions:", error);
            setIsLoading(false);
          }
        };

        fetchData();
      }

      if (questionList) {
        // Find the focused question based on solutionRef
        const focusedQuestion =
          questionList.questions.find(
            (question) => question.ref === solutionRef
          ) || null;

        if (focusedQuestion) {
          console.log("Focused question:", focusedQuestion);
          setSolutionContent(focusedQuestion);
          setHasSolution(true);
          setFocusedBookmark(null);
        }
      }

      // Set solution state using the focusedBookmark ResourceLink
    }
  }, [focusedBookmark, setFocusedBookmark, questionList]);

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
          {showResetBanner && (<Alert
            style={{
              position: 'absolute', // or 'fixed' depending on your layout
              top: 20, // adjust based on your header/navbar height
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 999,
            }}
            color="blue" // you can choose the color that matches your design
            title="Questionanaire Updated"
            onClose={() => setShowResetBanner(false)} 
            withCloseButton
          >
            This form has been updated by the administrator. Please re-complete it.
          </Alert>
          )}
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