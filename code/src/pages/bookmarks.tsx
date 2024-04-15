import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { Text, Loader } from "@mantine/core";
import { ResourceLink } from "@/types/dataTypes";
import { IQuestion, IQuestionList } from "@/types/api_types";

import ResourcesHandouts from "../components/MainBody/SolutionPageContent/ResourcesHandouts";
import Title from "../components/Title/Titles";
import CopyableLink from "../components/CopyURL/CopyUrl";
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import { useBookmarks } from "../contexts/BookmarkContext";

const Bookmarks = () => {
  const { classes } = bodyContentUseStyles();
  const { bookmarks, addBookmark } = useBookmarks();
  const image = useRef("/titleimghome.PNG");

  const [bookmarkURL, setBookmarkURL] = useState("");
  const [initialUrlLoaded, setInitialUrlLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const BASE_URL = "http://localhost:3000/";

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
          "/api/retrieveQuestions?flowName=communication"
        );
        const data = await response.json();
        if (typeof router.query.ids === "string") {
          const refsFromUrl = router.query.ids.split(",");
          const questionsToAdd = data.questions.filter((question: IQuestion) =>
            refsFromUrl.includes(question.ref)
          );

          if (questionsToAdd.length > 0) { //wipe local storage of bookmarks if url encoded
            localStorage.setItem("bookmarks", JSON.stringify([]));
          }

          questionsToAdd.forEach((question: IQuestion) => {
            const newBookmark = {
              id: question.ref,
              title: question.title,
              url: "Communication",
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


  const sortedBookmarks = [...bookmarks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Handles construction of URL
  useEffect(() => {
    const bookmarkIds = sortedBookmarks
      .map((bookmark) => bookmark.id)
      .join(",");
    const newUrl = `${BASE_URL}bookmarks?ids=${encodeURIComponent(
      bookmarkIds
    )}`;
    setBookmarkURL(newUrl);
  }, [sortedBookmarks, router]);

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
        <div
          style={{
            display: "flex",
            marginTop: "15vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader color="blue" size={110} />
        </div>
      ) : (
        <div>
          {sortedBookmarks.length > 0 ? (
            <div>
              <div className={classes.outer}>
                <Text
                  style={{
                    color: "#254885",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "1.7em",
                  }}
                >
                  Save Your Resources
                </Text>
                <Text
                  style={{
                    color: "#68759C",
                    fontWeight: "normal",
                    marginBottom: "10px",
                    fontSize: "0.8em",
                  }}
                >
                  Use the link below to automatically load and access your
                  bookmarks in the future, from any device.
                </Text>
                <div>
                  <CopyableLink url={bookmarkURL} />
                </div>
              </div>
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
              <Text>You don&#39;t have any bookmarks.</Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
