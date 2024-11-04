// Titles.tsx
import React, { useState } from "react";
import { IconChevronLeft, IconPrinter, IconX } from "@tabler/icons-react";  // 添加 IconX
import { Title, Modal, Button } from "@mantine/core";  // 改用 Modal
import { useStyles } from "@/components/Title/TitleStyle";

interface TitlesProps {
  hasPrev: boolean;
  titleImg: string;
  title: string;
  onPrevClick?: () => void;
  showPrintButton?: boolean;
}

const Titles = ({
  hasPrev,
  titleImg,
  title,
  onPrevClick,
  showPrintButton,
}: TitlesProps) => {
  const { classes } = useStyles({ backgroundImageUrl: titleImg });
  const ChevronIcon = IconChevronLeft;
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      {hasPrev ? (
        <a onClick={onPrevClick}>
          <ChevronIcon className={classes.chevron} size="3.4rem" stroke={2} />
        </a>
      ) : null}

      <div className={classes.inner}>
        <Title className={classes.title}>{title}</Title>
      </div>

      {showPrintButton && (
        <>
          <button
            className={classes.printButton}
            onClick={() => setIsPrintOpen(true)}
            aria-label="Print"
          >
            <IconPrinter size={20} className={classes.printIcon} stroke={2} />
          </button>

          <Modal
            opened={isPrintOpen}
            onClose={() => setIsPrintOpen(false)}
            title="Share Resources"
            size="md"
            centered
            closeButtonProps={{
              'aria-label': 'Close modal',
              icon: <IconX size={18} />,
            }}
          >
            <div>
              {/* Modal content will go here */}
              <div>分享链接和二维码将放在这里</div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Titles;