import React from "react";
import { useRouter } from "next/router";
import { Loader, Text, Button } from "@mantine/core";
import { useBookmarks } from "../../contexts/BookmarkContext";
import Title from "../../components/Title/Titles";
import ResourcesHandouts from "../../components/ResourcesHandouts/ResourcesHandouts";
import CopyableLink from "../../components/CopyURL/CopyUrl";
import { bodyContentUseStyles } from "../../utils/BodyContentStyle";
import styles from "../../styles/Bookmark.module.css";

const FolderDetail = () => {
  const { classes } = bodyContentUseStyles();
  const router = useRouter();
  const { folderId } = router.query;
  const { bookmarks, folders, removeBookmark, clearBookmarks } = useBookmarks();

  const APP_URL = "https://se-bch-als-resource-app-zeta.vercel.app/";

  // 获取当前文件夹信息
  const getCurrentFolderContent = () => {
    if (folderId === 'default') {
      return {
        name: 'Default Folder',
        bookmarks: bookmarks
      };
    }
    return folders.find(folder => folder.id === folderId) || { name: '', bookmarks: [] };
  };

  const folderContent = getCurrentFolderContent();

  // 生成分享链接
  const generateShareUrl = () => {
    const currentBookmarks = folderContent.bookmarks;
    const bookmarkIds = currentBookmarks
      .map((bookmark) => bookmark.id)
      .join(",");
    return `${APP_URL}bookmarks/${folderId}?ids=${encodeURIComponent(bookmarkIds)}`;
  };

  // Clear folder功能
  const handleClearFolder = () => {
    if (folderId === 'default') {
      clearBookmarks();
    } else {
      // 清除特定文件夹的内容
      // 这个功能需要在 BookmarkContext 中实现
    }
  };

  // Unsave bookmark功能
  const handleUnsaveBookmark = (bookmarkId: string) => {
    removeBookmark(bookmarkId, folderId === 'default' ? undefined : folderId as string);
  };

  return (
    <div>
      <Title
        hasPrev={true}
        titleImg="/titleimghome.PNG"
        title={folderContent.name}
        onPrevClick={() => router.push("/bookmarks")}
      />

      <div className={styles.folderContent}>
        {folderContent.bookmarks.length > 0 ? (
          <>
            {/* 分享链接部分 */}
            <div className={classes.outer}>
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
              title={folderContent.name}
              data={folderContent.bookmarks}
              onUnsave={handleUnsaveBookmark}
            />
            <Button
              onClick={handleClearFolder}
              color="red"
              variant="outline"
              className={styles.clearButton}
            >
              Clear Folder
            </Button>
          </>
        ) : (
          <Text className={styles.emptyMessage}>
            No bookmarks in this folder.
          </Text>
        )}
      </div>
    </div>
  );
};

export default FolderDetail;