import React from "react";

import { Stack, Text, Button } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";

import BookmarkButton from "@/components/BookmarkButton/BookmarkButton";
import styles from "./SolutionPage.module.css";
import { IQuestion } from "../../types/api_types";
interface SolutionPageProps {
  solutionContent: IQuestion;
  classes: any;
}

/**.
 * Diaplsy the title, description, any related video attachments,
 * and a list of clickable resources.
 *
 * @param {IQuestion} solutionContent - Contains the solution data
 * @param {any} classes - Global styling
 */
const SolutionPage: React.FC<SolutionPageProps> = ({
  solutionContent,
  classes,
}) => {
  console.log("Solution Content:", solutionContent); 
  return (
    <Stack spacing="xl" className={classes.outer} styles={{root:{justifyContent:"space-between",},}}>
      <Text className={classes.text}>{solutionContent.title}</Text>
      <Text className={classes.descriptionText}>
        {solutionContent.description}
      </Text>
      {solutionContent.attachment &&
        (solutionContent.attachment.type === "video" || solutionContent.attachment.type === "image") &&  (
          <iframe
            width="100%"
            height="600px"
            src={solutionContent.attachment.href}
            allowFullScreen style={{border: "0"}}
          ></iframe>
        )}
      {solutionContent.solutions && (
        <>
          <Text className={classes.text}>Resources:</Text>
          <div className={styles.solutions}>
            {solutionContent.solutions.map((solution, index) => (
              <div className={styles.solutionContainer} key={index}>
                <div className={styles.buttonContainer}>
                  <Button
                    className={`${classes.inner} ${styles.extraButtonStyles}`}
                    variant="outline"
                    leftIcon={<IconFileDescription color="#254885" />}
                    component="a"
                    href={solution.url}
                    target="_blank"
                    styles={{ label: { whiteSpace: "normal" } }}
                  >
                    <Text className={classes.solutionsButtonText}>{solution.title}</Text>
                    
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <BookmarkButton
        id={solutionContent.ref}
        title={solutionContent.title}
        url={"Communication"}
        isSolutionPage={true}
      />
    </Stack>
  );
};

export default SolutionPage;
