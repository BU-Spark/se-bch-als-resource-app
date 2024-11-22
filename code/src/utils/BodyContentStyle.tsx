import { createStyles, rem } from "@mantine/core";

export const bodyContentUseStyles = createStyles((theme) => ({
  inner: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    color: "#254885",
    border: "2px solid #254885",
    borderRadius: rem(10),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap:"15px",
    padding:"0px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#254885",
      color: "#FFFFFF",
      "& svg": {
        color: "#FFFFFF",
      },
      
    },

    [theme.fn.smallerThan("xs")]: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      gap:"15px",
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
    fontSize: rem(20),
    fontStyle: "normal",
    letterSpacing: rem(-1),
    color: "#254885",
    textAlign: "left",
    alignContent: "center",
    fontFamily: `Montserrat, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(16),
      textAlign: "left",
      width: "80%",
    },
  },

  descriptionText: {
    fontSize: rem(16), // smaller font size than 'text'
    fontWeight: "normal", // less bold than 'text'
    color: "#254885", // same color as 'text'
    paddingTop: rem(1), // add some space above the description
    fontStyle: "normal",
    letterSpacing: rem(-0.5),
    textAlign: "left",
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(16),
      textAlign: "left",
    },
  },

  choiceText: {
    fontSize: "clamp(18px, 2vw, 24px)",
    whiteSpace: "normal",
    textAlign: "center",
    textDecoration: "none",
  },

  subtitleText:{
    fontSize: "clamp(14px, 1.5vw, 18px)",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: rem(-0.5),
    textAlign: "left",
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

  outer: {
    paddingTop: rem(26),
    pddingBottom: "10%",
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    height: "100%",
    flexGrow:1,
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
