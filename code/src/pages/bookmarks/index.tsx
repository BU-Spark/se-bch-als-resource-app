import React from "react";
import { useRouter } from "next/router";
import { Text } from "@mantine/core";
import { useBookmarks } from "../../contexts/BookmarkContext";
import Title from "../../components/Title/Titles";
import styles from "../../styles/Bookmark.module.css";

const BookmarkFolders = () => {
  const router = useRouter();
  const { bookmarks, folders } = useBookmarks();

  const handleFolderClick = (folderId: string) => {
    router.push(`/bookmarks/${folderId}`);
  };

  return (
    <div>
      <Title
        hasPrev={true}
        titleImg="/titleimghome.PNG"
        title="Folders"
        onPrevClick={() => router.push("/communication")}
      />

      <div className={styles.folderList}>
        <div 
          className={styles.folderItem}
          onClick={() => handleFolderClick('default')}
        >
          <div>
            <Text className={styles.folderTitle}>Default Folder</Text>
            <Text className={styles.folderCount}>
              {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
            </Text>
          </div>
        </div>

        {folders.map(folder => (
          <div
            key={folder.id}
            className={styles.folderItem}
            onClick={() => handleFolderClick(folder.id)}
          >
            <div>
              <Text className={styles.folderTitle}>{folder.name}</Text>
              <Text className={styles.folderCount}>
                {folder.bookmarks.length} bookmark{folder.bookmarks.length !== 1 ? 's' : ''}
              </Text>
            </div>
          </div>
        ))}

        {folders.length === 0 && bookmarks.length === 0 && (
          <Text className={styles.emptyMessage}>
            No bookmarks or folders yet.
          </Text>
        )}
      </div>
    </div>
  );
};

export default BookmarkFolders;