import { Stack, Text, Button, rem } from "@mantine/core";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import Title from "../components/Title/Titles";
import {
  IQuestion,
  IChoice,
  IBodyContent,
  ISolution,
} from "../types/api_types";
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import ToggleButton from "../components/MainBody/TogglebButton";
import SolutionPages from "../utils/SolutionContent";
import { useRouter } from 'next/router';


interface Props { }

const QuestionaireBodyContent: React.FC<Props> = () => {
  const { classes } = bodyContentUseStyles();

  const router = useRouter();

  //STATES:
  const [hasSolution, setHasSolution] = useState(false);
  // // previously selected content ref
  const prevSelectedContent = useRef<IBodyContent[]>([]);
  const heroImage = useRef("/titleimghome.PNG");
  const pageTitle = useRef("Home");

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
    { id: "698", ref: "0", label: "Smart Phone Access", link: "/smart-phone-access" },
  ];
  const [currChoices, setCurrChoices] = useState<IChoice[]>(initialChoices);



  return (
    <div>
      <Title
        hasPrev={prevSelectedContent.current.length > 1}
        titleImg={heroImage.current}
        title={pageTitle.current}
      />

      {!hasSolution ? (
        <Stack
          spacing="xl"
          className={classes.outer}
        >
          <Text className={classes.text}> {currQuestion.title} </Text>
          <Text className={classes.descriptionText}>
            {" "}
            {currQuestion.description}{" "}
          </Text>

          {currChoices.map((choice) => (
            <div key={choice.id}>
              <Button
                variant="outline"
                className={classes.inner}
                onClick={() => {
                  router.push(choice.link || "");
                }}
              >
                <Text fz="xl" style={{ fontSize: '16px', whiteSpace: "normal", textAlign: 'center', textDecoration: 'none' }}>
                  {choice.label}
                </Text>
              </Button>
            </div>
          ))}

        </Stack>
      ) : (
        <h1>Solution</h1>
      )}


    </div>
  );
};

export default QuestionaireBodyContent;
