import React, { useEffect, useRef, useState } from "react";
import { Plus, MoreVertical, Edit, Trash2, Settings } from 'lucide-react';
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

// Component for displaying a shareable URL
type EncodedUrlDisplayProps = {
  bookmarkUrl: string;
  classes: {
    outer: string;
  };
};

// Functional component to render the shareable URL section
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

// Main component for managing bookmarks
const Bookmarks = () => {
  // Custom styles and bookmark context hooks
  const { classes } = bodyContentUseStyles();
  const { bookmarks, folders, addBookmark, createFolder, deleteFolder, renameFolder } = useBookmarks();
  const image = useRef("/titleimghome.PNG");

  // State variables for managing modals and bookmarks
  const [bookmarkUrl, setBookmarkUrl] = useState("");
  const [initialUrlLoaded, setInitialUrlLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [hasRedirected, setHasRedirected] = useState(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [renameFolderValue, setRenameFolderValue] = useState("");

  const router = useRouter();
  const APP_URL = "https://se-bch-als-resource-app-zeta.vercel.app/";

  // Function to handle creating a new folder
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName("");
      setIsCreateModalOpen(false);
    }
  };

 // Handle opening settings for a specific folder
  const handleSettingsClick = (e: React.MouseEvent, folderId: string) => {
    e.stopPropagation();
    setSelectedFolderId(folderId);
    setIsSettingsModalOpen(true);
  };

  // Handle renaming a folder
  const handleRenameClick = () => {
    const folder = folders.find(f => f.id === selectedFolderId);
    if (folder) {
      setRenameFolderValue(folder.name);
      setIsSettingsModalOpen(false);
      setIsRenameModalOpen(true);
    }
  };
  // Handle deleting a folder
  const handleDeleteClick = () => {
    setIsSettingsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  // Confirm renaming a folder
  const handleRenameConfirm = () => {
    if (selectedFolderId && renameFolderValue.trim()) {
      renameFolder(selectedFolderId, renameFolderValue.trim());
      setIsRenameModalOpen(false);
      setRenameFolderValue("");
    }
  };
  // Confirm deleting a folder
  const handleDeleteConfirm = () => {
    if (selectedFolderId) {
      deleteFolder(selectedFolderId);
      setIsDeleteModalOpen(false);
      setSelectedFolderId(null);
    }
  };
  // Redirect to default folder if query has specific IDs
  useEffect(() => {
    if (!router.isReady) return;

    if (router.pathname === "/bookmarks" && !hasRedirected) {
      if (router.query.ids) {
        router.replace(`/bookmarks/default?ids=${router.query.ids}`);
      } else {
        setHasRedirected(true);
      }
    }
  }, [router.isReady, router.pathname, router.query.ids, hasRedirected, router]);

  // Fetch bookmarks from the query parameter and API
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
          // Add bookmarks to local storage
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

  // Generate a shareable URL for bookmarks
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

  // If data is loading, show a loader
  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader color="blue" size={110} />
      </div>
    );
  }

  // Render main content
  return (
      <div>
        <Title
            hasPrev={true}
            titleImg={image.current}
            title="Collections"
            onPrevClick={() => router.push("/communication")}
        />

        <button
            className={styles.addButton}
            onClick={() => setIsCreateModalOpen(true)}
            aria-label="Add Folder"
        >
          <Plus size={20} color="white" className={styles.addIcon}/>
          <span className={styles.addLabel}>ADD</span>
        </button>


        <Modal
            opened={isCreateModalOpen}
            onClose={() => {
              setIsCreateModalOpen(false);
              setNewFolderName("");
            }}
            title="Create New Collection"
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <TextInput
                placeholder="Enter collection name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
            />
            <Button
                className={styles.confirmButton}
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
            >
              Create
            </Button>
          </div>
        </Modal>

        <Modal
            opened={isSettingsModalOpen}
            onClose={() => setIsSettingsModalOpen(false)}
            title={
              <div style={{textAlign: 'center'}}>

                <Text size="xl" weight={700}>Bookmark Settings</Text>
              </div>
            }
            size="sm"
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <button className={styles.modalButton} onClick={handleRenameClick}>
              <div className={styles.modalIconWrapper}>
                <Edit size={18}/>
              </div>
              <span>Rename Collection</span>
            </button>
            <button className={styles.modalButton} onClick={handleDeleteClick}>
              <div className={styles.modalIconWrapper}>
                <Trash2 size={18}/>
              </div>
              <span>Delete Collection</span>
            </button>
            <Button
                variant="default"
                onClick={() => setIsSettingsModalOpen(false)}
                fullWidth
            >
              Cancel
            </Button>
          </div>
        </Modal>

        <Modal
            opened={isRenameModalOpen}
            onClose={() => setIsRenameModalOpen(false)}
            title={<Text weight={700}>Rename Collection?</Text>}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <TextInput
                placeholder="Enter new name"
                value={renameFolderValue}
                onChange={(e) => setRenameFolderValue(e.target.value)}
            />
            <div style={{display: 'flex', gap: '1rem'}}>
              <Button
                  variant="default"
                  onClick={() => setIsRenameModalOpen(false)}
                  style={{flex: 1}}
              >
                Cancel
              </Button>
              <Button
                  className={styles.confirmButton}
                  onClick={handleRenameConfirm}
                  disabled={!renameFolderValue.trim()}
                  style={{flex: 1}}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
            opened={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title={<Text weight={700}>Delete Collection?</Text>}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <Text>
              Are you sure you want to delete this collection? This action cannot be undone. If you delete this
              collection, it will be permanently removed from your saved items.
            </Text>
            <div style={{display: 'flex', gap: '1rem'}}>
              <Button
                  variant="default"
                  onClick={() => setIsDeleteModalOpen(false)}
                  style={{flex: 1}}
              >
                Cancel
              </Button>
              <Button
                  color="red"
                  onClick={handleDeleteConfirm}
                  style={{flex: 1}}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>

        <div className={styles.folderList}>
          <div
              className={styles.folderItem}
              onClick={() => router.push("/bookmarks/default")}
          >
            <Text size="lg" weight={500}>
              Default Collection
            </Text>
            <Text size="sm" color="dimmed">
              {bookmarks.length} bookmark(s)
            </Text>
          </div>

          {folders.map((folder) => (
              <div
                  key={folder.id}
                  className={styles.folderItem}
                  onClick={() => router.push(`/bookmarks/${folder.id}`)}
              >
                <button
                    onClick={(e) => handleSettingsClick(e, folder.id)}
                    className={styles.settingsButton}
                >
                  <MoreVertical size={20}/>
                </button>
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