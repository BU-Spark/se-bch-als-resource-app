import { createStyles, rem } from '@mantine/core';

export const bodyContentUseStyles = createStyles((theme) => ({
  inner: {
    height: '57px',
    display: 'flex',
    width: '100%',
    // backgroundColor: 'transparent',
    color: '#254885',
    border: '2px solid #254885',
    borderRadius: rem(10),
    // width: rem(320),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'pointer',

    '&:hover': {
        backgroundColor: '#254885',  color: "#FFFFFF",
    },

    [theme.fn.smallerThan('xs')]: {
      height: '57px',
      display: 'flex',
      // textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
    position: "absolute", 
    left: "2.02%", 
    top: "12.36%", 
    color: "#FFFFFF"
  },

  text: {
    fontWeight: 600,
    paddingTop: rem(12),
    width: '80%',
    fontSize: rem(20),
    fontStyle: 'normal',
    letterSpacing: rem(-1),
    color: '#254885',
    // marginBottom: theme.spacing.xs,
    textAlign: 'left',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    // lineHeight: rem(16),

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(20),
      textAlign: 'left',
      width: '80%'
    },
  },

  outer: {
    // paddingTop: rem(24),
    // pddingBottom: rem(24),
    
    paddingLeft: '10%',
    paddingRight: '10%',
  
  },
}));