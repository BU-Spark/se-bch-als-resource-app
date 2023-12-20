import {
  Title,
  createStyles,
  rem
} from '@mantine/core';
import { IconChevronLeft} from '@tabler/icons-react';

/**
 * Titles component 
 */


//displays the title passed as a prop and applies custom styles from useStyles
const Titles = ({hasPrev, prevQuestion, titleImg, title}:{hasPrev: boolean, prevQuestion: () => any, titleImg: string, title: string}) => {
  const { classes} = useStyles();
  const ChevronIcon = IconChevronLeft;

  return (
    <div className={classes.wrapper} style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 48, 135, 0.5), rgba(0, 48, 135, 0.5)), url(${titleImg})` }}>
        {hasPrev ? (
        <ChevronIcon
        // displays only if hasPrev is true, onClick triggers prevQuestion function
        className={classes.chevron}
        size="3.4rem"
        stroke={2}
        onClick={prevQuestion}
      />) : null}
      {/* Return a <div> that contains the ChevronIcon and the Title component */}
      <div className={classes.inner}>
        <Title className={classes.title}>
          {title}
        </Title>
      </div>
    </div>
  );
}

export default Titles;

const useStyles = createStyles((theme) => ({

  chevron: {
    transition: 'transform 200ms ease',
    position: "absolute", 
    left: rem(14), 
    top: "15.36%", 
    color: "#FFFFFF"
  },
  wrapper: {
    position: 'relative',
    // paddingTop: rem(10),
    // paddingBottom: rem(100),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: rem(203),

    [theme.fn.smallerThan('xs')]: {
      // paddingTop: rem(10),
      // paddingBottom: rem(100),
    },
  },
  inner: {
    position: 'absolute',
    width: rem(132),
    height: rem(41),
    left: rem(24),
    bottom: rem(24),
    // top: rem(130),
    zIndex: 1,
  },

  title: {
    fontWeight: 600,
    fontSize: rem(35),
    fontStyle: 'normal',
    letterSpacing: rem(-1),
    // paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'left',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    lineHeight: rem(51),
    paddingLeft: rem(10),

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(35),
      textAlign: 'left',
      paddingLeft: rem(10),
    },
  },

}));