import React from "react";

import { Stack, Text, Button } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";

import BookmarkButton from "@/components/BookmarkButton/BookmarkButton";
import { IQuestion } from "../../types/api_types";

interface SolutionPageProps {
  solutionContent: IQuestion;
  classes: any;
}

/**
 * A component that displays the solution page with resources and other related information.
 */
const SolutionPage: React.FC<SolutionPageProps> = ({
  solutionContent,
  classes,
}) => {
  return (
    <Stack spacing="xl" className={classes.outer}>
      <Text className={classes.text}>{solutionContent.title}</Text>
      <Text className={classes.descriptionText}>
        {solutionContent.description}
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
          <div style={{ display: "flex", alignItems: "flex-end" }} key={index}>
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
        url={"Communication"}
        isSolutionPage={true}
      />
    </Stack>
  );
};

export default SolutionPage;
