import React from "react";
import { useBookmarks } from "../contexts/BookmarkContext";
import BookmarkButton from "../components/BookmarkButton/BookmarkButton";

const BookMarkPage: React.FC = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div>
      <h1>Bookmarks</h1>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.id}
            </a>
            <BookmarkButton
              id={bookmark.id}
              title={bookmark.title}
              url={bookmark.url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookMarkPage;
