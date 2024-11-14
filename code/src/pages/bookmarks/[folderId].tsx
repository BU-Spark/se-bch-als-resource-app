import React, { useState } from "react";
import { useRouter } from "next/router";
import { Text, Button, Modal, TextInput, Group } from "@mantine/core";
import { useBookmarks } from "@/contexts/BookmarkContext";
import Title from "../../components/Title/Titles";
import ResourcesHandouts from "../../components/ResourcesHandouts/ResourcesHandouts";
import CopyableLink from "../../components/CopyURL/CopyUrl";
import { bodyContentUseStyles } from "@/utils/BodyContentStyle";
import styles from "../../styles/Bookmark.module.css";

const FolderDetail = () => {
  const { classes } = bodyContentUseStyles();
  const router = useRouter();
  const {
    bookmarks,
    folders,
    removeBookmark,
    clearBookmarks,
    clearFolder,
    renameFolder
  } = useBookmarks();

  // Modal states
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [unsaveModalOpen, setUnsaveModalOpen] = useState(false);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");

  // Constants
  const APP_URL = "https://se-bch-als-resource-app-zeta.vercel.app/";
  const folderIdParam = router.query.folderId;
  const folderId = Array.isArray(folderIdParam) ? folderIdParam[0] : folderIdParam || 'default';

  // Folder content management
  const getCurrentFolderContent = () => {
    if (folderId === 'default') {
      return {
        name: 'Default',
        bookmarks: bookmarks
      };
    }
    const folder = folders.find(folder => folder.id === folderId);
    return folder || { name: '', bookmarks: [] };
  };

  const folderContent = getCurrentFolderContent();
  const hasBookmarks = folderContent.bookmarks.length > 0;

  // URL generation
  const generateShareUrl = () => {
    const bookmarkIds = folderContent.bookmarks
      .map((bookmark) => bookmark.id)
      .join(",");
    return `${APP_URL}bookmarks/${folderId}?ids=${encodeURIComponent(bookmarkIds)}`;
  };

  // Event handlers
  const handleClearFolder = () => {
    setIsClearModalOpen(true);
  };

  const confirmClearFolder = () => {
    if (folderId === 'default') {
      clearBookmarks();
    } else {
      clearFolder(folderId);
    }
    setIsClearModalOpen(false);
  };

  const handleUnsaveBookmark = (bookmarkId: string) => {
    setSelectedBookmarkId(bookmarkId);
    setUnsaveModalOpen(true);
  };

  const confirmUnsave = () => {
    if (selectedBookmarkId) {
      removeBookmark(selectedBookmarkId);
    }
    setUnsaveModalOpen(false);
    setSelectedBookmarkId(null);
  };

  const handleRename = () => {
    if (newFolderName.trim() && folderId !== 'default') {
      renameFolder(folderId, newFolderName.trim());
      setIsRenameModalOpen(false);
      setNewFolderName("");
    }
  };

  // Folder not found handler
  if (!folderContent.name) {
    return (
      <div>
        <Text>Collection not found.</Text>
        <Button
          className={`${classes.inner} ${styles.button}`}
          variant="outline"
          onClick={() => router.push("/bookmarks")}
        >
          <Text fz="xl" className={styles.text}>Back to Folders</Text>
        </Button>
      </div>
    );
  }

  return (
      <div>
        <Title
            hasPrev={true}
            titleImg="/titleimghome.PNG"
            title={folderContent.name}
            onPrevClick={() => router.push("/bookmarks")}
            showPrintButton={hasBookmarks}
            shareUrl={generateShareUrl()}
            folderName={folderContent.name}
            bookmarks={folderContent.bookmarks}
        />

        <div className={styles.folderContent}>
          {hasBookmarks ? (
              <>
                <ResourcesHandouts
                    title="Bookmarks"
                    data={folderContent.bookmarks}
                    onUnsave={handleUnsaveBookmark}
                    currentFolderId={folderId}
                />

                  <Button
                      className={`${classes.inner} ${styles.clearFolderButton}`}
                      variant="outline"
                      onClick={handleClearFolder}
                  >
                    <Text fz="xl" className={styles.text}>
                      Clear Collection
                    </Text>
                  </Button>

                  {folderId !== 'default' && (
                  <Button
                      className={`${classes.inner} ${styles.renameButton}`}
                      variant="outline"
                      onClick={() => setIsRenameModalOpen(true)}
                  >
                    <Text fz="xl" className={styles.text}>
                      Rename Collection
                    </Text>
                  </Button>
          )}

              </>
          ) : (
              <div>
                <Text className={styles.titleStyle}>
                  No bookmarks in this collection.
                </Text>
              </div>
          )}
        </div>

        {/* Rename Modal */}
        <Modal
            opened={isRenameModalOpen}
            onClose={() => {
              setIsRenameModalOpen(false);
              setNewFolderName("");
            }}
            title="Rename Collection"
            size="md"
            zIndex={1001}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <TextInput
                placeholder="Enter new collection name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
            />
            <Button
                className={`${classes.inner} ${styles.button}`}
                variant="outline"
                onClick={handleRename}
                disabled={!newFolderName.trim()}
            >
              <Text fz="xl" className={styles.text}>Rename</Text>
            </Button>
          </div>
        </Modal>

        {/* Clear Folder Confirmation Modal */}
        <Modal
            opened={isClearModalOpen}
            onClose={() => setIsClearModalOpen(false)}
            title="Confirm Clear Collection"
            size="sm"
            zIndex={1001}
        >
          <Text size="sm" style={{marginBottom: "20px"}}>
            Are you sure you want to clear all bookmarks from this collection? This action cannot be undone.
          </Text>
          <Group position="apart">
            <Button
                variant="outline"
                color="gray"
                onClick={() => setIsClearModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
                color="red"
                onClick={confirmClearFolder}
            >
              Clear Folder
            </Button>
          </Group>
        </Modal>

        {/* Unsave Confirmation Modal */}
        <Modal
            opened={unsaveModalOpen}
            onClose={() => {
              setUnsaveModalOpen(false);
              setSelectedBookmarkId(null);
            }}
            title="Confirm Unsave"
            size="sm"
            zIndex={1001}
        >
          <Text size="sm" style={{marginBottom: "20px"}}>
            Are you sure you want to remove this bookmark?
          </Text>
          <Group position="apart">
            <Button
                variant="outline"
                color="gray"
                onClick={() => {
                  setUnsaveModalOpen(false);
                  setSelectedBookmarkId(null);
                }}
            >
              Cancel
            </Button>
            <Button
                color="red"
                onClick={confirmUnsave}
            >
              Unsave
            </Button>
          </Group>
        </Modal>
      </div>
  );
};

export default FolderDetail;