import { IconChevronLeft } from "@tabler/icons-react";

import { Title } from "@mantine/core";

import { useStyles } from "@/components/Title/TitleStyle";

interface TitlesProps {
  hasPrev: boolean;
  titleImg: string;
  title: string;
  onPrevClick?: () => void;
}

/**
 * Displays a title banner with an optional back button.
 *
 * @param {boolean} hasPrev - Indicates if the back button should render.
 * @param {string} titleImg - The background image URL.
 * @param {string} title - The title to display.
 * @param {() => void} onPrevClick - Optional click handler for the previous button.
 */
const Titles = ({ hasPrev, titleImg, title, onPrevClick }: TitlesProps) => {
  const { classes } = useStyles({ backgroundImageUrl: titleImg });
  const ChevronIcon = IconChevronLeft;

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
    </div>
  );
};

export default Titles;
