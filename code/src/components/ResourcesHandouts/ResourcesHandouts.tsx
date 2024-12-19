import React, { useState } from "react";
import { useRouter } from "next/router";
import { IconFileDescription } from "@tabler/icons-react";
import { Stack, Text, Button, Modal } from "@mantine/core";
import { ResourceLink } from "@/types/dataTypes";
import { useFocusedBookmark } from "@/contexts/FocusedBookmarkContext";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useStyles } from "@/components/ResourcesHandouts/ResourcesHandoutsStyle";
import { PageType, EnhancedResourceLink } from '@/contexts/BookmarkContext';

// Define properties for the Resources component
interface ResourcesProps {
  title: String;
  data: EnhancedResourceLink[];
  onUnsave?: (bookmarkId: string) => void; // unsaving bookmarks
  currentFolderId?: string; // ID of the current folder
}

// Main Resources component
const Resources: React.FC<ResourcesProps> = ({
  title,
  data,
  onUnsave,
  currentFolderId,
}) => {
  // Retrieve styles and context hooks
  const { classes } = useStyles();
  const { setFocusedBookmark } = useFocusedBookmark();
  const { folders, addBookmark, removeBookmark } = useBookmarks();
  const router = useRouter();

  // State for managing the move modal and the selected bookmark
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<ResourceLink | null>(null);

  // Handle clicking on a bookmark to navigate to the "communication" page
const handleBookmarkClick = (bookmark: EnhancedResourceLink) => {
  setFocusedBookmark(bookmark);
  let targetPage = '/communication';

  switch (bookmark.pageType) {
    case PageType.ComputerAccess:
      targetPage = '/computer-access';
      break;
    case PageType.SmartPhoneAccess:
      targetPage = '/smart-phone-access';
      break;
    case PageType.Communication:
    default:
      targetPage = '/communication';
      break;
  }

  router.push(targetPage);
};

  // Handle clicking the "Move" button for a bookmark
  const handleMoveClick = (bookmark: ResourceLink) => {
    setSelectedBookmark(bookmark);
    setIsMoveModalOpen(true);
  };

  // Handle moving a bookmark to a target folder
  const handleMove = (targetFolderId: string) => {
    if (selectedBookmark) {
      removeBookmark(selectedBookmark.id, currentFolderId); // Remove bookmark from the current folder
      addBookmark(selectedBookmark, targetFolderId); // Add bookmark to the target folder
      setIsMoveModalOpen(false); // Close the move modal
      setSelectedBookmark(null); // Clear the selected bookmark
    }
  };

  return (
    <div>
      {/* Stack container for spacing resources */}
      <Stack spacing="xl">
        <Text className={classes.text}>{title}</Text>
        {/* Map through resources and display each one */}
        {data.map((resource, index) => (
          <div className={classes.linkContainer} key={index}>
            <div className={classes.resourceButtonContainer}>
              <Button
                key={resource.id}
                className={classes.inner}
                variant="outline"
                leftIcon={<IconFileDescription color="#254885" />}
                component="a"
                target="_blank"
                onClick={() => handleBookmarkClick(resource)}
              >
                {resource.title}
              </Button>
            </div>
            {/* Display action buttons if onUnsave is provided */}
            <div className={classes.bookmarkButtonContainer}>
              {onUnsave && (
                <>
                  {/* Button to unsave a bookmark */}
                  <Button
                    className={`${classes.inner} ${classes.actionButton}`}
                    variant="outline"
                    onClick={() => onUnsave(resource.id)}
                  >
                    <Text fz="xl">Unsave</Text>
                  </Button>
                  {/* Button to open the move modal */}
                  <Button
                    className={`${classes.inner} ${classes.actionButton}`}
                    variant="outline"
                    onClick={() => handleMoveClick(resource)}
                  >
                    <Text fz="xl">Move</Text>
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </Stack>

      {/* Modal for moving a bookmark to another folder */}
      <Modal
        opened={isMoveModalOpen}
        onClose={() => {
          setIsMoveModalOpen(false);
          setSelectedBookmark(null);
        }}
        title="Move to another Collection"
        size="md"
      >
        {/* List folders to move the bookmark into */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentFolderId !== 'default' && (
            <Button
              className={classes.inner}
              variant="light"
              onClick={() => handleMove('default')}
            >
              <Text>Move to Default Collection</Text>
            </Button>
          )}
          {folders
            .filter(folder => folder.id !== currentFolderId) // Exclude the current folder
            .map(folder => (
              <Button
                key={folder.id}
                className={classes.inner}
                variant="light"
                onClick={() => handleMove(folder.id)}
              >
                <Text>Move to &quot;{folder.name}&quot;</Text>
              </Button>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default Resources;
