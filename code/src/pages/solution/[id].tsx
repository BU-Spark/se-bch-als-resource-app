import React, { useEffect, useState } from 'react'
import { bodyContentUseStyles } from '../../components/MainBody/HelperFunctions/BodyContentStyle';
import { Stack, Text} from '@mantine/core';
import ResourcesHandouts from '../../components/MainBody/SolutionPageContent/ResourcesHandouts';
import { HandoutOrTestimonialLink, PageContentType, ResourceLink } from '@/types/dataTypes';
import {getSolutionContent} from '../api/GetSolutionPageForChoice';
import PageContent from '../../components/MainBody/SolutionPageContent/PageContent';
import { useRouter } from 'next/router';
import Title from '../../components/Title/Titles'




const SolutionPages = () => {
  const { classes } = bodyContentUseStyles();
  const router = useRouter();

  let [category, setCategory] = useState<string>("Home")
  let [solutionTitle, setSolutionTitle] = useState<string>("")
  let [resourceList, setResourceList] = useState<ResourceLink[]>([])
  let [handoutTestimonialList, setHandoutTestimonialList] = useState<HandoutOrTestimonialLink[]>([])
  let [pageContent, setPageContent] = useState<PageContentType[]>([])

  const getSolutionPageContent = async (solutionId: string) => {
    let [title, resource_list, handouts_testimonials_list, page_content] = await getSolutionContent(solutionId)
    // TODO:
    // get the category based on the solutionId
    // setCategory()
    setCategory("Communication")
    setSolutionTitle(title)
    setResourceList(resource_list)
    setHandoutTestimonialList(handouts_testimonials_list)
    setPageContent(page_content)
  }
  

  useEffect(() => {
    const { id } = router.query
    if (id) {
      setResourceList([])
      setPageContent([])
      setHandoutTestimonialList([])
      getSolutionPageContent(id as string)
    }
}, [router.query])



  return (
    <div>
      <Title hasPrev={true} router={router} titleImg={`/titleImg${category}.png`} title={category} />
      <Stack
        spacing="xl"
        className={classes.outer}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        })}
      >
      <Text className={classes.text}> {solutionTitle} </Text>
      {!pageContent.length ? <></> : <div> <PageContent data={pageContent}></PageContent></div>}
      {!resourceList.length ? <></>:<ResourcesHandouts title= {"Resources"} data={resourceList}></ResourcesHandouts> }
      {!handoutTestimonialList.length ? <></>:<ResourcesHandouts title={"Handouts/Testimonials"} data={handoutTestimonialList}></ResourcesHandouts> }
      </Stack>
    </div>
  )
}
export default SolutionPages