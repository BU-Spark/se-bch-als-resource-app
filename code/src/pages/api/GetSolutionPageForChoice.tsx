import { HandoutOrTestimonialLink, PageContentType, ResourceLink } from "@/types/dataTypes";
import { API_URL } from '@/constants/globals';


const fetchAnyData = async (APIURL:string): Promise<any> => {
  const res = await fetch(APIURL, {
    method: "GET",
    });

  return await res.json();
}

function getResourceContent(solution_json : any) : ResourceLink[] {
  let temp_resource_list : ResourceLink[] = [];
  if(solution_json.data.attributes.Resources.length){
    for (let j= 0 ; j < solution_json.data.attributes.Resources.length; j++) {
      temp_resource_list.push({id: ""+j, title: solution_json.data.attributes.Resources[j].ResourceTitle, url: solution_json.data.attributes.Resources[j].ResourceLink})
    }
  }
  return temp_resource_list
}

function getTestimonialOrHandoutContent(api_url: string, solution_json : any) : HandoutOrTestimonialLink[]{
  let temp_handoutsOrTestimonialsList : HandoutOrTestimonialLink[] = []

  if(solution_json.data.attributes.TestimonialsOrHandouts){
    for (let j= 0 ; j < solution_json.data.attributes.TestimonialsOrHandouts.length; j++) {
      if (solution_json.data.attributes.TestimonialsOrHandouts[j].Link){
        temp_handoutsOrTestimonialsList.push({id: ""+j, title: solution_json.data.attributes.TestimonialsOrHandouts[j].Title, url: solution_json.data.attributes.TestimonialsOrHandouts[j].Link})
      } else {
        temp_handoutsOrTestimonialsList.push({id: ""+j, title: solution_json.data.attributes.TestimonialsOrHandouts[j].Title, url: api_url+solution_json.data.attributes.TestimonialsOrHandouts[j].PDF.data.attributes.url})
      }
    }
  }
  return temp_handoutsOrTestimonialsList
}

function getPageContent(api_url: string, solution_json : any) : PageContentType[]{
  let temp_pageContentList : PageContentType[] = []

  if(solution_json.data.attributes.Block){
    for (const element of solution_json.data.attributes.Block) {
      if (element.__component == "video.video"){
          temp_pageContentList.push({paragraph: "", imageURL: "", videoURL: api_url+element.VideoMedia.data.attributes.url})
      }else if (element.__component == "description-paragraphs.description-paragraphs"){
        temp_pageContentList.push({paragraph: element.DescriptionParagraph, imageURL: "", videoURL: ""})
      } else if (element.__component == "image.image"){
        temp_pageContentList.push({paragraph: "", imageURL: api_url+element.ImageMedia.data.attributes.formats.thumbnail.url, videoURL: ""})
      }     
    }
  }

  return temp_pageContentList
}

export async function getSolutionContent(solutionId : string): Promise<[string, any[], any[], any[]]> {
  let resourceList : ResourceLink[] = [];
  let handoutsOrTestimonialsList : HandoutOrTestimonialLink[] = [];
  let pageContentList : PageContentType[] = []

  const solution_json = await fetchAnyData(API_URL+"/api/solutions/"+solutionId+"?populate=deep,3")

  const title = solution_json.data.attributes.Title

  handoutsOrTestimonialsList = getTestimonialOrHandoutContent(API_URL, solution_json)

  resourceList = getResourceContent(solution_json)

  pageContentList = getPageContent(API_URL, solution_json)

  return [title, resourceList, handoutsOrTestimonialsList, pageContentList]
}