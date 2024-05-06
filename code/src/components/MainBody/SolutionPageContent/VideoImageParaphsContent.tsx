import React from 'react'
import { Stack, createStyles, rem , Text} from '@mantine/core';
import { PageContentType } from '@/types/dataTypes';
import Video from './PageContentHelpers/Video';
import Paragraph from './PageContentHelpers/Paragraph';


const useStyles = createStyles((theme) => ({
  inner: {
    height: '57px',
    display: 'flex',
    width: '87%',
    // backgroundColor: 'transparent',
    color: '#254885',
    border: '2px solid #254885',
    borderRadius: rem(10),
    // width: rem(320),
    justifyContent: 'start',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'pointer',
    // '&:hover': {
    //     backgroundColor: '#254885',  color: "#FFFFFF",
    // },
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
    paddingTop: rem(24),
    pddingBottom: rem(24),
    // paddingLeft: '10%',
  },
}))


const VideoImageParaphsContent = ({data}: {data: PageContentType[]}) => {
  const { classes } = useStyles()

  return (
    <div>
      <Stack
      spacing="xl"
    >
      {data.map((pagetypecontent) => ( 
        <div>
          {pagetypecontent.videoURL !="" ? <Video url={pagetypecontent.videoURL}/> : <></>}
          {pagetypecontent.paragraph !="" ? <Paragraph paragraph={pagetypecontent.paragraph} /> : <></>}
        </div>
      ))}
    </Stack>
    </div> 
  )
}

export default VideoImageParaphsContent