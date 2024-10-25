import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { ResourceLink } from "@/types/dataTypes";

// 定义文件夹类型
interface BookmarkFolder {
  id: string;
  name: string;
  bookmarks: ResourceLink[];
}

// Context 类型定义
type BookmarkContextType = {
  bookmarks: ResourceLink[];
  folders: BookmarkFolder[];
  addBookmark: (newBookmark: ResourceLink, folderId?: string) => void;
  removeBookmark: (bookmarkId: string, folderId?: string) => void;
  createFolder: (name: string) => void;
  deleteFolder: (folderId: string) => void;
  renameFolder: (folderId: string, newName: string) => void;
  clearAllFolders: () => void;
  clearBookmarks: () => void;
  clearFolder: (folderId: string) => void;
  getFolderBookmarks: (folderId: string) => ResourceLink[];
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [bookmarks, setBookmarks] = useState<ResourceLink[]>([]);

  // 加载 bookmarks
  useEffect(() => {
    const loadBookmarks = () => {
      try {
        const savedBookmarks = localStorage.getItem('bookmarks');
        if (savedBookmarks) {
          setBookmarks(JSON.parse(savedBookmarks));
        }
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  // 加载 folders
  useEffect(() => {
    const loadFolders = () => {
      try {
        const savedFolders = localStorage.getItem('bookmarkFolders');
        if (savedFolders) {
          setFolders(JSON.parse(savedFolders));
        }
      } catch (error) {
        console.error('Failed to load folders:', error);
      }
    };

    loadFolders();
  }, []);

  // 保存 bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }, [bookmarks]);

  // 保存 folders
  useEffect(() => {
    try {
      localStorage.setItem('bookmarkFolders', JSON.stringify(folders));
    } catch (error) {
      console.error('Failed to save folders:', error);
    }
  }, [folders]);

  const addBookmark = (newBookmark: ResourceLink, folderId?: string) => {
    if (folderId) {
      setFolders(prev => prev.map(folder => {
        if (folder.id === folderId) {
          const bookmarkExists = folder.bookmarks.some(b => b.id === newBookmark.id);
          if (!bookmarkExists) {
            return {
              ...folder,
              bookmarks: [...folder.bookmarks, newBookmark]
            };
          }
        }
        return folder;
      }));
    } else {
      setBookmarks(prev => {
        if (!prev.some(bookmark => bookmark.id === newBookmark.id)) {
          return [...prev, newBookmark];
        }
        return prev;
      });
    }
  };

  const removeBookmark = (bookmarkId: string, folderId?: string) => {
    if (folderId) {
      setFolders(prev => prev.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            bookmarks: folder.bookmarks.filter(b => b.id !== bookmarkId)
          };
        }
        return folder;
      }));
    } else {
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== bookmarkId));
    }
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('bookmarks');
  };

  const createFolder = (name: string) => {
    const newFolder: BookmarkFolder = {
      id: Date.now().toString(),
      name,
      bookmarks: []
    };
    setFolders(prev => [...prev, newFolder]);
  };

  const deleteFolder = (folderId: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== folderId));
  };

  const renameFolder = (folderId: string, newName: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId 
        ? { ...folder, name: newName }
        : folder
    ));
  };

  const clearAllFolders = () => {
    setFolders([]);
    localStorage.removeItem('bookmarkFolders');
  };

  const clearFolder = (folderId: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId 
        ? { ...folder, bookmarks: [] }
        : folder
    ));
  };

  const getFolderBookmarks = (folderId: string): ResourceLink[] => {
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.bookmarks : [];
  };

  const value = {
    bookmarks,
    folders,
    addBookmark,
    removeBookmark,
    createFolder,
    deleteFolder,
    renameFolder,
    clearAllFolders,
    clearBookmarks,
    clearFolder,
    getFolderBookmarks
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;