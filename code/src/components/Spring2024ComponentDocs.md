Docs Written by @jacob-stein1, contact for assistance
DOCUMENTATION:

Below is the file structure of the components. Most components rely on global styles, which are available in the utils folder. Most components also require additional static styling, which is including in the .css files in the same sub-directory. Some components, like Title requires dynamic styling, which is instead created using mantine in a .tsx file.

File Structure:
- code/
  - components/
    - BookmarkButton/
      - BookmarkButton.tsx
      - BookmarkButton.module.css
    - CopyURL/
      - CopyUrl.tsx
      - CopyUrl.module.css
    - Footer/
      - Footer.tsx
      - FooterStyle.tsx
    - Navbar/
      - Nav.tsx 
      - Nav.module.css
    - NavList/
      - NavList.tsx
      - NavList.module.css
    - ResourcesHandouts/
      - ResourcesHandouts.tsx
      - ResourcesHandoutsStyle.tsx
    - SolutionPage/
      - SolutionPage.tsx
      - SolutionPage.module.css
    - Title/
      - Titles.tsx
      - TitleStyle.tsx
    - Fall2023ComponentDocs.md
    - Spring2024ComponentDocs.md

### Header

     * Nav.tsx
        * Styles
            - custom styles for the header
            - wrapper for the logo
            - styles for props inside the title
        * Links
            - list of links appearing in the drop-down menu
            - maps each link to a title with a link
            - currently statically included in file
        * Burger
            - uses mantine Burger component
            - Click to display drop-down menu
            - Drop-down items inherent toggle function to closer Burger
        * Returns a <div> with the logo and Burger
     * NavList.tsx
        * Styles
            - styles for list container
            - styles for each list items
            - individual styling for last link item
        * Links
            - object with title, link, and onClick function
            - currently only maps to home and bookmarks
            - passed in as params
            - currently statically encoded in Nav.tsx
        * onClick function
            - receives an onClick function from Nav.tsx
            - all current links use the toggleMenu function from Nav.tsx
            - allows for more dynamic behavior in future iterations
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

### Body

     * CopyURL
        * Styles
            - coloring for the button
            - styling for text input
        * URL encoding
            - the link encodes saved bookmarks by id
            - on load, a useEffect will parse and add the bookmarks to a global context
            - enables link sharing across devices
            - displayed link uses base URL, make sure you change it when deploying
        * Overrides local storage
            - a useEffect also reads saved bookmarks from local storage
            - locally stored bookmarks will automatically be encoded in the displayed URL
            - if there are local bookmarks when an encoded url is used, they will be wiped
            - may be worth discussing with client if URL encoding should take precedent
        * Copy button
            - clicking the button automatically loads URL to clipboard
            - changes color to indicate when clicked
            - also highlights the url in the form
        * Return a <div> that contains the copyable link and copy button
     * ResourcesHandouts
        * handleBookmarkClick
            - sends user back to the communication branch
            - currently is statically encoded, next teams will need to send back to respective source branch
            - sets the value of a global context to a clicked solution, see context documentation for more info
        * useStyles
            - follows global styling conventions for inner and outer, see utils for more details
            - styling for container for link portion
            - styling to wrap the BookmarkButton
            - assumes BookmarkButton isSolutionPage is false when rendered on /bookmark
            - assumes BookmarkButton isSolutionPage is true when rendered on /communication
            - only gets rendered to display solutions or bookmarks
        * Solution button
            - routes the user back to /communication with the solution state loaded
            - dependent on the focused bookmark context, see context documentation for more info
            - used to hold a link to the external solution itself, see old component documentation
        * BookmarkButton with conditional rendering
            - always renders the save/unsave button, conditionally renders the 'Go to bookmarks' button
            - renders 'Go to bookmarks' button on SolutionPage components, not on bookmark page
            - clicking save adds the resource id to the global context holding bookmarks
            - click unsave removes the the resource id from the global context
        * Return a <div> containing a list of resources with a corresponding link
     * BookmarkButton
        * useStyles
            - uses the inner style for both buttons
            - all other styles come from CSS file
        * Styles  
            - styles for text contained within buttons
            - container for bookmark navigation button
            - container for save/unsave button
        * handleBookmarkClick
            - creates a new bookmark with id, title, and url
            - adds newly created bookmark to global bookmark context
            - if bookmark is already in context, removes it instead
            - see context docs for more information
        * Conditional button rendering
            - button is used on SolutionPage and bookmark page
            - only render navigate to bookmark page on the SolutionPage instances
            - button containers subject to page styles
            - may be better to split into two components in the future, SaveButton and BookmarkNavButton
        * Returns a <div> containing a save button and conditionally a bookmark nav button
     * SolutionPage
        * Video display
            - renders a video if it exists
            - solution content is passed in as a prop
            - solution content is originally retrieved from Typeform
            - uses global styling, see utils for more info
        * Resource map
            - Maps out a list of resource links
            - Links map to external video or article
            - Uses global styles and additional custom styles
            - May be replaceable with a ResourcesHandout
        * BookmarkButton
            - Renders a save/unsave button using global styling
            - Renders the 'Go to bookmarks' button, also fitted with global styling
            - Bookmarks can also be removed from the SolutionPage
            - See context docs for how bookmarks are added and removed from global context
        * Returns a <div> containing the corresponding solution and a BookmarkButton

### Footer

     * Footer.tsx
        * useStyles
            - custom styles for footer (flex, center, padded)
            - logo
            - grouping links using flexbox and flexwrap
            - links are colored #FFFFFF, inter font, style normal
            - on hover underline
        * Loop through groups, make a <Text> component for mantine.Link
        * Dynaically expands and shrinks to fit the size of the page no matter how many resources or bookmarks
        * return <div> with all the links