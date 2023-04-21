import React, { useEffect, useState } from 'react'
import { bodyContentUseStyles } from '../../components/MainBody/HelperFunctions/BodyContentStyle';
import { Stack, Text} from '@mantine/core';
import ResourcesHandouts from '../../components/MainBody/SolutionPageContent/ResourcesHandouts';
import { ISolution } from '@/types/api_types';
import { HandoutOrTestimonialLink, PageContentType, ResourceLink } from '@/types/dataTypes';
import getSolutionPageContentForChoice from './api/GetSolutionPageForChoice';
import PageContent from '../../components/MainBody/SolutionPageContent/PageContent';


interface SolutionContentProps{
  solution: ISolution,
  hasSolution: boolean
}

const SolutionPages: React.FC<SolutionContentProps> = ({solution, hasSolution}) => {
  const { classes } = bodyContentUseStyles();
  let [resourceList, setResourceList] = useState<ResourceLink[]>([])
  let [handoutTestimonialList, setHandoutTestimonialList] = useState<HandoutOrTestimonialLink[]>([])
  let [pageContent, setPageContent] = useState<PageContentType[]>([])

  const getSolutionPageContent =async () => {
    let [resource_list, handouts_testimonials_list, page_content] = await getSolutionPageContentForChoice(solution.id)
    setResourceList(resource_list)
    setHandoutTestimonialList(handouts_testimonials_list)
    setPageContent(page_content)
  }
  
  useEffect(() => {
    if (hasSolution && solution.id != ""){
      getSolutionPageContent()
    }
  }, [hasSolution])

  return (
    <div>
          <Stack
          spacing="xl"
          className={classes.outer}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          })}
        >
          <Text className={classes.text}> {solution.title} </Text>
          {!pageContent.length ? <></> : <div> <PageContent data={pageContent}></PageContent></div>}
          {!resourceList.length ? <></>:<ResourcesHandouts title= {"Resources"} data={resourceList}></ResourcesHandouts> }
          {!handoutTestimonialList.length ? <></>:<ResourcesHandouts title={"Handouts/Testimonials"} data={handoutTestimonialList}></ResourcesHandouts> }
        </Stack>
    </div>
  )
}
export default SolutionPages