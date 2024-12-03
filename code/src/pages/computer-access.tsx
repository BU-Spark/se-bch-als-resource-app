import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Loader, Stack, Text, Button, Tooltip, Alert } from "@mantine/core";

import {
  IQuestionList,
  IBodyContent,
  IChoice,
  IQuestion,
} from "../types/api_types";
import { bodyContentUseStyles } from "../utils/BodyContentStyle";
import Title from "../components/Title/Titles";
import SolutionPage from "@/components/SolutionPage/SolutionPage";
import { useFocusedBookmark } from "@/contexts/FocusedBookmarkContext";
import { isTypeformConsistent } from "../utils/QuestionUtils";
import styles from "../styles/Communication.module.css";

interface Props {}

/**
 * Saves a value to the local storage.
 *
 * @template T - The type of the value to be stored.
 * @param {string} key - The key.
 * @param {T} value - The value.
 */
function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("Saved value of " + key + ":", value);
  } else {
    console.log("Could not save " + key + ":", value);
  }
}

/**
 * Loads a value from local storage by the given key.
 *
 * @template T - The expected type of the stored value.
 * @param {string} key - The key.
 * @returns {T | null} The value.
 */
function loadFromLocalStorage<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem(key);
    return savedValue ? (JSON.parse(savedValue) as T) : null;
  }
  return null;
}

// Hides notification banner
function hideResetNotification() {
  const notificationBanner = document.getElementById("notification-banner");
  if (notificationBanner) {
    notificationBanner.classList.add("hidden");
  }
}

// Event listener for dismissing the notification
if (typeof window !== "undefined") {
  const dismissButton = document.getElementById("dismiss-notification");
  if (dismissButton) {
    dismissButton.addEventListener("click", () => {
      hideResetNotification();
    });
  }
}

// Base choices on communication page
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

const CommunicationPage: React.FC<Props> = () => {
  const router = useRouter();
  const { focusedBookmark, setFocusedBookmark } = useFocusedBookmark();
  const { classes } = bodyContentUseStyles();
  const heroImage = useRef("/titleImgCommunication.png");
  const pageTitle = useRef("Computer Access");
  const isRendering = useRef(true);

  const [tooltipChoiceId, setTooltipChoiceId] = useState("");
  const [questionList, setQuestionList] = useState<IQuestionList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetBanner, setShowResetBanner] = useState(false);
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

  const [currChoices, setCurrChoices] = useState<IChoice[]>(initialChoices);
  const [bodyContent, setBodyContent] = useState<IBodyContent>({
    currentQuestion: currQuestion,
    prevChoice: initialChoices[0],
    choiceList: [],
    currentCategory: "",
  });

  const goBackToPreviousQuestion = () => {
    console.log("goBackToPreviousQuestion Triggered");
    if (fromSolutionPage) {
      setFromSolutionPage(false);
      router.push("/bookmarks");
      return;
    }
    if (bodyContent.choiceList.length > 1) {
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
    const previousQuestionRef = lastChoice.link;
    return (
      questionList?.questions.find(
        (question) => question.ref === previousQuestionRef
      ) || null
    );
  };

  const handleChoiceClick = useCallback(
    (choice: IChoice) => {
      if (!choice.link) {
        setTooltipChoiceId(choice.id);
        setTimeout(() => setTooltipChoiceId(""), 2300);
        return;
      }
      const updatedChoiceList = [...bodyContent.choiceList, choice];
      setBodyContent({
        ...bodyContent,
        choiceList: updatedChoiceList,
        prevChoice: choice,
      });

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
    if (!isRendering.current) {
      saveToLocalStorage("hasSolution", hasSolution);
      saveToLocalStorage("solutionContent", solutionContent);
      saveToLocalStorage("currQuestion", currQuestion);
      saveToLocalStorage("currChoices", currChoices);
      saveToLocalStorage("bodyContent", bodyContent);
    }
  }, [hasSolution, solutionContent, currQuestion, currChoices, bodyContent]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/api/retrieveQuestions?flowName=computer-access",
          { signal: controller.signal }
        );
        const data: IQuestionList = await response.json();

        if (!isActive) return;
        setQuestionList(data);

        const savedCurrQuestion = loadFromLocalStorage<IQuestion | null>(
          "currQuestion"
        );
        const savedChoices = loadFromLocalStorage<IChoice[]>("currChoices");
        const savedHasSolution = loadFromLocalStorage<boolean>("hasSolution");
        const savedSolutionContent = loadFromLocalStorage<IQuestion | null>(
          "solutionContent"
        );
        const savedBodyContent = loadFromLocalStorage<IBodyContent | null>(
          "bodyContent"
        );

        if (data.questions && data.questions.length > 0) {
          const savedTypeformData =
            loadFromLocalStorage<IQuestionList>("savedTypeformData");

          if (
            savedTypeformData &&
            isTypeformConsistent(savedTypeformData, data)
          ) {
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
          } else {
            if (savedTypeformData) {
              setShowResetBanner(true);
              setTimeout(() => {
                setShowResetBanner(false);
              }, 5000);
            }

            saveToLocalStorage<IQuestion | null>("currQuestion", null);
            saveToLocalStorage<IChoice[]>("currChoices", []);
            saveToLocalStorage<boolean>("hasSolution", false);
            saveToLocalStorage<IQuestion | null>("solutionContent", null);
            saveToLocalStorage<IBodyContent | null>("bodyContent", null);

            const firstQuestion = data.questions[0];
            const initialChoice: IChoice = {
              id: "0",
              ref: "0",
              label: "Computer Access",
              link: firstQuestion.ref,
            };

            if (isActive) {
              setCurrQuestion(firstQuestion);
              setCurrChoices(firstQuestion.choices || []);
              setBodyContent({
                currentQuestion: firstQuestion,
                prevChoice: initialChoice,
                choiceList: [initialChoice],
                currentCategory: "",
              });
            }
          }

          if (isActive) {
            saveToLocalStorage<IQuestionList>("savedTypeformData", data);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") return;
          console.error("Failed to fetch questions:", error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
          isRendering.current = false;
        }
      }
    };

    fetchData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (focusedBookmark) {
      const solutionRef = focusedBookmark.id;
      setFromSolutionPage(true);

      if (questionList) {
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
        <div className={styles.loader}>
          <Loader color="blue" size={110} />
        </div>
      ) : !hasSolution ? (
        <Stack spacing="xl" className={classes.outer}>
          {showResetBanner && (
            <Alert
              className={styles.alertBanner}
              color="blue"
              title="Questionanaire Updated"
              onClose={() => setShowResetBanner(false)}
              withCloseButton
            >
              This form has been updated by the administrator. Please re-complete
              it.
            </Alert>
          )}
          <Text className={classes.text}>{currQuestion.title}</Text>
          <Text className={classes.descriptionText}>{currQuestion.description}</Text>
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
                <Text className={classes.choiceText}>{choice.label}</Text>
              </Button>
            </Tooltip>
          ))}
        </Stack>
      ) : (
        <SolutionPage solutionContent={solutionContent} classes={classes} />
      )}
    </div>
  );
};

export default CommunicationPage;