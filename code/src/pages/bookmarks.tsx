import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Loader, Text, Button, Modal, TextInput } from "@mantine/core";
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
  const { bookmarks, folders, addBookmark, createFolder } = useBookmarks();
  const image = useRef("/titleimghome.PNG");

  const [bookmarkUrl, setBookmarkUrl] = useState("");
  const [initialUrlLoaded, setInitialUrlLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const APP_URL = "https://se-bch-als-resource-app-zeta.vercel.app/";

  const [hasRedirected, setHasRedirected] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName("");
      setIsCreateModalOpen(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (router.pathname === "/bookmarks" && !hasRedirected) {
      if (router.query.ids) {
        router.replace(`/bookmarks/default?ids=${router.query.ids}`);
      } else {
        setHasRedirected(true);
      }
    }
  }, [router.isReady, router.pathname, router.query.ids, hasRedirected]);

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
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader color="blue" size={110} />
      </div>
    );
  }

  return (
    <div>
      <Title
        hasPrev={true}
        titleImg={image.current}
        title="Folders"
        onPrevClick={() => router.push("/communication")}
      />

      <Button
        onClick={() => setIsCreateModalOpen(true)}
        style={{ margin: "20px" }}
      >
        + Add Folder
      </Button>

      <Modal
        opened={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setNewFolderName("");
        }}
        title="Create New Folder"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextInput
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <Button
            onClick={handleCreateFolder}
            disabled={!newFolderName.trim()}
          >
            Create
          </Button>
        </div>
      </Modal>

      {/* Show Bookmark Folder List */}
      <div className={styles.folderList}>
        {/* Default folder */}
        <div
          className={styles.folderItem}
          onClick={() => router.push("/bookmarks/default")}
        >
          <Text size="lg" weight={500}>
            Default Folder
          </Text>
          <Text size="sm" color="dimmed">
            {bookmarks.length} bookmark(s)
          </Text>
        </div>

        {/* Customize folder list */}
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={styles.folderItem}
            onClick={() => router.push(`/bookmarks/${folder.id}`)}
          >
            <Text size="lg" weight={500}>
              {folder.name}
            </Text>
            <Text size="sm" color="dimmed">
              {folder.bookmarks.length} bookmark(s)
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
