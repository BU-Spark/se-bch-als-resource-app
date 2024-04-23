import { useBookmarks } from "../../contexts/BookmarkContext";
import { Text, Button } from "@mantine/core";
import { bodyContentUseStyles } from "../../utils/BodyContentStyle";
import { ResourceLink } from "@/types/dataTypes";

import { useRouter } from "next/router";

type BookmarkButtonProps = {
  id: string;
  url: string;
  title: string;
  solutionPage: boolean;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  id,
  title,
  url,
  solutionPage,
}) => {
  const { classes } = bodyContentUseStyles();

  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === id);

  const router = useRouter();

  const handleBookmarkClick = () => {
    console.log(`Triggered handle bookmark click: ${id}, ${title}, ${url}`);
    if (isBookmarked) {
      removeBookmark(id);
    } else {
      const newBookmark: ResourceLink = { id, title, url };
      console.log(newBookmark);
      addBookmark(newBookmark);
    }
  };

  return (
    <div>
      <Button
        className={classes.inner}
        variant="outline"
        style={{ marginTop: "40px" }}
        onClick={handleBookmarkClick}
      >
        <Text
          fz="xl"
          style={{
            fontSize: "16px",
            whiteSpace: "normal",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          {isBookmarked ? "Unsave this resource" : "Save this resources"}
        </Text>
      </Button>
      {solutionPage ? (
        <Button
          className={classes.inner}
          variant="outline"
          style={{ marginTop: "10px" }}
          onClick={() => {
            router.push("./bookmarks");
          }}
        >
          <Text
            fz="xl"
            style={{
              fontSize: "16px",
              whiteSpace: "normal",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Go to your bookmarks
          </Text>
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BookmarkButton;
