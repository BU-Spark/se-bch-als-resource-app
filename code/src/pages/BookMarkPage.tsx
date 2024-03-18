import React from "react";
import { useBookmarks } from "../contexts/BookmarkContext";
import BookmarkButton from "../components/BookmarkButton/BookmarkButton";
import ResourcesHandouts from "../components/MainBody/SolutionPageContent/ResourcesHandouts";

const BookMarkPage: React.FC = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div>
      <h1>Bookmarks</h1>
      <ResourcesHandouts title={"Bookmarks"} data={bookmarks} />
    </div>
  );
};

export default BookMarkPage;
