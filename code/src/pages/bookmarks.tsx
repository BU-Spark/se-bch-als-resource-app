import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Loader, Text, Button } from "@mantine/core";
import { ResourceLink } from "@/types/dataTypes";
import { IQuestion } from "@/types/api_types";
import Title from "../components/Title/Titles";
import ResourcesHandouts from "../components/ResourcesHandouts/ResourcesHandouts";
import CopyableLink from "../components/CopyURL/CopyUrl";
import { bodyContentUseStyles } from "../utils/BodyContentStyle";
import { useBookmarks } from "../contexts/BookmarkContext";
import styles from "../styles/Bookmark.module.css";

type EncodedUrlDisplayProps = {
  bookmarkUrl: string;
  classes: {
    outer: string;
  };
};

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

const Bookmarks = () => {
  const { classes } = bodyContentUseStyles();
  const { bookmarks, folders, addBookmark } = useBookmarks();
  const image = useRef("/titleimghome.PNG");

  const [bookmarkUrl, setBookmarkUrl] = useState("");
  const [initialUrlLoaded, setInitialUrlLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const APP_URL = "https://se-bch-als-resource-app-zeta.vercel.app/";

  // 添加一个状态来避免重复重定向
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    if (router.pathname === '/bookmarks' && !hasRedirected) {
      if (router.query.ids) {
        router.replace(`/bookmarks/default?ids=${router.query.ids}`);
      } else {
        // 如果没有 ids，可以考虑导航到一个默认页面，或者保持当前页面
        setHasRedirected(true);
      }
    }
  }, [router.isReady, router.pathname, router.query.ids, hasRedirected]);

  // 处理书签的加载
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

          if (questionsToAdd.length > 0) {
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
        setIsLoading(false); // 确保在错误情况下也停止加载状态
      }
    };

    fetchAndAddBookmarks();
  }, [router.query.ids, addBookmark, initialUrlLoaded]);

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

  // 移除导致渲染阻塞的条件判断
  // if (router.pathname === '/bookmarks' && typeof window !== 'undefined') {
  //   return (
  //     <div className={styles.loaderContainer}>
  //       <Loader color="blue" size={110} />
  //     </div>
  //   );
  // }

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
        // 在加载完成后渲染书签内容
        <div>
          <EncodedUrlDisplay bookmarkUrl={bookmarkUrl} classes={classes} />
          <ResourcesHandouts
            title="Your Bookmarked Resources"
            data={bookmarks}
            onUnsave={(id) => {
              // 这里添加移除书签的逻辑
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
