import React, { useState } from "react";
import { useRouter } from "next/router";
import { Text, Button, Modal, TextInput, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Save, MoreVertical, Check } from "lucide-react";
import { useBookmarks } from "../../contexts/BookmarkContext";
import { ResourceLink } from "@/types/dataTypes";
import { bodyContentUseStyles } from "../../utils/BodyContentStyle";
import styles from "./BookmarkButton.module.css";

// Define the properties for the BookmarkButton component
type BookmarkButtonProps = {
  id: string; // Bookmark ID
  url: string; // Bookmark URL
  title: string; // Bookmark title
  isSolutionPage: boolean; // Indicates if the current page is a solution page
};

// Main BookmarkButton component
const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  id,
  title,
  url,
  isSolutionPage,
}) => {
  const { classes } = bodyContentUseStyles();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); // State for Save modal
  const [isNavigateModalOpen, setIsNavigateModalOpen] = useState(false); // State for Navigate modal
  const [newFolderName, setNewFolderName] = useState(""); // State for new folder name input

  const { folders, addBookmark, createFolder } = useBookmarks(); // Access bookmarks context
  const router = useRouter();

  // Handle saving a bookmark to a specific folder
  const handleSaveToFolder = (folderId?: string) => {
    const newBookmark: ResourceLink = { id, title, url }; // Define the new bookmark
    addBookmark(newBookmark, folderId); // Add the bookmark to the specified folder
    setIsSaveModalOpen(false); // Close the Save modal

    // Show a notification after saving the bookmark
    notifications.show({
      message: `Successfully saved to ${
        folderId
          ? `"${folders.find((f) => f.id === folderId)?.name}"` // Display folder name
          : "Default Folder" // Default message if no folder specified
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

  // Handle creating a new folder
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName); // Create a new folder
      setNewFolderName(""); // Clear the input field
    }
  };

  // Handle navigation to the bookmarks page(Not use now)
  const handleNavigateToBookmarks = () => {
    setIsNavigateModalOpen(true); // Open the Navigate modal
  };

  return (
    <div className={styles.buttonContainer}>
      {/* Save button to open the Save modal */}
      <button
        className={styles.actionButton}
        onClick={() => setIsSaveModalOpen(true)} // Open Save modal
        aria-label="Save to collections"
      >
        <Save size={20} className={styles.actionIcon} />
        <span className={styles.actionLabel}>Save</span>
      </button>

      {/* Modal for saving a bookmark to a folder */}
      <Modal
        opened={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)} // Close Save modal
        title="Save to Collection"
        size="md"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Button to save to the Default Collection */}
          <Button
            className={classes.inner}
            variant="light"
            onClick={() => handleSaveToFolder()}
          >
            <Text>Save to Default Collection</Text>
          </Button>

          {/* List folders to save the bookmark into */}
          {folders.map((folder) => (
            <Button
              key={folder.id}
              className={classes.inner}
              variant="light"
              onClick={() => handleSaveToFolder(folder.id)} // Save to the selected folder
            >
              <Text>Save to &quot;{folder.name}&quot;</Text>
            </Button>
          ))}

          {/* Input and button to create a new folder */}
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "4px",
            }}
          >
            <Text size="sm" weight={500} mb={10}>
              Create New Collection
            </Text>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <TextInput
                placeholder="Enter collection name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                style={{ flex: 1 }}
              />
              <Button onClick={handleCreateFolder}>Create</Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal for navigating to bookmarks page */}
      <Modal
        opened={isNavigateModalOpen}
        onClose={() => setIsNavigateModalOpen(false)} // Close Navigate modal
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
            onClick={() => setIsNavigateModalOpen(false)} // Cancel navigation
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsNavigateModalOpen(false); // Close modal
              router.push("/bookmarks"); // Navigate to bookmarks page
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

