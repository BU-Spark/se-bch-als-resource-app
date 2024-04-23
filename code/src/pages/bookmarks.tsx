import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Loader, Text } from "@mantine/core";
import { ResourceLink } from "@/types/dataTypes";
import { IQuestion } from "@/types/api_types";

import Title from "../components/Title/Titles";
import ResourcesHandouts from "../components/MainBody/SolutionPageContent/ResourcesHandouts";
import CopyableLink from "../components/CopyURL/CopyUrl";
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import { useBookmarks } from "../contexts/BookmarkContext";
import styles from "../styles/Bookmark.module.css";

/**
 * Displays a list of categorized bookmarks and
 * integrates URL encoding to share bookmarks
 * across devices.
 */
const Bookmarks = () => {
  const { classes } = bodyContentUseStyles();
  const { bookmarks, addBookmark } = useBookmarks();
  const image = useRef("/titleimghome.PNG");

  const [bookmarkUrl, setBookmarkUrl] = useState("");
  const [initialUrlLoaded, setInitialUrlLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const APP_URL = "https://se-bch-als-resource-app-zeta.vercel.app/";

  type OriginalKeys =
    | "Communication"
    | "Computer Access"
    | "Home Access"
    | "Smart Phone Access";

  const originals: OriginalKeys[] = [
    "Communication",
    "Computer Access",
    "Home Access",
    "Smart Phone Access",
  ];

  const categorizedBookmarks: Record<string, ResourceLink[]> = {
    Communication: [],
    "Computer Access": [],
    "Home Access": [],
    "Smart Phone Access": [],
  };

  // Handles bookmark categorization
  bookmarks.forEach((bookmark: ResourceLink) => {
    if (bookmark.url in categorizedBookmarks) {
      categorizedBookmarks[bookmark.url].push(bookmark);
    } else {
      console.warn(`Unexpected original: ${bookmark.url}`);
    }
  });

  // Handles URL encoding on load
  useEffect(() => {
    if (initialUrlLoaded) {
      return;
    }
    const fetchAndAddBookmarks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/api/retrieveQuestions?flowName=communication" // Change this when new branches are made
        );
        const data = await response.json();
        // Parsing the URL
        if (typeof router.query.ids === "string") {
          const refsFromUrl = router.query.ids.split(",");
          const questionsToAdd = data.questions.filter((question: IQuestion) =>
            refsFromUrl.includes(question.ref)
          );

          if (questionsToAdd.length > 0) {
            // Wipe local storage of bookmarks if url encoded
            localStorage.setItem("bookmarks", JSON.stringify([]));
          }

          questionsToAdd.forEach((question: IQuestion) => {
            const newBookmark = {
              id: question.ref,
              title: question.title,
              url: "Communication", // Change this when new branches are made
            };
            addBookmark(newBookmark);
          });
        }
        setInitialUrlLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
      }
    };

    fetchAndAddBookmarks();
  }, [router.query.refs, addBookmark]);

  // Handles construction of URL
  useEffect(() => {
    const sortedBookmarks = [...bookmarks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    const bookmarkIds = sortedBookmarks
      .map((bookmark) => bookmark.id)
      .join(",");
    const newUrl = `${APP_URL}bookmarks?ids=${encodeURIComponent(bookmarkIds)}`;
    setBookmarkUrl(newUrl);
  }, [bookmarks]);

  return (
    <div>
      <Title
        hasPrev={true}
        titleImg={image.current}
        title={"Bookmarks"}
        onPrevClick={() => {
          router.push("/communication");
        }}
      />
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader color="blue" size={110} />
        </div>
      ) : (
        <div>
          {bookmarks.length > 0 ? (
            <div>
              <EncodedUrlDisplay bookmarkUrl={bookmarkUrl} classes={classes} />
              <div className={classes.outer}>
                {originals.map((original: OriginalKeys) =>
                  categorizedBookmarks[original].length > 0 ? (
                    <ResourcesHandouts
                      key={original}
                      title={original}
                      data={categorizedBookmarks[original]}
                    />
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className={classes.outer}>
              <Text className={styles.titleStyle}>
                You don&#39;t have any bookmarks.
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

type EncodedUrlDisplayProps = {
  bookmarkUrl: string;
  classes: {
    outer: string;
  };
};

/**
 * Displays the section containing the encoded URL
 * @param {EncodedUrlDisplayProps} props - contains url and styles
 */
const EncodedUrlDisplay = ({
  bookmarkUrl,
  classes,
}: EncodedUrlDisplayProps) => {
  return (
    <div className={classes.outer}>
      <Text className={styles.titleStyle}>Save Your Resources</Text>
      <Text className={styles.subtitleStyle}>
        Use the link below to automatically load and access your bookmarks in
        the future, from any device.
      </Text>
      <div>
        <CopyableLink url={bookmarkUrl} />
      </div>
    </div>
  );
};

export default Bookmarks;
