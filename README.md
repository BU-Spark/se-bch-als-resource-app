## Getting Started

## ALS Resource App

### Project Description
People with ALS around the world are not offered a variety of clinical options. There are dozens of opportunities for what could be the most beneficial option to them, but are usually only offered a few.  The goal is to take clinical decision making and turn it into a tool that allows ALS patients to look at options and discuss them with their clinician (I have questions about a, b, and c). This tool/guide will allow people with ALS and clinicians/clinics to collaborate in the process of identifying best options throughout the disease process. Tools, resources, and methodologies are continually evolving to help people with ALS to cope with their condition. Because of the rapid nature of development(s), communicating updated resources to both clinicians and patients is difficult. 

The two primary users of this application (mobile or web app) would be patients with ALS or clinicians who work with ALS patients on occasion (such as primary care physicians etc).  The goal would be to provide them with a guided system that is constantly updated with the latest information. Each answer to a question or series of questions would lead the user down a different branch of questions and finally suggestions for the patient's current condition. The end goal would be creating a platform that helps distribute the information to patients and clinicians who might not have access to clinics with ALS experts. 

### Run Project
Frontend: <br>
nagivate to \code <br>
```bash
npm install
npm run dev
```

Strapi: <br>
nagivate to \backend_strapi to run strapi locally <br>
create a .env  for keys file. Contact me or spark for the file's details. <br>
```bash
npm install
npm run develop
```
<br> uncomment this line to use the local version of strapi on your computer https://github.com/BU-Spark/se-bch-als-resource-app/blob/8bbdc2c0b6e2e775b7928429743426246e97d274/code/src/constants/globals.tsx#L2
<br> ask me on merna.alghannam@gmail.com for access as an admin to strapi

## Getting Started

```bash
npm install
npm run dev
```
### Architecture
A presentation explaning the project

https://docs.google.com/presentation/d/11JwhtYG3_TAnesC0EPIhte9aymyAj1dD0EDDxbxzQCE/edit?usp=sharing

<img width="875" alt="Screenshot 2023-05-02 at 5 49 11 PM" src="https://user-images.githubusercontent.com/86805856/235793618-32ef3573-40b2-4ad6-acb2-ac6d1a01c521.png">

### Files
To modify components you can go to /src/components. Details for the components, constants,
images and styles are in the ComponentDocs.md file.

<img width="196" alt="Screenshot 2023-05-02 at 5 41 20 PM" src="https://user-images.githubusercontent.com/86805856/235792999-e6a4e35a-8127-45d3-b8c7-c9b593922b25.png">

### API and Pages
To understand the API and pages, naviagte to the the Pages&APIDocs.md file in src.
<img width="489" alt="Screenshot 2023-05-02 at 5 41 05 PM" src="https://user-images.githubusercontent.com/86805856/235792972-93dc9152-dc3a-4bfa-89c6-942290798f1d.png">

### Extendability

1) Database: The code for storing the data in a database (for this code it is mongodb) has been provided. Since it was not required to do so for our project, we did not do so but for future teams, they can modify this code data storage.

2) Deployment on cloud: The application can easily be deployed on a cloud provider. The tests help users see if the code breaks or not. Furthemore, they can view our CI/CI workflows for cloudflare/vercel to deploy this app.

3) Code modification: We have written modular code written, dividing code into components and classes. Furthermore, detailed explanations for each class can be provided below and on the application.

Detailed Explanations:

### Components
Docs Written by @ArkashJ, contact for assistance
DOCUMENTATION:

File Structure:
    --> code
        -> components
            -> Footer
                -> Footer.tsx
                -> Titles.tsx
            -> MainBody
                -> HelperFunctions
                    -> BodyContentStyle.tsx
                    -> Selection.tsx
                -> SolutionPageContent
                    -> PageContentHelpers
                        -> Paragraph.tsx
                        -> Video.tsx
                    -> PageContent.tsx
                    -> Resources.tsx
                    -> TestimonialOrHandouts.tsx
                    -> VideoImageParagraphsContent.tsx
                -> ToggleButton.tsx
                -> Navbar
                    -> Nav.tsx      
            -> Docs.md


### Footer 
    * Titles.tsx
        * useStyles
            - custom styles for titles (position, size, color)
            - chevron icon (transition, position, color)
            - wrapper (background image, size, position, height, padding)
            - inner (position, width, height, zIndex)
            - title (font weight, size, style, letterSpacing, paddingRight, color, marginBottom, textAlign, fontFamily, lineHeight)
            - media queries for smaller than 'xs' screen sizes
        * Title component
            - displays the title passed as a prop
            - applies custom styles from useStyles
        * ChevronIcon
            - displays only if hasPrev is true
            - onClick triggers prevQuestion function
        * Return a <div> that contains the ChevronIcon and the Title component
    * Footer.tsx
        * useStyles
            - custom styles for footer (flex, center, padded)
            - logo
            - grouping links using flexbox and flexwrap
            - links are colored #FFFFFF, inter font, style normal
            - on hover underline
        * Loop through groups, make a <Text> component for mantine.Link
        * return <div> with all the links

### MainBody
    * HelperFunctions
        * BodyContentStyle.tsx
            * inner
                - height, display, width, color, border, borderRadius, justifyContent, alignItems, alignContent, cursor
                - hover effect: backgroundColor, color
                - media query for smaller than 'xs' screen sizes (height, display, width, justifyContent, alignItems, alignContent)
            * chevron
                - transition, position, left, top, color
            * text
                - fontWeight, paddingTop, width, fontSize, fontStyle, letterSpacing, color, textAlign, fontFamily
                - media query for smaller than 'xs' screen sizes (fontSize, textAlign, width)
            * outer
                - paddingLeft, paddingRight
        * Selection.tsx
            - return selection div
    
    * SolutionPageContent
        * PageContentHelpers
            * Paragraph.tsx
                * useStyles
                    - bodyText: fontFamily, fontStyle, fontWeight, fontSize, lineHeight, color, textAlign
                * Paragraph component
                    - accepts a paragraph prop (string) for the content
                    - renders a Text component with the content and applies bodyText style from useStyles
                    - wrapped in a Stack component with a backgroundColor based on the colorScheme
            * Video.tsx
                * useStyles
                    - inner: height, display, width, color, border, borderRadius, justifyContent, alignItems, alignContent, cursor
                    - text: fontWeight, paddingTop, width, fontSize, fontStyle, letterSpacing, color, textAlign, fontFamily
                    - media query for smaller than 'xs' screen sizes (fontSize, textAlign, width)
                    - video: align
                    - outer: paddingTop, paddingBottom
                * Video component
                    - accepts a url prop (string) for the video source
                    - renders an AspectRatio component with the video element
                    - video element uses the provided url as the source
                    - wrapped in a Stack component with a backgroundColor based on the colorScheme
            * PageContent.tsx
                * PageContent component
                    - Accepts a data prop of type PageContentType[]
                    - Iterates through the data array and conditionally renders - Video or Paragraph components based on the presence of   videoURL and paragraph properties
                    - Wrapped in a Stack component with spacing set to "xl"
            * Resources
                * Resources.tsx
                    * useStyles
                        - inner: height, display, width, color, border, borderRadius, justifyContent, alignItems, alignContent, cursor
                        - text: fontWeight, paddingTop, width, fontSize, fontStyle, letterSpacing, color, textAlign, fontFamily
                        - media query for smaller than 'xs' screen sizes (fontSize, textAlign, width)
                        - outer: paddingTop, paddingBottom, paddingLeft
                    * Resources component
                       - Accepts a data prop of type ResourceLink[]
                       - Iterates through the data array and renders a Button component for each resource
                       - Button component has a leftIcon and is styled with the inner class from useStyles
                       - Wrapped in a Stack component with spacing set to "xl"
                * TestimonialsOrHandouts
                    * TestimonialsOrHandouts.tsx
                        * useStyles
                        - inner: height, display, width, color, border, borderRadius, justifyContent, alignItems, alignContent, cursor
                        - text: fontWeight, paddingTop, width, fontSize, fontStyle, letterSpacing, color, textAlign, fontFamily
                        - media query for smaller than 'xs' screen sizes (fontSize, textAlign, width)
                        - outer: paddingTop, paddingBottom, paddingLeft
                        - TestimonialsOrHandouts component
                        * Accepts a data prop of type HandoutOrTestimonialLink[]
                        - Iterates through the data array and renders a Button component for each handout or testimonial
                        - Button component has a leftIcon and is styled with the inner class from useStyles
                        - Wrapped in a Stack component with spacing set to "xl"
                * VideoImageParaphsContent
                    * VideoImageParaphsContent.tsx
                        * useStyles
                            - inner: height, display, width, color, border, borderRadius, justifyContent, alignItems, alignContent, cursor
                            - text: fontWeight, paddingTop, width, fontSize, fontStyle, letterSpacing, color, textAlign, fontFamily
                            - media query for smaller than 'xs' screen sizes (fontSize, textAlign, width)
                            - outer: paddingTop, paddingBottom
                        * VideoImageParaphsContent component
                           - Accepts a data prop of type PageContentType[]
                           - Iterates through the data array and conditionally renders Video or Paragraph components based on the presence of videoURL and paragraph properties
                           - Wrapped in a Stack component with spacing set to "xl"

        * ToggleButton.tsx
            * ToggleButtonProps
                * updateContent: 
                    -  A function to update the content based on the selected choice
                    - choice: An object of type IChoice representing a choice
                    - className: A string representing the CSS class name to apply to the Button component
                * ToggleButton component (React.FC<ToggleButtonProps>)
                   - Renders a Button component with key set to choice.id, className set to the provided className, and variant set to "outline"
                   - Contains an onClick event handler that triggers the updateContent function with the choice as an argument
                   - Inside the Button, a Text component is rendered with fz set to "xl", fontSize set to rem(16), whiteSpace set to "normal", and textAlign set to 'center'. The text displayed is choice.title.
        * Navbar
            * Nav.tsx
                * HEADER_HEIGHT
                     A constant for the height of the header component, set to rem(73.94)
                * useStyles
                    - inner: height, display, justifyContent, alignItems, backgroundColor
                    - Nav component
                        Renders a Header component with a height of HEADER_HEIGHT, borderBottom set to 0, borderTop set to 4, and withBorder enabled Wrapped in a Container component with the inner class from useStyles and fluid property
                    - Contains a Group component with an Image component    inside, which has properties like maw, mah, ml, mx, radius, src, and alt
                    - Also contains a Burger component with properties like size and color, and opened set to false
                    
### Pages and Api
Docs Written by @ArkashJ, contact for assistance
DOCUMENTATION:

---> public
    -> Boston_Children's Hospital_logo.png
    -> CommImg.png
    -> communications.png
    -> doctor.png
    -> footerImg.png
    -> friend.png
    -> home.png
    -> titleImgHome.png

---> src
    -> constants
    -> pages
        -> api
            -> GetSolutionPageForChoices.tsx
            -> hello.ts
            -> TempNextQuestionChoices.tsx
        -> _app.tsx
        -> _document.tsx
        -> AccountPage.tsx
        -> CommunicationPage.tsx
        -> FinalPage.tsx
        -> index.tsx
        -> QuestionareBodyContentPages.tsx
        -> QuestionarePage.tsx
        -> SolutionPages.tsx
    -> styles
        -> global.css
        -> Home.module.css
        -> image12.png
    -> types
        -> api_types.tsx
        -> dataTypes.tsx
    -> Docs.md


### Pages
    * api
        * GetSolutionPageForChoices.tsx
            * getSolutionContent.ts
                * fetchAnyData(APIURL: string): Promise\<any>
                    * Fetches data from the provided API URL using the "GET" method and returns the JSON response

                * getResourceContent(solution_json: any): ResourceLink[]
                    * Processes the solution JSON to extract an array of `ResourceLink` objects containing the id, title, and URL of each resource

                * getTestimonialOrHandoutContent(api_url: string, solution_json: any): HandoutOrTestimonialLink[]
                    * Processes the solution JSON to extract an array of `HandoutOrTestimonialLink` objects containing the id, title, and URL of each testimonial or handout

                * getPageContent(api_url: string, solution_json: any): PageContentType[]
                    * Processes the solution JSON to extract an array of `PageContentType` objects containing the paragraphs, image URLs, and video URLs of each page content item

                * getSolutionContent(solutionId: string): Promise\<[any[], any[], any[]]>
                    * Given a solutionId, fetches the solution data and returns a tuple containing the lists of ResourceLink, HandoutOrTestimonialLink, and PageContentType objects
        * hello.ts
            * handler(req: NextApiRequest, res: NextApiResponse<Data>): void
                * A Next.js API route handler function that takes a `NextApiRequest` object and a `NextApiResponse<Data>` object
                * Responds with a status code of 200 and a JSON object containing the name 'John Doe'
        * TempNextQuestionChoices.tsx
            * tempNextChoiceSelectionFromJson(clickedChoice: IChoice): Promise<[IQuestion, IChoice[], boolean, ISolution]>
                * Given a `clickedChoice` object of type `IChoice`, this function returns a Promise with an array containing:
                    * An `IQuestion` object representing the next question
                    * An array of `IChoice` objects representing the next set of choices
                    * A boolean indicating if the current choice has a solution
                    * An `ISolution` object representing the solution associated with the current choice
        
                * This function fetches data from the API based on the input `clickedChoice` object and processes the data to return the required information about the next question, its choices, and any solution associated with the input choice. 
                
                * If the input choice does not have a next question or solution, the function returns an empty question, an empty array of choices, and a boolean value set to false.

    * pages/_app.tsx
        * App(props: AppProps)
            * This is the main wrapper component for the Next.js application. It includes the Head component for metadata, MantineProvider for global styles and theme overrides, Nav component for navigation, and FooterLinks component for the footer.
    * pages/_document.tsx
        * _Document extends Document
            * This custom Document component is used to augment the default Next.js HTML structure. It includes the Head, Main, and NextScript components.
    * pages/account.tsx
        * AccountPage()
            * This is the AccountPage component that renders the "Save Page" text.
    * pages/communication.tsx
        * CommunicationPage()
            * This is the CommunicationPage component that includes the Nav, Title, and FooterLinks components. The Title component renders the title "Communication" along with a related image.
    * pages/final.tsx
        * FinalPage()
            * This is the FinalPage component that includes the Nav, Resources, and FooterLinks components. The Resources component renders a list of resource links based on the `dummyResourceLinks` data.
    * pages/index.tsx
        * Home()
            * This is the Home component that renders the QuestionairePage.
    * pages/QuestionaireBodyContentPages.tsx
        * QuestionaireBodyContent()
            * This component handles the questionnaire logic, rendering a series of questions and choices. It also handles navigation between questions and displaying the solution page when a solution is reached.
    * pages/SolutionPages.tsx
        * SolutionPages({solution, hasSolution}: SolutionContentProps)
            * This component renders the content of a solution page, which includes the solution title, page content, resources, and handouts or testimonials. It fetches and displays content based on the solution ID.
    * pages/QuestionairePage.tsx
        * QuestionairePage()
            * This is the QuestionairePage component that wraps and renders the QuestionaireBodyContent component.

### Tests
Docs Written by @ArkashJ, contact for assistance
DOCUMENTATION

---> Nextjs-Tests
    -> index.tests.tsx
    -> QuestionnareBodyContent.tests.tsx
    -> Questionnare.tests.tsx
    -> SolutionPages.tests.tsx

All these tests check whether the components have been rendered or not

cd to the Nextjs-Tests file, install the jest dependency and run tests. Detailed explantion in the TestDocs.md file

<img width="285" alt="Screenshot 2023-05-02 at 5 41 41 PM" src="https://user-images.githubusercontent.com/86805856/235793030-dfd1807f-3157-4a73-a605-c2cae6f6e88e.png">


Move the tests to "__ test __" folder in pages folder. Then run 'npm run test'. Make sure you have jest installed. For more instructions, navigate to docs in tests folder.

Commands to Run:
$ npm run test

### Files
To modify components you can go to /src/components. Details for the components, constants,
images and styles are in the ComponentDocs.md file.

<img width="196" alt="Screenshot 2023-05-02 at 5 41 20 PM" src="https://user-images.githubusercontent.com/86805856/235792999-e6a4e35a-8127-45d3-b8c7-c9b593922b25.png">

### API and Pages
To understand the API and pages, naviagte to the the Pages&APIDocs.md file in src.
<img width="489" alt="Screenshot 2023-05-02 at 5 41 05 PM" src="https://user-images.githubusercontent.com/86805856/235792972-93dc9152-dc3a-4bfa-89c6-942290798f1d.png">

### Bugs and errors

- UseEffect gets called twice during dev. Therefore, the back button may appear sooner, cause the page title not to render correctly. Useeffect is not a good option. Thus, we solved this in dev branch by using dynamic routes. It reroute to previous page when user clicks back button. <br><br> 

- In dev branch, we used dynamic routes because it makes our code cleaner and easier to follow. In addition, it creates a page for each question. However, it currently can only be deployed as a dynamic website. To make it a static site, next team would need to usegetstatic paths to generate all pages during build. (Note: our teammate believes we should keep it dynamic as generating all pages at once wastes resources)

- Our page rendering performance can be improved by using possibly dynamic routes (working starter code in dev branch). In addition, the back button is difficult to press. Thus, usecallback can also be useful there. 

- When the page load is slow, it does not show a loading icon

- The Bookmark site file is still under constructed. It has the most basic function for this feature, mainly because this feature is not developed yet by the client. Some of the bookmarking do not work because there exits bookmarks with duplicate indentifier ID's, that is something to looking into in the future.

More details can be found in issues section.

### Summary of we did
Branch: main: <br>
-used strapi to update questions, choices, and resource page content <br>
-resource page includes vidoes, paragraphs, pdf and website links all fetched from strapi <br>
-created a dynamic questionaire <br>
-created a new 
Branch: dev:<br>
-created dynamic routes for each question. Used routeback to navigate to previous page after clickling back button <br>
-starter code for saving content into mongodb after clickling on save button <br>
-new Local Website for Bookmarks: Developed a new local website feature that displays all user bookmarks. This addition enhances user experience by allowing users to easily access and view their saved bookmarks.
-strapi Update and Import/Export Feature: Upgraded to the latest version of Strapi, leveraging its new capabilities to facilitate the import and export of files. This update streamlines content management, making it more efficient and user-friendly.

### Deployment

We deployed the frontend in vercel. The link the test can be found in the side of the repo
https://se-bch-als-resource-app.vercel.app/

In addition, we deployed strapi on railway
Link: https://se-bch-als-resource-app-production.up.railway.app

You can contact me t merna.alghannam@gmail.com for access to strapi. 

In addition, we have provided a folder called strapi, which contains all content of strapi for reference.
