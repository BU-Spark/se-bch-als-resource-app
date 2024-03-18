import React, { useRef } from "react";
import { useRouter } from "next/router";

import { useBookmarks } from "../contexts/BookmarkContext";

import ResourcesHandouts from "../components/MainBody/SolutionPageContent/ResourcesHandouts";
import Title from "../components/Title/Titles";

const BookMarkPage: React.FC = () => {
  const { bookmarks } = useBookmarks();
  const router = useRouter();
  const image = useRef("/titleimghome.PNG");

  return (
    <div>
      <Title
        hasPrev={true}
        router={router}
        titleImg={image.current}
        title={"Bookmarks"}
      />
      <ResourcesHandouts title={""} data={bookmarks} />
    </div>
  );
};

export default BookMarkPage;
