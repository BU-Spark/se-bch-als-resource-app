import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { ResourceLink } from "@/types/dataTypes";

type BookmarkContextType = {
  bookmarks: ResourceLink[];
  addBookmark: (newBookmark: ResourceLink) => void;
  removeBookmark: (id: string) => void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);



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

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<ResourceLink[]>(() => {
    return [];
  });
  const bookmarksLoaded = useRef(true);


  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    console.log(saved);
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
    //bookmarksLoaded.current = true;
  }, []);

  useEffect(() => {
    if(bookmarksLoaded.current) {
      bookmarksLoaded.current = false;
      return;
    }
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

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
