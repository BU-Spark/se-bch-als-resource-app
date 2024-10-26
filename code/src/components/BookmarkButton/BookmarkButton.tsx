import React, { useState } from "react";
import { useRouter } from "next/router";
import { Text, Button, Modal, TextInput } from "@mantine/core";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const { isBookmarked, bookmarks, folders, addBookmark, removeBookmark, createFolder } = useBookmarks();
  const bookmarked = isBookmarked(id);

  const router = useRouter();

  const handleBookmarkClick = () => {
    if (bookmarked) {
      removeBookmark(id);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSaveToFolder = (folderId?: string) => {
    const newBookmark: ResourceLink = { id, title, url };
    addBookmark(newBookmark, folderId);
    setIsModalOpen(false);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName);
      setNewFolderName('');
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
          {bookmarked ? "Unsave this resource" : "Save this resource"}
        </Text>
      </Button>

      {isSolutionPage ? (
        <Button
          className={classes.inner}
          variant="outline"
          style={{ marginTop: "10px" }}
          onClick={() => {
            router.push("/bookmarks");
          }}
        >
          <Text fz="xl" className={styles.text}>
            Go to your bookmarks
          </Text>
        </Button>
      ) : null}

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Save to Folder"
        size="md"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button 
            className={classes.inner}
            onClick={() => handleSaveToFolder()}
          >
            <Text>Save to Default Folder</Text>
          </Button>

          {folders.map(folder => (
            <Button
              key={folder.id}
              className={classes.inner}
              variant="light"
              onClick={() => handleSaveToFolder(folder.id)}
            >
              <Text>Save to "{folder.name}"</Text>
            </Button>
          ))}

          <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
            <Text size="sm" weight={500} mb={10}>Create New Folder</Text>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <TextInput
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                style={{ flex: 1 }}
              />
              <Button onClick={handleCreateFolder}>
                Create
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookmarkButton;