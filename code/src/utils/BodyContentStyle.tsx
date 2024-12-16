import { createStyles, rem } from "@mantine/core";

export const bodyContentUseStyles = createStyles((theme) => ({
  inner: {
    height: "57px",
    display: "flex",
    width: "100%",
    color: "#254885",
    border: "2px solid #254885",
    borderRadius: rem(10),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#254885",
      color: "#FFFFFF",
      "& svg": {
        color: "#FFFFFF",
      },
    },
    [theme.fn.smallerThan("xs")]: {
      height: "57px",
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      "&:hover": {
        backgroundColor: "#254885",
        color: "#FFFFFF",
      },
    },
  },

  chevron: {
    transition: "transform 200ms ease",
    position: "absolute",
    left: "2.02%",
    top: "12.36%",
    color: "#FFFFFF",
  },

  text: {
    fontWeight: 600,
    paddingTop: rem(12),
    width: "100%",
    fontSize: '1.5rem',
    fontStyle: "normal",
    letterSpacing: rem(-1),
    color: "#254885",
    textAlign: "left",
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    [theme.fn.smallerThan("xs")]: {
      fontSize: "clamp(20px, 1.5vw, 25px)",
      textAlign: "left",
      width: "80%",
    },
  },

  outer: {
    paddingTop: rem(26),
    paddingBottom: "10%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },

  homeButton: {
    height: "165px",
    width: "100%",
    display: "flex",
    color: "#254885",
    border: "2px solid #254885",
    borderRadius: rem(10),
    justifyContent: "flex-start",
    alignItems: "center",
    padding: rem(16),
    cursor: "pointer",
    gap: rem(12),
    [theme.fn.smallerThan("sm")]: {
      height: "auto",
      flexDirection: "row",
      padding: rem(12),
      gap: rem(8),
    },
    [theme.fn.smallerThan("xs")]: {
      padding: rem(8),
      gap: rem(4),
    },
  },

  homeIconContainer: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    backgroundColor: "#E8EEF8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    position: "relative",
    [theme.fn.smallerThan("sm")]: {
      width: "3rem",
      height: "3rem",
    },
    [theme.fn.smallerThan("xs")]: {
      width: "3rem",
      height: "3rem",
    },
  },

  homeTextContainer: {
    flexGrow: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: rem(4),
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    [theme.fn.smallerThan("sm")]: {
      gap: rem(2),
    },
  },

  choiceText: {
    fontSize: rem(21),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "left",
    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(19),
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(17),
    },
  },

  descriptionText: {
    fontSize: rem(16),
    fontWeight: "normal",
    color: "#254885",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontStyle: "normal",
    letterSpacing: rem(-0.5),
    textAlign: "left",
  },

  solutionsButtonText:{
    fontSize: "clamp(18px, 1.8vw, 20px)",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: rem(-0.5),
    textAlign: "left",
    textDecoration: "none",
  },

  questionBoxes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "10px", // Adjust spacing between the icon and text
    padding: "20px",
    border: "1px solid #254885",
    borderRadius: "8px",
    width: "100%",
    boxSizing: "border-box",
  },
  
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Align text to start (left)
    padding:"0px",
    width:"100%",
    
  },

  image:{
    marginLeft:"7%",
    padding:"0",
  },

  


  bookmarkContainer: {
    height: "80px",
    display: "flex",
    width: "100%",
    color: "#254885",
    border: "2px solid #254885",
    borderRadius: rem(10),
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: "20px",
    cursor: "pointer",
  },

  copyIcon: {
    marginRight: "20px",
    width: "30px",
    height: "30px",
  },

  iconColor: {
    color: "#254885",
  },
}));
