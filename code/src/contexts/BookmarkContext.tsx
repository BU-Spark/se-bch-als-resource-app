import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { ResourceLink } from "@/types/dataTypes";

// Define the structure of a bookmark folder
interface BookmarkFolder {
  id: string;
  name: string;
  bookmarks: ResourceLink[];
}

// Define the types for the Bookmark Context
type BookmarkContextType = {
  bookmarks: ResourceLink[];
  folders: BookmarkFolder[];
  addBookmark: (newBookmark: ResourceLink, folderId?: string) => void;
  removeBookmark: (bookmarkId: string, currentFolderId: string | undefined) => void;
  createFolder: (name: string) => void;
  deleteFolder: (folderId: string) => void;
  renameFolder: (folderId: string, newName: string) => void;
  clearAllFolders: () => void;
  clearBookmarks: () => void;
  clearFolder: (folderId: string) => void;
  getFolderBookmarks: (folderId: string) => ResourceLink[];
  isBookmarked: (bookmarkId: string) => boolean;
};

// Create the Bookmark Context
const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

// Custom hook to use the Bookmark Context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

// BookmarkProvider to manage state and provide context
export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [bookmarks, setBookmarks] = useState<ResourceLink[]>([]);

  // Load bookmarks from localStorage when the component mounts
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

  // Load folders from localStorage when the component mounts
  useEffect(() => {
    const loadFolders = () => {
      try {
        const savedFolders = localStorage.getItem('bookmarkFolders'); // Retrieve folders from localStorage
        if (savedFolders) {
          setFolders(JSON.parse(savedFolders)); // Parse and set folders
        }
      } catch (error) {
        console.error('Failed to load folders:', error); // Handle potential errors
      }
    };

    loadFolders();
  }, []);

  // Save bookmarks to localStorage whenever they are updated
  useEffect(() => {
    try {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // Save bookmarks as a string
    } catch (error) {
      console.error('Failed to save bookmarks:', error); // Handle potential errors
    }
  }, [bookmarks]);

  // Save folders to localStorage whenever they are updated
  useEffect(() => {
    try {
      localStorage.setItem('bookmarkFolders', JSON.stringify(folders)); // Save folders as a string
    } catch (error) {
      console.error('Failed to save folders:', error); // Handle potential errors
    }
  }, [folders]);

  // Add a new bookmark to the default folder or a specific folder
  const addBookmark = (newBookmark: ResourceLink, folderId?: string) => {
    if (folderId && folderId !== 'default') {
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

  // Remove a bookmark from a specific folder or the default folder
  const removeBookmark = (bookmarkId: string, sourceFolderId?: string) => {
    if (sourceFolderId && sourceFolderId !== 'default') {
      setFolders(prev => prev.map(folder => ({
        ...folder,
        bookmarks: folder.id === sourceFolderId
          ? folder.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
          : folder.bookmarks
      })));
    } else {
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== bookmarkId));
    }
  };

  // Clear all bookmarks in the default folder
  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('bookmarks');
  };

  // Create a new folder
  const createFolder = (name: string) => {
    const newFolder: BookmarkFolder = {
      id: Date.now().toString(),
      name,
      bookmarks: []
    };
    setFolders(prev => [...prev, newFolder]);
  };

  // Delete a specific folder
  const deleteFolder = (folderId: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== folderId));
  };

  // Rename a folder
  const renameFolder = (folderId: string, newName: string) => {
    setFolders(prev => prev.map(folder =>
      folder.id === folderId
        ? { ...folder, name: newName }
        : folder
    ));
  };

  // Clear all folders
  const clearAllFolders = () => {
    setFolders([]);
    localStorage.removeItem('bookmarkFolders');
  };

  // Clear bookmarks from a specific folder
  const clearFolder = (folderId: string) => {
    setFolders(prev => prev.map(folder =>
      folder.id === folderId
        ? { ...folder, bookmarks: [] }
        : folder
    ));
  };

  // Retrieve bookmarks from a specific folder
  const getFolderBookmarks = (folderId: string): ResourceLink[] => {
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.bookmarks : [];
  };

  // Check if a bookmark exists in any folder or the default folder
  const isBookmarked = (bookmarkId: string): boolean => {
    if (bookmarks.some((bookmark) => bookmark.id === bookmarkId)) {
      return true;
    }
    for (const folder of folders) {
      if (folder.bookmarks.some((bookmark) => bookmark.id === bookmarkId)) {
        return true;
      }
    }
    return false;
  };

  // Provide context values to children components
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
    getFolderBookmarks,
    isBookmarked
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;
