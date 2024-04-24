import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles(
  (theme, { backgroundImageUrl }: { backgroundImageUrl: string }) => ({
    chevron: {
      transition: "transform 200ms ease",
      position: "absolute",
      left: rem(14),
      top: "15.36%",
      color: "#FFFFFF",
    },

    wrapper: {
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: rem(203),
      backgroundImage: `linear-gradient(0deg, rgba(0, 48, 135, 0.5), rgba(0, 48, 135, 0.5)), url(${backgroundImageUrl})`,
    },

    inner: {
      position: "absolute",
      width: rem(132),
      height: rem(41),
      left: rem(24),
      bottom: rem(24),
      zIndex: 1,
    },

    title: {
      fontWeight: 600,
      fontSize: rem(35),
      fontStyle: "normal",
      letterSpacing: rem(-1),
      paddingRight: theme.spacing.xs,
      color: theme.white,
      marginBottom: theme.spacing.xs,
      textAlign: "left",
      fontFamily: `Montserrat, ${theme.fontFamily}`,
      lineHeight: rem(51),
      paddingLeft: rem(10),

      [theme.fn.smallerThan("xs")]: {
        fontSize: rem(35),
        textAlign: "left",
        paddingLeft: rem(10),
      },
    },
  })
);
