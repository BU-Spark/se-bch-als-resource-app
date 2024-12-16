import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  footer: {
    position: "relative",
    bottom: 0,
    height: "120px",
    display: "flex",
    width: "calc(100% - 250px)",
    marginLeft: "250px",
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: "#254885",
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    boxShadow: "0px 2px 30px rgba(180, 180, 180, 0.25)",
    [theme.fn.smallerThan("sm")]: {
      width: "100% !important",
      marginLeft: "0 !important",
      padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
      height: "auto",
      minHeight: "120px",
    },
  },

  footerCollapsed: {
    width: "calc(100% - 60px)",
    marginLeft: "60px",
    [theme.fn.smallerThan("sm")]: {
      width: "100% !important",
      marginLeft: "0 !important",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      gap: rem(8),
      padding: `${theme.spacing.xs} 0`,
    },
  },

  logo: {
    display: "flex",
    alignItems: "center",
    maxWidth: rem(200),
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
      maxHeight: rem(60),
      maxWidth: "50px",
      margin: "0 auto",
    },
  },

  groups: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    paddingLeft: rem(40),
    [theme.fn.smallerThan("sm")]: {
      paddingLeft: rem(0),
      justifyContent: "center",
      width: "100%",
      gap: rem(10),
    },
  },

  wrapper: {
    width: rem(160),
    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      textAlign: "center",
      gap: rem(20),
    },
  },

  link: {
    display: "block",
    color: "#FFFFFF",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "15px",
    paddingTop: rem(3),
    paddingBottom: rem(3),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));