import React from "react";
import { useRouter } from "next/router";

import { Text, Button } from "@mantine/core";

import { useBookmarks } from "../../contexts/BookmarkContext";
import { ResourceLink } from "@/types/dataTypes";
import { bodyContentUseStyles } from "../../utils/BodyContentStyle";
import styles from "./BookmarkButton.module.css";

type BookmarkButtonProps = {
  id: string;
  url: string;
  title: string;
  isSolutionPage: boolean;
};

/**
 * Displays a button to bookmark or unbookmark a resource and optionally navigate to the bookmark page.
 *
 * @param {string} id - The unique identifier for the resource
 * @param {string} url - The URL of the resource
 * @param {string} title - The title of the resource
 * @param {boolean} isSolutionPage - used for conditional rendering of nav button
 */
const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  id,
  title,
  url,
  isSolutionPage,
}) => {
  const { classes } = bodyContentUseStyles();

  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === id);

  const router = useRouter();

  const handleBookmarkClick = () => {
    console.log(`Triggered handle bookmark click: ${id}, ${title}, ${url}`);
    if (isBookmarked) {
      removeBookmark(id);
    } else {
      const newBookmark: ResourceLink = { id, title, url };
      console.log(newBookmark);
      addBookmark(newBookmark);
    }
  };

  return (
    <div>
      <Button
        className={`${classes.inner} ${styles.button}`}
        variant="outline"
        style={{ marginTop: "40px" }}
        onClick={handleBookmarkClick}
      >
        <Text fz="xl" className={styles.text}>
          {isBookmarked ? "Unsave this resource" : "Save this resources"}
        </Text>
      </Button>
      {isSolutionPage ? (
        <Button
          className={classes.inner}
          variant="outline"
          style={{ marginTop: "10px" }}
          onClick={() => {
            router.push("./bookmarks");
          }}
        >
          <Text fz="xl" className={styles.text}>
            Go to your bookmarks
          </Text>
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BookmarkButton;
