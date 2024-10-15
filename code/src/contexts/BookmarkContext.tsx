import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { ResourceLink } from "@/types/dataTypes";

type BookmarkContextType = {
  bookmarks: ResourceLink[];
  addBookmark: (newBookmark: ResourceLink) => void;
  removeBookmark: (id: string) => void;
  clearBookmarks: () => void;
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
  const [bookmarks, setBookmarks] = useState<ResourceLink[]>([]);

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

  useEffect(() => {
    try {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }, [bookmarks]);

  const addBookmark = (newBookmark: ResourceLink) => {
    setBookmarks(prevBookmarks => {
      if (!prevBookmarks.some(bookmark => bookmark.id === newBookmark.id)) {
        return [...prevBookmarks, newBookmark];
      }
      return prevBookmarks;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.id !== id));
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('bookmarks');
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, clearBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};