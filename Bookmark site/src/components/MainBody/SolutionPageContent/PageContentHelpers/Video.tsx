import React from 'react'
import { Stack, createStyles, rem, AspectRatio } from '@mantine/core';

/**
 * Video component for the solution page
 * @param url - the url of the video to be displayed
 */

const useStyles = createStyles((theme) => ({
  inner: {
    height: '57px',
    display: 'flex',
    width: '87%',
    color: '#254885',
    border: '2px solid #254885',
    borderRadius: rem(10),
    justifyContent: 'start',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'pointer',
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
    // media query for smaller than 'xs' screen sizes (fontSize, textAlign, width)
    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(20),
      textAlign: 'left',
      width: '80%'
    },
  },
  video: {
    align:'center',
    // size:10,
  },

  outer: {
    paddingTop: rem(24),
    pddingBottom: rem(24),
    // paddingLeft: '11%',
    // paddingRight: '11%',
  },
}))

const paragraph = "This part is reserved for the brief description of the solution above. Placeholder texts are used for now.  Lorem ipsum dolor sit amet consectetur. Urna placerat a amet.Lorem ipsum dolor sit amet consectetur. Urna placerat a amet.Lorem ipsum dolor sit amet consectetur. Urna placerat a amet."

// Video component accepts a url prop (string) for the video source
const Video = ({url}:{url: string}) => {
  const { classes } = useStyles()
  // renders an AspectRatio component with the video element inside, wrapped in a Stack component with a backgroundColor
  // based on the colorScheme
  return (
    <div>
      <Stack
      spacing="xl"
      // className={classes.outer}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      })}>
      {/* <Text className={classes.text}> {"Letter Cueing"} </Text> */}
        <AspectRatio ratio={5/3} maw={2000} mah={600} className={classes.video}>
        <video controls >
              <source src={url} type="video/mp4"/>
        </video>
        </AspectRatio>
    </Stack>
    </div> 
  )
}

export default Video