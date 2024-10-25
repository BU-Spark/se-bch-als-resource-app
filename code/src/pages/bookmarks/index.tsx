import React from "react";
import { useRouter } from "next/router";
import { Text, Button } from "@mantine/core";
import { useBookmarks } from "../../contexts/BookmarkContext";
import Title from "../../components/Title/Titles";
import styles from "../../styles/Bookmark.module.css";

const BookmarkFolders = () => {
  const router = useRouter();
  const { folders } = useBookmarks();

  // 处理文件夹点击
  const handleFolderClick = (folderId: string) => {
    router.push(`/bookmarks/${folderId}`);
  };

  return (
    <div>
      <Title
        hasPrev={true}
        titleImg="/titleimghome.PNG"
        title="Bookmark Folders"
        onPrevClick={() => router.push("/communication")}
      />

      <div className={styles.folderList}>
        {/* 默认文件夹 */}
        <div 
          className={styles.folderItem}
          onClick={() => handleFolderClick('default')}
        >
          <Text size="lg" weight={500}>Default Folder</Text>
          <Text size="sm" color="dimmed">Default bookmark storage</Text>
        </div>

        {/* 自定义文件夹列表 */}
        {folders.map(folder => (
          <div
            key={folder.id}
            className={styles.folderItem}
            onClick={() => handleFolderClick(folder.id)}
          >
            <Text size="lg" weight={500}>{folder.name}</Text>
            <Text size="sm" color="dimmed">
              {folder.bookmarks.length} bookmark(s)
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkFolders;