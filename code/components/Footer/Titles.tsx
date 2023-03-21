// import React from 'react'
// // import Body from 'next/body';
// import { BackgroundImage, Image, Center, Text, Box } from '@mantine/core';

// const Titles = ({titleImg, title}:{titleImg: string, title: string}) => {
//   return (
//         <Box maw={300} mx="auto">
//       <BackgroundImage
//         src={titleImg}
//         radius="xs"
//       ></BackgroundImage>
//       {/* <Image radius="xs" src={titleImg} alt="Random image" /> */}
//       <Center p="md">
//           <Text color="#fff">
//           {title}
//           </Text>
//         </Center>
//       </Box>
//   )
// }

//links: https://ui.mantine.dev/category/hero
//

// export default Titles

import { Title, createStyles, rem } from '@mantine/core';
import React from 'react'

let img = ""
const Titles = ({titleImg, title}:{titleImg: string, title: string}) => {
  img = titleImg
  const { classes} = useStyles();
  return (
    <div className={classes.wrapper}>
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
  wrapper: {
    position: 'relative',
    paddingTop: rem(180),
    paddingBottom: rem(130),
    backgroundImage: 'linear-gradient(0deg, rgba(0, 48, 135, 0.5), rgba(0, 48, 135, 0.5)), url('+img+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: rem(242),

    [theme.fn.smallerThan('xs')]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
    },
  },
  inner: {
    position: 'absolute',
    width: rem(132),
    height: rem(51),
    left: rem(24),
    bottom: rem(24),
    // top: rem(130),
    zIndex: 1,
  },

  title: {
    fontWeight: 600,
    fontSize: rem(42),
    fontStyle: 'normal',
    letterSpacing: rem(-1),
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'left',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    lineHeight: rem(51),

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(42),
      textAlign: 'left',
    },
  },

}));
