import React from "react";
import { useRouter } from "next/router";
import { IconFileDescription } from "@tabler/icons-react";

import { Stack, Text, Button } from "@mantine/core";

import { ResourceLink } from "@/types/dataTypes";
import BookmarkButton from "@/components/BookmarkButton/BookmarkButton";
import { useFocusedBookmark } from "@/contexts/FocusedBookmarkContext";
import { useStyles } from "@/components/ResourcesHandouts/ResourcesHandoutsStyle";

/**
 * Component to display a list of resources with an option to bookmark them.
 * @param {string} title - Title for the resources section
 * @param {ResourceLink[]} data - Array of resource links to display
 */
const Resources = ({
  title,
  data,
}: {
  title: String;
  data: ResourceLink[];
}) => {
  const { classes } = useStyles();
  const { setFocusedBookmark } = useFocusedBookmark();
  const router = useRouter();

  const handleBookmarkClick = (bookmark: ResourceLink) => {
    setFocusedBookmark(bookmark);
    router.push("/communication");
  };

  return (
    <div>
      <Stack spacing="xl">
        <Text className={classes.text}> {title} </Text>
        {data.map((resource, index) => (
          <div className={classes.linkContainer} key={index}>
            <div className={classes.resourceButtonContainer}>
              {" "}
              <Button
                key={resource.id}
                className={classes.inner}
                variant="outline"
                leftIcon={<IconFileDescription color="#254885" />}
                component="a"
                target="_blank"
                onClick={() => handleBookmarkClick(resource)}
              >
                {resource.title}
              </Button>
            </div>
            <div className={classes.bookmarkButtonContainer}>
              {" "}
              <BookmarkButton
                id={resource.id}
                title={resource.title}
                url={resource.url}
                isSolutionPage={false}
              />
            </div>
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default Resources;
