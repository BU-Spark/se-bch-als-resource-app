import { bodyContentUseStyles } from "../utils/BodyContentStyle";

import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import { Stack, Text, Button, Group, SimpleGrid } from "@mantine/core";

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
    title: "How can you assist me today?",
    ref: "0",
    type: "multiple_choice",
  });

  const initialChoices = [
    {
      id: "0",
      ref: "0",
      label: "Communication",
      link: "/communication",
      icon: "/Communication.svg",
      description: "Speech & Communication Solutions"
    },
    {
      id: "1",
      ref: "0",
      label: "Computer Access",
      link: "/computer-access",
      icon: "/ComputerAccess.svg",
      description: "Make your Computer more Accessible"
    },
    {
      id: "2",
      ref: "0",
      label: "Home Access",
      icon: "/HomeAccess.svg",
      description: "Home Care Devices"
    },
    {
      id: "3",
      ref: "4",
      label: "Smart Phone Access",
      link: "smart-phone-access",
      icon: "/PhoneAccess.svg",
      description: "Tailoring Your Mobile Device to Your Needs"
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

        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[
          { maxWidth: 'sm', cols: 1 },
          ]}
          >
          {currChoices.map((choice) => (
            <div key={choice.id}>
              <Button
                variant="outline"
                className={classes.homeButton}
                onClick={() => {

                router.push(choice.link || "");
              }}
              >
                <Group position="left" spacing="xl" style={{ width: '100%' }}>
                  <div className={classes.homeIconContainer}>
                    <img
                      src={choice.icon}
                      alt={choice.label}
                      className={classes.homeIconContainer}
                    />
                  </div>
                  <div className={classes.homeTextContainer}>
                    <Text className={classes.choiceText}>{choice.label}</Text>
                    <Text className={classes.descriptionText}>
                      {choice.description}
                    </Text>
                  </div>
                </Group>
              </Button>
            </div>
          ))}
        </SimpleGrid>
      </Stack>
    </div>
  );
};

export default QuestionaireBodyContent;