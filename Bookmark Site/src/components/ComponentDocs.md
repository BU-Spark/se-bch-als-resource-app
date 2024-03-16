Docs Written by @ArkashJ, contact for assistance
DOCUMENTATION:

File Structure:
    --> code
        -> components
            -> Bookmark
                -> BookmarkButton.tsx
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