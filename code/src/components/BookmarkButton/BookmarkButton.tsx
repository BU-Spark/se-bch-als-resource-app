import React, { useState } from "react";
import { useRouter } from "next/router";
import { Text, Button, Modal, TextInput, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Save, MoreVertical, Check } from "lucide-react";
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

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  id,
  title,
  url,
  isSolutionPage,
}) => {
  const { classes } = bodyContentUseStyles();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isNavigateModalOpen, setIsNavigateModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const { folders, addBookmark, createFolder } = useBookmarks();
  const router = useRouter();

  // Handle saving bookmark to a specific folder
  const handleSaveToFolder = (folderId?: string) => {
    const newBookmark: ResourceLink = { id, title, url };
    addBookmark(newBookmark, folderId);
    setIsSaveModalOpen(false);

    notifications.show({
      message: `Successfully saved to ${
        folderId
          ? `"${folders.find((f) => f.id === folderId)?.name}"`
          : "Default Folder"
      }`,
      icon: <Check size={18} />,
      color: "green",
      autoClose: 3000,
      withCloseButton: false,
      styles: (theme) => ({
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        },
        icon: {
          backgroundColor: theme.colors.green[6],
          color: "white",
        },
      }),
    });
  };

  // Handle creating new folder
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName);
      setNewFolderName("");
    }
  };

  // Handle navigation to bookmarks page
  const handleNavigateToBookmarks = () => {
    setIsNavigateModalOpen(true);
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.actionButton}
        onClick={() => setIsSaveModalOpen(true)}
        aria-label="Save to folder"
      >
        <Save size={20} className={styles.actionIcon} />
        <span className={styles.actionLabel}>Save</span>
      </button>

      {isSolutionPage && (
        <button
          className={`${styles.actionButton} ${styles.moreButton}`}
          onClick={handleNavigateToBookmarks}
          aria-label="Go to bookmarks"
        >
          <MoreVertical size={20} className={styles.actionIcon} />
          <span className={styles.actionLabel}>Bookmarks</span>
        </button>
      )}

      {/* Save to Folder Modal */}
      <Modal
        opened={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Save to Folder"
        size="md"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Button
            className={classes.inner}
            variant="light"
            onClick={() => handleSaveToFolder()}
          >
            <Text>Save to Default Folder</Text>
          </Button>

          {folders.map((folder) => (
            <Button
              key={folder.id}
              className={classes.inner}
              variant="light"
              onClick={() => handleSaveToFolder(folder.id)}
            >
              <Text>Save to &quot;{folder.name}&quot;</Text>
            </Button>
          ))}

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "4px",
            }}
          >
            <Text size="sm" weight={500} mb={10}>
              Create New Folder
            </Text>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <TextInput
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                style={{ flex: 1 }}
              />
              <Button onClick={handleCreateFolder}>Create</Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Navigate to Bookmarks Modal */}
      <Modal
        opened={isNavigateModalOpen}
        onClose={() => setIsNavigateModalOpen(false)}
        title="Navigate to Bookmarks"
        size="sm"
      >
        <Text
          size="sm"
          style={{
            marginBottom: "20px",
          }}
        >
          Do you want to go to your bookmarks page?
        </Text>
        <Group position="apart">
          <Button
            variant="outline"
            color="gray"
            onClick={() => setIsNavigateModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsNavigateModalOpen(false);
              router.push("/bookmarks");
            }}
          >
            Go to Bookmarks
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default BookmarkButton;
