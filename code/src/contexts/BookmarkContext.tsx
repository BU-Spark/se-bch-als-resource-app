import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { ResourceLink } from "@/types/dataTypes";

/**
 * Type definition for Bookmark context state and functions.
 */
type BookmarkContextType = {
  bookmarks: ResourceLink[];
  addBookmark: (newBookmark: ResourceLink) => void;
  removeBookmark: (id: string) => void;
};

/**
 * Create a context for the bookmark functionality with an undefined default value.
 */
const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

/**
 * Custom hook to use the bookmark context.
 * @throws Will throw an error if used outside of BookmarkProvider context.
 */
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

type BookmarkProviderProps = {
  children: ReactNode;
};

/**
 * Provides the bookmark context to child components.
 * Initializes the bookmark state from localStorage to capture saved bookmarks
 */
export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<ResourceLink[]>(() => {
    return [];
  });
  const bookmarksLoaded = useRef(true);

  // Effect to load bookmarks from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  // Effect to save bookmarks to localStorage when bookmarks state changes
  useEffect(() => {
    if (bookmarksLoaded.current) {
      bookmarksLoaded.current = false;
      return;
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  /**
   * Adds a new bookmark to the state.
   * @param newBookmark - The new bookmark to be added.
   */
  const addBookmark = (newBookmark: ResourceLink) => {
    setBookmarks((prevBookmarks) => {
      const bookmarkExists = prevBookmarks.some(
        (bookmark) => bookmark.id === newBookmark.id
      );
      if (!bookmarkExists) {
        return [...prevBookmarks, newBookmark];
      }
      return prevBookmarks;
    });
  };

  /**
   * Removes a bookmark from the state.
   * @param id - The ID of the bookmark to be removed.
   */
  const removeBookmark = (id: string) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.id !== id)
    );
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
