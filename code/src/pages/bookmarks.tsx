import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { Text } from "@mantine/core";
import getSolutionContent from "@/utils/GetSolutionPageForChoice";
import { ResourceLink } from "@/types/dataTypes";

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
  const router = useRouter();

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

  bookmarks.forEach((bookmark: ResourceLink) => {
    if (bookmark.url in categorizedBookmarks) {
      categorizedBookmarks[bookmark.url].push(bookmark);
    } else {
      console.warn(`Unexpected original: ${bookmark.url}`);
    }
  });

  useEffect(() => {
    const fetchAndAddBookmark = async (id: string) => {
      try {
        const data = await getSolutionContent(id);
        const resourceLink = data[2];
        resourceLink[0].id = id;
        addBookmark(resourceLink[0]);
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
      }
    };

    if (typeof router.query.ids === "string") {
      const ids = router.query.ids.split(",");
      ids.forEach((id) => {
        if (bookmarks.some((bookmark) => bookmark.id === id)) {
          return;
        } else {
          fetchAndAddBookmark(id);
        }
      });
    }
  }, [router.query.ids, addBookmark]);

  const sortedBookmarks = [...bookmarks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  useEffect(() => {
    const bookmarkIds = sortedBookmarks
      .map((bookmark) => bookmark.id)
      .join(",");
    const newUrl = `http://localhost:3000/bookmarks?ids=${encodeURIComponent(
      bookmarkIds
    )}`;
    setBookmarkURL(newUrl);
  }, [sortedBookmarks, router]);

  return (
    <div>
      <Title hasPrev={true} titleImg={image.current} title={"Bookmarks"} />

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
              Use the link below to automatically load and access your bookmarks
              in the future, from any device.
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
          <Text>You don't have any bookmarks.</Text>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
