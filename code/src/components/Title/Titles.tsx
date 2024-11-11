import React, { useState } from "react";
import { IconChevronLeft, IconPrinter } from "@tabler/icons-react";
import { Title as MantineTitle, Modal, Text } from "@mantine/core";
import QRCode from "react-qr-code";
import { useStyles } from "./TitleStyle";
import CopyableLink from "../CopyURL/CopyUrl";

interface TitlesProps {
  hasPrev: boolean;
  titleImg: string;
  title: string;
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

const Titles = ({
  hasPrev,
  titleImg,
  title,
  onPrevClick,
  showPrintButton,
  shareUrl,
  folderName,
  bookmarks,
}: TitlesProps) => {
  const { classes } = useStyles({ backgroundImageUrl: titleImg });
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const ChevronIcon = IconChevronLeft;

  return (
    <div className={classes.wrapper}>
      {hasPrev && (
        <a onClick={onPrevClick}>
          <ChevronIcon className={classes.chevron} size="3.4rem" stroke={2} />
        </a>
      )}

      <div className={classes.inner}>
        <MantineTitle className={classes.title}>{title}</MantineTitle>
      </div>

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

          <Modal
            opened={isPrintOpen}
            onClose={() => setIsPrintOpen(false)}
            title=""
            size="xl"
            centered
          >
            <div className={classes.modalContent}>
              <div className={classes.modalTopSection}>
                <div className={classes.qrCodeContainer}>
                  <QRCode
                    value={shareUrl || ''}
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

              <div className={classes.collectionSection}>
                <Text className={classes.collectionTitle}>
                  "{folderName || 'Default Folder'}"
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

              <button className={classes.doneButton} onClick={() => setIsPrintOpen(false)}>
                Done
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Titles;