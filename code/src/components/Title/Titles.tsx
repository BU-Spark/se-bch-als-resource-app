import React, { useState } from "react";
import { IconChevronLeft, IconPrinter } from "@tabler/icons-react";
import { Title as MantineTitle, Modal, Text, Button, Group } from "@mantine/core";
import QRCode from "react-qr-code";
import { useStyles } from "./TitleStyle";
import CopyableLink from "../CopyURL/CopyUrl";

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
  const { classes } = useStyles({ backgroundImageUrl: titleImg });
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const ChevronIcon = IconChevronLeft;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={classes.wrapper}>
      {hasPrev && (
        <a onClick={onPrevClick}>
          <ChevronIcon className={classes.chevron} size="3.4rem" stroke={2} />
        </a>
      )}

      <div className={classes.inner}>
        <MantineTitle className={classes.title}>{title}</MantineTitle>
        {subtitle && (
          <div className={classes.subtitleWrapper}>
            <Text className={classes.subtitle}>{subtitle}</Text>
          </div>
        )}
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
            zIndex={1001}
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