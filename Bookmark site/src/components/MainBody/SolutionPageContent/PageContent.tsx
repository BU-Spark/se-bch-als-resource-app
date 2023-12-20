import React from 'react'
import { Stack} from '@mantine/core';
import { PageContentType } from '@/types/dataTypes';
import Video from './PageContentHelpers/Video';
import Paragraph from './PageContentHelpers/Paragraph';

/**
 * PageContent component for the solution page
 * @param data - the data to be displayed 
 */

const PageContent = ({data}: {data: PageContentType[]}) => {
  // Accepts a data prop of type PageContentType[]
  // Iterates through the data array and conditionally renders - Video or Paragraph components based on the presence of videoURL and paragraph properties
  // Wrapped in a Stack component with spacing set to "xl"

  return (
    <div>
      <Stack
      spacing="xl"
    >
      {data.map((pageContent) => ( 
         <React.Fragment key={pageContent.id}>
        {pageContent.videoURL != "" ? <Video url={pageContent.videoURL}/> : <></> }
        {pageContent.paragraph != "" ? <Paragraph paragraph={pageContent.paragraph}/> : <></> }
        </React.Fragment>
      ))}
    </Stack>
    </div> 
  )
}

export default PageContent