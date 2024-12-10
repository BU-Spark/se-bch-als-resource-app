import React, { useState } from "react";
import { IconChevronLeft, IconPrinter } from "@tabler/icons-react";
import { Title as MantineTitle, Modal, Text, Button, Group } from "@mantine/core";
import QRCode from "react-qr-code";
import { useStyles } from "./TitleStyle";
import CopyableLink from "../CopyURL/CopyUrl";

// Define the properties for the Titles component
interface TitlesProps {
  hasPrev: boolean;
  titleImg: string;
  title: string;
  subtitle?: string;
  onPrevClick?: () => void;
  showPrintButton?: boolean;
  shareUrl?: string;
  folderName?: string;
  bookmarks?: {
    url: string | undefined;
    id: string;
    title: string;
    description?: string;
  }[];
}

// Main Titles component
const Titles = ({
  hasPrev,
  titleImg,
  title,
  subtitle,
  onPrevClick,
  showPrintButton,
  shareUrl,
  folderName,
  bookmarks,
}: TitlesProps) => {
  // Retrieve styles and manage state for the print/share modal
  const { classes } = useStyles({ backgroundImageUrl: titleImg });
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const ChevronIcon = IconChevronLeft;

  // Printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={classes.wrapper}>
      {/* Display a "back" button if hasPrev is true */}
      {hasPrev && (
        <a onClick={onPrevClick}>
          <ChevronIcon className={classes.chevron} size="3.4rem" stroke={2} />
        </a>
      )}

      {/* Display the title and subtitle */}
      <div className={classes.inner}>
        <MantineTitle className={classes.title}>{title}</MantineTitle>
        {subtitle && (
          <div className={classes.subtitleWrapper}>
            <Text className={classes.subtitle}>{subtitle}</Text>
          </div>
        )}
      </div>

      {/* Display a "Share" button and modal if showPrintButton is true */}
      {showPrintButton && (
        <>
          <button
            className={classes.printButton}
            onClick={() => setIsPrintOpen(true)}
            aria-label="Share Resources"
          >
            <IconPrinter size={20} className={classes.printIcon} stroke={2} />
            <span>Share</span>
          </button>

          {/* Modal for sharing and printing the collection */}
          <Modal
            opened={isPrintOpen}
            onClose={() => setIsPrintOpen(false)}
            title=""
            size="xl"
            zIndex={1001}
            centered
          >
            <div className={classes.modalContent}>
              {/* Display a QR code and share link */}
              <div className={classes.modalTopSection}>
                <div className={classes.qrCodeContainer}>
                  <QRCode
                    value={shareUrl || ''} // The URL or data to encode in the QR code
                    size={200}
                    level="H"
                  />
                </div>

                <div className={classes.shareLinkSection}>
                  <Text className={classes.modalTitle}>Share Your Collection</Text>
                  <Text className={classes.shareText}>
                    Scan the QR code or copy the url to share with others.
                  </Text>
                  <CopyableLink url={shareUrl || ''} />
                </div>
              </div>

              {/* Display the collection name and list of bookmarks */}
              <div className={classes.collectionSection}>
                <Text className={classes.collectionTitle}>
                  &quot;{folderName || 'Default Collection'}&quot;
                </Text>
                <div className={classes.bookmarksList}>
                  {bookmarks && bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className={classes.bookmarkItem}>
                      <Text>{bookmark.title}</Text>
                      <Text className={classes.bookmarkDescription}>
                        {bookmark.description || bookmark.url}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons for printing or closing the modal */}
              <Group position="apart" mt="xl">
                <Button
                  className={classes.printPreviewButton}
                  onClick={handlePrint}
                >
                  Print Your List
                </Button>
                <button className={classes.doneButton} onClick={() => setIsPrintOpen(false)}>
                  Done
                </button>
              </Group>
            </div>

            {/* Content that appears only in the print view */}
            <div className={classes.printOnlyContent}>
              <div className={classes.printQrSection}>
                <QRCode
                  value={shareUrl || ''}
                  size={200}
                  level="H"
                />
              </div>
              <div className={classes.printUrlSection}>
                {shareUrl}
              </div>
              <div className={classes.printTitleSection}>
                {folderName || 'Default Collection'}
              </div>
              <div className={classes.printBookmarksList}>
                {bookmarks && bookmarks.map((bookmark) => (
                  <div key={bookmark.id} className={classes.printBookmarkItem}>
                    <Text>{bookmark.title}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Titles;
