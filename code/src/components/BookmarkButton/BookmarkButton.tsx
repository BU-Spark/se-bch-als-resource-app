import React from "react";
import { useBookmarks } from "../../contexts/BookmarkContext";

type BookmarkButtonProps = {
  id: number;
  title: string;
  url: string;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ id, title, url }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === id);

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(id);
    } else {
      const newBookmark = { id, title, url };
      addBookmark(newBookmark);
    }
  };

  return (
    <button onClick={handleBookmarkClick}>
      {isBookmarked ? "Unbookmark" : "Bookmark this page"}
    </button>
  );
};

export default BookmarkButton;
