import React from 'react'
import { Stack} from '@mantine/core';
import { PageContentType } from '@/types/dataTypes';
import Video from './PageContentHelpers/Video';
import Paragraph from './PageContentHelpers/Paragraph';


const PageContent = ({data}: {data: PageContentType[]}) => {


  return (
    <div>
      <Stack
      spacing="xl"
    >
      {data.map((pageContent) => ( 
        <>
        {pageContent.videoURL != "" ? <Video key={pageContent.videoURL} url={pageContent.videoURL}/> : <></> }
        {pageContent.paragraph != "" ? <Paragraph key={pageContent.paragraph} paragraph={pageContent.paragraph}/> : <></> }
        </>
      ))}
    </Stack>
    </div> 
  )
}

export default PageContent