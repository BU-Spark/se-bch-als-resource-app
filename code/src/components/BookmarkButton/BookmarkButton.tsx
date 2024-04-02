import Image from "next/image";
import { useBookmarks } from "../../contexts/BookmarkContext";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  button: {
    height: "57px",
    width: "130px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "2px solid #254885",
    borderRadius: theme.radius.md,
    cursor: "pointer",
    marginLeft: theme.spacing.md,
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
}));

type BookmarkButtonProps = {
  id: string;
  url: string;
  title: string;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ id, title, url }) => {
  const { classes } = useStyles();
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

  const iconPath = isBookmarked ? "/unbookmarked.svg" : "/bookmarked.svg";

  return (
    <button onClick={handleBookmarkClick} className={classes.button}>
      <Image
        src={iconPath}
        alt={isBookmarked ? "Unbookmark" : "Bookmark this page"}
        width={45}
        height={45}
        layout="fixed"
      />
    </button>
  );
};

export default BookmarkButton;
