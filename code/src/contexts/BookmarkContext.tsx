import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export type Bookmark = {
  id: number;
  title: string;
  url: string;
};

type BookmarkContextType = {
  bookmarks: Bookmark[];
  addBookmark: (newBookmark: Bookmark) => void;
  removeBookmark: (id: number) => void;
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
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    return [];
  });

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (newBookmark: Bookmark) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
  };

  const removeBookmark = (id: number) => {
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
