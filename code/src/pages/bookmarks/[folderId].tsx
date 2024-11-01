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
  const { bookmarks, folders, removeBookmark, clearBookmarks, clearFolder, renameFolder } = useBookmarks();
  
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const folderIdParam = router.query.folderId;
  const folderId = Array.isArray(folderIdParam) ? folderIdParam[0] : folderIdParam || 'default';

  const APP_URL = "https://se-bch-als-resource-app-zeta.vercel.app/";

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

  const generateShareUrl = () => {
    const currentBookmarks = folderContent.bookmarks;
    const bookmarkIds = currentBookmarks
      .map((bookmark) => bookmark.id)
      .join(",");
    return `${APP_URL}bookmarks/${folderId}?ids=${encodeURIComponent(bookmarkIds)}`;
  };

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
        {folderContent.bookmarks.length > 0 ? (
          <>
            <div>
              <Text className={styles.titleStyle}>Save Your Resources</Text>
              <Text className={styles.subtitleStyle}>
                Use the link below to automatically load and access your bookmarks in
                the future, from any device.
              </Text>
              <div>
                <CopyableLink url={generateShareUrl()} />
              </div>
            </div>

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