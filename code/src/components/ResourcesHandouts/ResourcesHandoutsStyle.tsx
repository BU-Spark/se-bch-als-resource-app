import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  inner: {
    height: "57px",
    display: "flex",
    width: "100%",
    color: "#254885",
    border: "2px solid #254885",
    borderRadius: rem(10),
    justifyContent: "start",
    alignItems: "center",
    alignContent: "center",
    cursor: "pointer",
  },

  text: {
    fontWeight: 600,
    paddingTop: rem(12),
    width: "80%",
    fontSize: rem(20),
    fontStyle: "normal",
    letterSpacing: rem(-1),
    color: "#254885",
    textAlign: "left",
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(20),
      textAlign: "left",
      width: "80%",
    },
  },

  outer: {
    paddingTop: rem(24),
    pddingBottom: rem(24),
    paddingLeft: "10%",
  },

  linkContainer: {
    display: "flex",
    alignItems: "flex-end",
  },

  resourceButtonContainer: {
    flexGrow: 1,
    marginBottom: "8px",
  },

  bookmarkButtonContainer: {
    marginBottom: "8px",
    marginLeft: "8px",
  },
}));
