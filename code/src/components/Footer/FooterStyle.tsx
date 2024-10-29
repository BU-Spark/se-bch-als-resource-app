import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  footer: {
    position: "fixed",
    height: "120px",
    display: "flex",
    width: "calc(100% - 250px)",
    marginLeft: "250px",
    bottom: 0,
    marginTop: "60px",
    marginBottom: rem(0),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: "#254885",
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    boxShadow: "0px 2px 30px rgba(180, 180, 180, 0.25)",
    transition: 'all 0.3s ease',
  },

  footerCollapsed: {
    width: "calc(100% - 60px)",
    marginLeft: "60px",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    maxWidth: rem(200),
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
      maxHeight: rem(80),
      maxWidth: "50px",
    },
  },

  groups: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    paddingLeft: rem(40),
  },

  wrapper: {
    width: rem(160),
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