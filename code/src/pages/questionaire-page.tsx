import { bodyContentUseStyles } from "../utils/BodyContentStyle";
import style from "../styles/choiceBoxes.module.css"
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import { Stack, Text, Button } from "@mantine/core";

import Title from "../components/Title/Titles";
import { IQuestion, IChoice, IBodyContent } from "../types/api_types";
import { relative } from "path";

interface Props {}

const getImageUrl = (label: string): string => {
  switch (label) {
    case "Communication":
      return "/Communication.svg";
    case "Computer Access":
      return "/ComputerAccess.svg";
    case "Smart Phone Access":
      return "/PhoneAccess.svg";
    case "Home Access":
      return "/HomeAccess.svg";
    default:
      return "/Boston_Children's_Hospital_logo.png"; // Fallback image
  }
};
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

  const initialChoices = [//When redirecting, uses [type].tsx. Avoid having .tsx files with names that are in the links below ex. No communication.tsx, etc.
    { id: "0", ref: "0", label: "Communication", link: "/communication",subtitle:"Speech & Communication Solutions" },
    { id: "1", ref: "0", label: "Computer Access", link: "/computer-access",subtitle:"Access your computer today" },
    { id: "2", ref: "0", label: "Home Access", link: "/home-access",subtitle:"Manage your home care services" },
    {
      id: "3",
      ref: "4",
      label: "Smart Phone Access",
      link: "smart-phone-access",
      subtitle:"Use our mobile services",
    },
  ];

  const [currChoices, setCurrChoices] = useState<IChoice[]>(initialChoices);
  
  return (
    <div style={{height:"100%",flexGrow:1,display:"flex",flexDirection:"column"}}>
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
        <div className={style.questionBoxesContainer}>
        {currChoices.map((choice) => (
          <div key={choice.id} className={style.questionBoxes}>
            <Button
              variant="outline"
              className={classes.inner}
              onClick={() => {
                router.push(choice.link || "");
              }} styles={{
                    inner:{width:"100%", display:"grid", gridAutoColumns:"1fr 3fr",},
                  label:{width:"100%",display:"flex",flexGrow:1},}}
            >
              <img className={classes.image} src={getImageUrl(choice.label)} alt={choice.label}/>
              <div className={classes.textContainer}>
                <Text className={classes.choiceText}>{choice.label} </Text>
                <Text className={classes.subtitleText}>{choice.subtitle}</Text>
              </div>
            </Button>
          </div>
        ))}</div>
      </Stack>
    </div>
  );
};

export default QuestionaireBodyContent;
