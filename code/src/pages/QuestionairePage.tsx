import { Stack, Text, Button } from "@mantine/core";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import Title from "../components/Title/Titles";
import {
  IQuestion,
  IChoice,
  IBodyContent,
  ISolution,
} from "../types/api_types";
import searchQuestionsChoicesFromJson from "../utils/TempGetNextQuestion";
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import ToggleButton from "../components/MainBody/TogglebButton";
import SolutionPages from "../utils/SolutionContent";


interface Props {}

const QuestionaireBodyContent: React.FC<Props> = () => {
  const { classes } = bodyContentUseStyles();

  const initialChoices = [
    { id: "695", title: "Communication", link: "/communication" },
    { id: "696", title: "Computer Access", link: "/computer-access" },
    { id: "697", title: "Home Access", link: "/home-access" },
    { id: "698", title: "Smart Phone Access", link: "/smart-phone-access" },
  ];

  // current question state
  const [currQuestion, setCurrQuestion] = useState<IQuestion>({
    id: "2",
    title: "Which area do you want to look into?",
  });

  // current choices state
  const [currChoices, setCurrChoices] = useState<IChoice[]>(initialChoices);

  // currently clicked choice state
  const [clickedChoice, setClickedChoice] = useState<IChoice>({
    id: "1",
    title: "Home",
  });

  // solution state
  const [solution, setSolution] = useState<ISolution>({ id: "", title: "" });

  // whether solution has been found
  const [hasSolution, setHasSolution] = useState(false);
  
  // so that we don't rewrite the save on first render with the initial data
  const isFirstRender = useRef(true);
  // page title ref
  const pageTitle = useRef("Home");

  // image ref
  const image = useRef("/titleimghome.PNG");

  // previously selected content ref
  const prevSelectedContent = useRef<IBodyContent[]>([]);

  // memoized search function for questions and choices
  const memoizedSearchQuestionsChoicesFromJson = useMemo(() => {
    return async (
      choice: IChoice
    ): Promise<[IQuestion, IChoice[], boolean, ISolution]> => {
      return await searchQuestionsChoicesFromJson(choice);
    };
  }, []);



  // updates choices and questions for clicked choice
  const updateChoicesAndQuestions = useCallback(
    async (choice: IChoice) => {
      console.log("Clicked choice:", choice);
      try {
        // search for the next set of choices and question using the clicked choice
        const [question, choicesList, hasSol, sol] =
          await memoizedSearchQuestionsChoicesFromJson(choice);
        console.log("New question:", question);
        console.log("New choices list:", choicesList);
        console.log("Has solution:", hasSol);
        console.log("Solution:", sol);

        // set whether or not the next step has a solution
        // setHasSolution(hasSol);

        // if the next step has a solution, set the solution
        // otherwise, set the clicked choice
        if (hasSol) {
          console.log("Solution found, updating state...");
          setSolution(sol);
          setHasSolution(true);
        } else {
          console.log("No solution, updating choices...");
          setSolution({ id: "", title: "" });

          setClickedChoice(choice);
          setHasSolution(false);
        }

        // if the question title is not empty, save the current choices, question, and clicked choice
        // in the previous selected content
        if (question.title !== "" && !hasSol) {
          prevSelectedContent.current.push({
            question: question,
            prevChoice: choice,
            choiceList: choicesList,
          });
          saveProgress();
          // set the new choices and question
          console.log("Current question set to:", question);
          console.log("Current choices set to:", choicesList);
          setCurrChoices(choicesList);
          setCurrQuestion(question);
        }

        // if the selected choice is Communication, set the page title to Communication
        if (choice.title === "Communication") {
          pageTitle.current = "Communication";
          image.current = "/titleImgCommunication.png";
        }
      } catch (error) {
        console.error(error);

        // handle error here, for example by setting an error message state
      }
    },
    [clickedChoice, currChoices, currQuestion]
  );

  const handleBookmarkNavigation = () => {
    window.localStorage.setItem(
      "questionnaireState",
      JSON.stringify({
        solution,
        hasSolution,
        prevSelectedContent: prevSelectedContent.current,
      })
    );
  };

  // run effect only once when component mounts
  /* useEffect(() => {
    const savedState = window.localStorage.getItem("questionnaireState");
    if (savedState) {
      const {
        solution,
        hasSolution,
        prevSelectedContent: savedPrevSelectedContent,
      } = JSON.parse(savedState);

      setSolution(solution);
      setHasSolution(hasSolution);

      prevSelectedContent.current = savedPrevSelectedContent;
    }

    if (clickedChoice !== null) {
      updateChoicesAndQuestions(clickedChoice).catch(console.error);
    }

    window.localStorage.removeItem("questionnaireState");
  }, []); */

  // Load progress save on component mount
  useEffect(() => {
    console.log("Loading from save");
    const serializedPrevContent = localStorage.getItem('prevSelectedContent');
    const serializedHasSolution = localStorage.getItem('hasSolution');
    console.log("Serialized" + serializedHasSolution);
    console.log("Currently: " + hasSolution);
    const serializedSolution = localStorage.getItem('solution');
    if (serializedPrevContent) {
      prevSelectedContent.current = JSON.parse(serializedPrevContent) as IBodyContent[];      
    }
    if (serializedHasSolution) {
      setHasSolution(JSON.parse(serializedHasSolution) as boolean);
    }
    if (serializedSolution) {
      setSolution(JSON.parse(serializedSolution) as ISolution);
    }
    console.log("After: " + hasSolution);

    if (prevSelectedContent.current.length > 0) {
      const lastPage = prevSelectedContent.current[prevSelectedContent.current.length - 1];
      setCurrQuestion(
        lastPage
          .question
      );
      setClickedChoice(
        lastPage
          .prevChoice
      );
      setCurrChoices(
        lastPage
          .choiceList
      );
      }
      
    else { 
      prevSelectedContent.current.push({
        question: currQuestion,
        prevChoice: clickedChoice,
        choiceList: currChoices,
      });
    }
  }, []); 

  // Update local storage
  const saveProgress = useCallback(() => {
    localStorage.setItem('prevSelectedContent', JSON.stringify(prevSelectedContent.current));
    localStorage.setItem('hasSolution', JSON.stringify(hasSolution));
    localStorage.setItem('solution', JSON.stringify(solution));
  }, [hasSolution, solution]);

  //Save progress whenever these state variables change.
  useEffect(() => {


    if (isFirstRender.current) {
      isFirstRender.current = false; 
      return; 
    }
    
    saveProgress();
  }, [saveProgress, hasSolution, solution]);

  /**
   * Goes to the previous selected question and choices, and updates the current state with previous state
   */ //the way we fetch previous question was fixed during dev by using reroute
  const prevQuestion = useCallback(() => {
    if (prevSelectedContent.current.length > 1) {

      // if current question has solution
      if (hasSolution) {
        setHasSolution(false);
        return;
      }
      
      // remove previous state from the list
      prevSelectedContent.current.pop();
      saveProgress();

      // update current state with previous state
      setCurrQuestion(
        (prevSelectedContent.current[prevSelectedContent.current.length - 1] as IBodyContent)
          .question
      );
      setClickedChoice(
        (prevSelectedContent.current[prevSelectedContent.current.length - 1]  as IBodyContent)
          .prevChoice
      );
      setCurrChoices(
        (prevSelectedContent.current[prevSelectedContent.current.length - 1]  as IBodyContent)
          .choiceList
      );

      

      // set page title and image to default if previous state is not available
      if (prevSelectedContent.current.length == 1) {
        pageTitle.current = "Home";
        image.current = "/titleimghome.PNG";
      }
    }
  }, [
    prevSelectedContent,
    hasSolution,
    updateChoicesAndQuestions,
    clickedChoice,
  ]);

  return (
    <div>
      <Title
        hasPrev={prevSelectedContent.current.length > 1} 
        prevQuestion={prevQuestion}
        titleImg={image.current}
        title={pageTitle.current}
      />

      {!hasSolution ? (
        <Stack
          spacing="xl"
          className={classes.outer}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          })}
        >
          <Text className={classes.text}> {currQuestion.title} </Text>
          <Text className={classes.descriptionText}>
            {" "}
            {currQuestion.description}{" "}
          </Text>
          {currChoices.map((choice) => (
            <div key={choice.id}>
              <ToggleButton
                updateContent={() => updateChoicesAndQuestions(choice)}
                className={classes.inner}
                choice={choice}
              />
            </div>
          ))}
        </Stack>
      ) : (
        <SolutionPages solution={solution} hasSolution={hasSolution} />
      )}

      {/* Conditional rendering for BookmarkButton */}
      {hasSolution && (
        <div className={classes.outer}>
          <Link href="./bookmarks">
            <Button
              className={classes.inner}
              onClick={handleBookmarkNavigation}
              variant="outline"
              style={{ backgroundColor: "#FFFFFF", color: "#254885" }}
            >
              See your bookmarks
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuestionaireBodyContent;
