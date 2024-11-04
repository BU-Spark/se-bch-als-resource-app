// components/Title/Titles.tsx
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
}

const Titles = ({
  hasPrev,
  titleImg,
  title,
  onPrevClick,
  showPrintButton,
  shareUrl,
}: TitlesProps) => {
  const { classes } = useStyles({ backgroundImageUrl: titleImg });
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const ChevronIcon = IconChevronLeft;

  return (
    <div className={classes.wrapper}>
      {/* Previous code remains the same */}

      {showPrintButton && (
        <>
          <button
            className={classes.printButton}
            onClick={() => setIsPrintOpen(true)}
            aria-label="Share Resources"
          >
            <IconPrinter size={20} className={classes.printIcon} stroke={2} />
          </button>

          <Modal
            opened={isPrintOpen}
            onClose={() => setIsPrintOpen(false)}
            title="Share Resources"
            size="md"
            centered
          >
            <div className={classes.modalContent}>
              <Text className={classes.modalTitle}>Save Your Resources</Text>
              <Text className={classes.modalSubtitle}>
                Use the link below to automatically load and access your bookmarks in
                the future, from any device.
              </Text>
              <div className={classes.modalLinkContainer}>
                <CopyableLink url={shareUrl || ''} />
              </div>
              <div className={classes.qrCodeContainer}>
                <QRCode 
                  value={shareUrl || ''}
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  level="H"
                />
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Titles;