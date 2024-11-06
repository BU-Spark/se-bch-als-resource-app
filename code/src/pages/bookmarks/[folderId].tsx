import React, { useState } from "react";
import { useRouter } from "next/router";
import { Text, Button, Modal, TextInput } from "@mantine/core";
import { useBookmarks } from "../../contexts/BookmarkContext";
import Title from "../../components/Title/Titles";
import ResourcesHandouts from "../../components/ResourcesHandouts/ResourcesHandouts";
import CopyableLink from "../../components/CopyURL/CopyUrl";
import { bodyContentUseStyles } from "../../utils/BodyContentStyle";
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
  const [newFolderName, setNewFolderName] = useState("");

  // Constants
  const APP_URL = "https://se-bch-als-resource-app-zeta.vercel.app/";
  const folderIdParam = router.query.folderId;
  const folderId = Array.isArray(folderIdParam) ? folderIdParam[0] : folderIdParam || 'default';

  // Folder content management
  const getCurrentFolderContent = () => {
    if (folderId === 'default') {
      return {
        name: 'Default Folder',
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
    if (folderId === 'default') {
      clearBookmarks();
    } else {
      clearFolder(folderId);
    }
  };

  const handleUnsaveBookmark = (bookmarkId: string) => {
    removeBookmark(bookmarkId);
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
        <Text>Folder not found.</Text>
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
      />

      {folderId !== 'default' && (
        <Button
          className={`${classes.inner} ${styles.button}`}
          variant="outline"
          style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
          onClick={() => setIsRenameModalOpen(true)}
        >
          <Text fz="xl" className={styles.text}>
            Rename Folder
          </Text>
        </Button>
      )}

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
              className={`${classes.inner} ${styles.button}`}
              variant="outline"
              style={{ width: "100%", marginTop: "20px", marginBottom: "20px"}}
              onClick={handleClearFolder}
            >
              <Text fz="xl" className={styles.text}>
                Clear Folder
              </Text>
            </Button>
          </>
        ) : (
          <div>
            <Text className={styles.titleStyle}>
              No bookmarks in this folder.
            </Text>
          </div>
        )}
      </div>

      <Modal
        opened={isRenameModalOpen}
        onClose={() => {
          setIsRenameModalOpen(false);
          setNewFolderName("");
        }}
        title="Rename Folder"
        size="md"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextInput
            placeholder="Enter new folder name"
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
    </div>
  );
};

export default FolderDetail;