import { bodyContentUseStyles } from "../utils/BodyContentStyle";

import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import { Stack, Text, Button } from "@mantine/core";

import Title from "../components/Title/Titles";
import { IQuestion, IChoice, IBodyContent } from "../types/api_types";

interface Props {}

/**
 * Component for displaying the initial choices
 * for the questionnaire. State management used to be
 * entirely controlled in this component, but we have since
 * migrated it to communication.tsx. Future teams should
 * generalize communications.tsx for the other three
 * main paiges.
 */
const QuestionaireBodyContent: React.FC<Props> = () => {
  const { classes } = bodyContentUseStyles();
  const router = useRouter();
  const prevSelectedContent = useRef<IBodyContent[]>([]);
  const heroImage = useRef("/titleimghome.PNG");
  const pageTitle = useRef("Home");

  const [currQuestion, setCurrQuestion] = useState<IQuestion>({
    id: "0",
    title: "Which area do you want to look into?",
    ref: "0",
    type: "multiple_choice",
  });

  const initialChoices = [//Uses [type].tsx
    { id: "0", ref: "0", label: "Communication", link: "/communication" },
    { id: "1", ref: "0", label: "Computer Access", link: "/computer-access" },
    { id: "2", ref: "0", label: "Home Access", link: "/home-access" },
    {
      id: "3",
      ref: "4",
      label: "Smart Phone Access",
      link: "smart-phone-access",
    },
  ];

  const [currChoices, setCurrChoices] = useState<IChoice[]>(initialChoices);

  return (
    <div>
      <Title
        hasPrev={prevSelectedContent.current.length > 1}
        titleImg={heroImage.current}
        title={pageTitle.current}
      />

      <Stack spacing="xl" className={classes.outer}>
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
              <Text className={classes.choiceText}>{choice.label}</Text>
            </Button>
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default QuestionaireBodyContent;
