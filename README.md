## Getting Started

## ALS Resource App

### Project Description

People with ALS around the world are not offered a variety of clinical options. There are dozens of opportunities for what could be the most beneficial option to them, but are usually only offered a few. The goal is to take clinical decision making and turn it into a tool that allows ALS patients to look at options and discuss them with their clinician (I have questions about a, b, and c). This tool/guide will allow people with ALS and clinicians/clinics to collaborate in the process of identifying best options throughout the disease process. Tools, resources, and methodologies are continually evolving to help people with ALS to cope with their condition. Because of the rapid nature of development(s), communicating updated resources to both clinicians and patients is difficult.

The two primary users of this application (mobile or web app) would be patients with ALS or clinicians who work with ALS patients on occasion (such as primary care physicians etc). The goal would be to provide them with a guided system that is constantly updated with the latest information. Each answer to a question or series of questions would lead the user down a different branch of questions and finally suggestions for the patient's current condition. The end goal would be creating a platform that helps distribute the information to patients and clinicians who might not have access to clinics with ALS experts.

### User Stories

As a patient, I want to have the most up-to-date solutions for questions I may have so that I can be sure I am receiving relevant and researched treatments.

As a clinician, I want to have the most up-to-date solutions for questions so that I am giving the proper treatment for my clients' problems.

As a patient, I want to be able to save the resources and articles I’m recommended in the application so that I can access them at a future date.

As an admin, I want to be able to edit the ordering of questions along with the content in an intuitive and easy manner so that I can manage the application

### Run Project

Frontend: <br>
nagivate to \code <br>

```bash
npm install
npm run dev
```

Backend: <br>

Backend is hosted on Typeform.

## Getting Started

### Architecture

Here is the Spring 2024 Midterm [slides](https://docs.google.com/presentation/d/14D7LLQVyJqyRsZOZrKRtz57jpahWUS9vqxkEOyitveg/edit?usp=sharing) that go over the project.

Below is a screenshot of the OLD architecture using Strapi. Please see the README is old-backend-strapi for more details.

<img width="875" alt="Screenshot 2023-05-02 at 5 49 11 PM" src="https://user-images.githubusercontent.com/86805856/235793618-32ef3573-40b2-4ad6-acb2-ac6d1a01c521.png">

Below is a screenshot of the NEW architecture using Typeform.

![New Architecture](./code/public/new-typeform-architecture.png)

### Files

To modify components you can go to /src/components. Details for the components, constants,
images and styles are in the ComponentDocs.md files.

### Pages and Utils

To understand the utils, Typeform API, and pages, naviagte to the the Pages&UtilsDocs.md file in src.

### Extendability

1. Database: The code for storing the data in a database (for this code it is mongodb) has been provided. Since it was not required to do so for our project, we did not do so but for future teams, they can modify this code data storage.

2. Deployment on cloud: The application can easily be deployed on a cloud provider. The tests help users see if the code breaks or not. During the semester, we hosted our test versions for the client on Vercel, which provides automatic CI/CD

3. Code modification: We have written modular code written, dividing code into components and classes. Furthermore, detailed explanations for each class can be provided below and on the application.

Below is a detailed explanation of components and pages, which can also be found in their respective READMEs.

### Components

Below is the file structure of the components. Most components rely on global styles, which are available in the utils folder. Most components also require additional static styling, which is including in the .css files in the same sub-directory. Some components, like Title require dynamic styling, which is instead created using mantine in a .tsx file.

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
    - CookieConsent.tsx
    - Fall2023ComponentDocs.md
    - Spring2024ComponentDocs.md
    - QuestionsUtils.ts

### Header

     * Nav.tsx
        * Styles
            - Custom styles for the navigation bar are managed using Nav.module.css
            - Includes styles for:
              - Collapsed and expanded states: Adjusts appearance dynamically based on isExpanded
              - Responsive design:
                  - Desktop: Sidebar layout on the left
                  - Mobile: Top navigation bar layout
            - Active links: Highlights the currently active link using router.pathname
        * Links
            - The navigation bar includes links to:
              - Home (/)
              - Bookmarks (/bookmarks)
            - Links use the Link component from Next.js
            - The current active page is determined using router.pathname and is styled accordingly
        * Settings
            - Accessibility settings are provided through a Popover dropdown that includes:
              - Font size adjustment:
                - Controlled using a Slider component
                - Dynamically updates the root font-size in real-time
              - Bold text toggle:
                - Controlled using a Switch component
                - Adds or removes the bold-text class to the body element
              - Invert colors toggle:
                - Controlled using a Switch component
                - Adds or removes the invert-colors class to the body element
              - Contrast adjustment:
                - Controlled using a Slider component
                - Dynamically applies a CSS filter: contrast() to the root element
              - Reset to Default Settings:
                - A single button to restore all settings to their default values
        * Burger
            - The Hamburger menu toggles the collapsed or expanded state of the sidebar
            - Includes a custom animated icon to enhance the user experience
        * State Management
            - The component uses React useState hooks to manage the following states:
              - isSettingsOpen: Controls the visibility of the settings dropdown.
              - fontSize: Tracks the current font size.
              - boldText: Tracks whether bold text is enabled.
              - invertColors: Tracks whether color inversion is enabled.
              - contrast: Tracks the contrast level.
        * Returns
            - A <nav> element containing:
              - Sidebar structure:
                - Hamburger menu.
                - Navigation links (Home, Bookmarks, Settings).
              - Accessibility settings dropdown:
                - Opens on clicking the Settings link.
                - Contains adjustable controls for font size, bold text, contrast, and inverted colors.
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
        - custom styles for:
          - wrapper (background image, dimensions, padding)
          - title (font size, weight, color, alignment)
          - chevron icon (size, transition, position)
          - subtitle (optional, with distinct font and color styling)
          - buttons (print/share button styling and alignment)
          - modal (layout for QR code and bookmarks display)
          - print-only content (specialized styles for print view)
      * Title Component
        - displays the title and optional subtitle, styled using useStyles
        - Chevron icon:
          - displays if hasPrev is true
          - onClick triggers onPrevClick
        - Print/Share button:
          - opens a modal for sharing the collection
          - modal contents:
            - QR code generated using QRCode
            - copyable share link using CopyableLink component
            - bookmark list with titles and descriptions
            - buttons for Print Preview and Close
      * Print Functionality
        - print-ready content includes:
          - QR code
          - collection title
          - bookmark list with titles and optional descriptions
        - window.print() called on "Print Your List" button click
      *Return
        - a <div> containing:
          - Chevron icon for navigation
          - Title and optional subtitle
          - Print/Share button and modal for sharing or printing the collection

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
            - sets the focused bookmark context for navigation
            - click event triggers page navigation to communication page
        * useStyles
            - follows global styling conventions for layout and components
            - styling for link containers and button layouts
            - manages resource list and button positioning
            - adapts to both collection and communication pages
        * Resource display
            - renders a list of resources with titles and icons
            - integrates with Mantine UI components
            - supports both viewing and management functions
        * Collection management
            - implements move functionality between collections
            - supports unsave operations with confirmation
            - handles default and custom collections
            - modal interface for collection operations
        * Return a <div> containing resource list with action buttons
    * BookmarkButton
        * useStyles
            - utilizes global styling and CSS modules
            - manages button and modal appearance
            - handles notification styling system
            - implements consistent UI patterns
        * Save functionality
            - handles saving to default and custom folders
            - provides modal interface for folder selection
            - implements folder creation within modal
            - displays success notifications after saves
        * Navigation management 
            - handles navigation to bookmarks page
            - provides confirmation dialogs for navigation
            - maintains modal state for user interactions
            - separates navigation and save functions
        * Notification system
            - shows save confirmation notifications
            - customizes notification appearance
            - implements auto-dismiss functionality
            - provides clear user feedback
        * Returns a <div> containing save button with modals
    * SolutionPage
        * Content display
            - renders solution title and description
            - displays attachments (video/image) in iframe
            - handles content spacing and layout
            - implements responsive design patterns
        * Solution content
            - processes IQuestion type solution data
            - displays content with consistent styling
            - handles multiple content types
            - uses global and module-specific styles
        * Resource section
            - renders resource list conditionally
            - provides external links with icons
            - implements custom button styling
            - maintains consistent text formatting
        * BookmarkButton integration
            - implements bookmark functionality
            - passes required props for solution context
            - maintains communication route information
            - integrates with global bookmark system
        * Returns a Stack component containing solution content and interactions

### Footer

    * Footer
        * useStyles
            - implements responsive footer styling
            - handles expanded and collapsed states
            - manages logo and link layouts
            - maintains consistent styling across states
        * Link handling
            - maps footer link data from constants
            - implements external link targeting
            - uses Next.js Link component
            - maintains consistent link styling
        * Layout management
            - adapts to navigation state changes
            - implements container-based structure
            - maintains responsive image sizing
            - provides consistent spacing
        * Returns a footer element with logo and dynamic links

### Pages and Utils

Below is the file structure of the pages and utils. Most pages rely on global styles, which are available in the utils folder. Most components also require additional static styling, which is including in the .css files in the /styles directory.

File Structure:

- public/
  - best_childrens_hospital_us_news.png
  - Boston_Children's_Hospital_logo.png
  - Communication.svg
  - communications.png
  - ComputerAccess.svg
  - copy-icon.svg
  - doctor.png
  - favicon.ico
  - favicon.png
  - footerImg.png
  - friends.png
  - home.png
  - HomeAccess.svg
  - new-typeform-architecture.png
  - PhoneAccess.svg
  - titleImgCommunication.png
  - titleImgHome.PNG

- src/
  - pages/
    - api/
      - retrieveQuestions.tsx
    - bookmarks/
      - [folderId].tsx
    - \_app.tsx
    - [type].tsx
    - bookmarks.tsx
    - computer-access.tsx
    - FontSizeSetting.tsx
    - index.tsx
    - OLDcommunication.tsx
    - OLDcomputeraccess.tsx
    - OLDsmart-phone-access.tsx
    - questionnaire-page.tsx
    - resource-link-gen.tsx
    - Settings.module.css
    - settings.tsx
  - styles/
    - Bookmark.module.css
    - choiceBoxes.module.css
    - Communication.module.css
    - globals.css
    - Home.module.css
    - ResourceLinkGen.module.css
  - utils/
    - BodyContentStyle.tsx
    - QuestionUtils.ts
    - apiUtils.tsx
  - Pages&UtilsDocs.md

### Pages

    * api/retrieveQuestions.tsx
        * Utility functions
            - getYouTubeEmbedUrl: Converts standard YouTube URLs to their embed form
            - extractBetweenResources: Extracts the content between specific tags within a text string
            - removeResourcesSection: Removes the section identified by specific tags from the text string
        * API route handler retrieveQuestions
            - Handles requests to the /api/retrieveQuestions endpoint.
            - It expects a query parameter flowName to determine which form questions to retrieve
            - Processes the communication flow name, returns "Invalid flowName" error until other branches are added
        * Fetching data
            - Performs an asynchronous fetch request to the Typeform API using form IDs defined in globals
            - Transforms the response into a structure defined by IQuestionList and IQuestion
            - Responds with newly constructed objects, see type definitions for more details
    * [folderId].tsx
        * Folder management
           - handles default and custom collection displays
           - manages folder content and bookmarks
           - implements folder renaming functionality
           - provides folder clearing capabilities
       * URL functionality
           - generates shareable URLs for collections
           - handles folder ID from URL parameters
           - manages dynamic routing for folders
           - implements back navigation
       * Modal interfaces
           - implements rename collection modal
           - provides clear collection confirmation
           - handles bookmark removal confirmation
           - maintains consistent modal styling
       * Returns a dynamic page displaying folder content with modals
    * _app.tsx
        * App Configuration
            - implements Mantine provider with global styles
            - manages viewport and favicon settings
            - handles notification system
            - maintains consistent styling across pages
        * Welcome Modal
            - displays initial welcome message
            - provides medical disclaimer
            - implements custom styling
            - manages modal state persistence
        * Navigation System
            - manages navigation expansion state
            - integrates Nav component with layout
            - handles responsive layout adjustments
            - synchronizes with Footer component
        * Global State Management
            - implements bookmark context providers
            - handles cookie consent management
            - maintains state across page navigation
            - provides notification functionality
    * bookmarks.tsx
        * Collection management
            - handles folder creation and deletion
            - implements folder renaming functionality
            - manages default and custom collections
            - provides settings interface for folders
        * Data synchronization
            - loads bookmarks from URL parameters
            - handles URL-based bookmark sharing
            - maintains loading states during data fetch
            - prevents redundant data loading
        * Modal interfaces
            - create folder modal with validation
            - settings modal for folder operations
            - rename confirmation interface
            - delete confirmation dialogue
        * Interactive components
            - displays folder list with bookmark counts
            - implements settings button for each folder
            - provides navigation between collections
            - maintains consistent styling across states
    * [type].tsx
        * Dynamic routing
            - handles multiple access types (communication, computer, phone)
            - manages route-specific content and titles
            - implements consistent navigation across types
            - maintains state during type changes
        * State management
            - manages question and choice states
            - implements local storage persistence
            - handles loading and error states
            - provides reset functionality for data updates
        * Question navigation
            - implements back navigation logic
            - manages question transitions
            - handles solution page rendering
            - preserves navigation history
        * Data synchronization
            - fetches type-specific questions from API
            - implements typeform consistency checking
            - manages data loading states
            - provides update notifications
        * Interactive components
            - displays question choices with tooltips
            - handles invalid choice notifications
            - renders solution pages when applicable
            - maintains consistent styling across states
    * index.tsx
        * QuestionaireBodyContent component
            - Contains logic to navigate to /communication or other base branches
            - Should be eventually used in place of /communication
            - Used to contain the functionality used by the old team
    * questionaire-page.tsx
        * State initialization
            - Initializes state with useState for currQuestion representing the current question being displayed
            - Sets currChoices state to hold an array of initial choices for the questionnaire
            - Uses the default category questions, containing the respective ids from the previous Strapi backend
            - Rather than updating the state, simply navigates to /[choice]
    * resource-link-gen.tsx
        * State management
            - Manages an array of inputFields in state to dynamically handle multiple input pairs for titles and URLs
            - Maintains a generatedJson string state that stores the resulting JSON for use in Typeform solutions
            - The link can be used in the Typeform backend to render a video on a SolutionPage
        * JSON generation
            - A handleGenerateJSON function creates a JSON string of the input, pre- and post-fixed with identifiers for use in Typeform
            - Filters out any input fields that are empty before generating the JSON
            - See documentation on using videos in Typeform for more information on using the JSON construct
        * CopyableLink component
            - Renders the CopyableLink component with the generated JSON for easy copying
            - Conditionally displays the CopyableLink component only when generatedJson has content
        * Temporary resolution
            - This is our temporary solution for allowing the client to add videos in Typeform
            - Putting in a title and URL correctly formats the object needed in Typeform to render a video
            - This is a temporary solution in lieu of a custom backend that can handle this more cleanly
            - Typeform is also limited to one video per page, which is another reason a custom backend is needed

### Utils
    * apiUtils.tsx
        * getYouTubeEmbedUrl
            - Returns the YouTube embed URL for a given YouTube video either in short form or long form.
        * extractBetweenResources
            - Returns the text value between [*resources*] tags that are passed in the description, typically pasted from /resource-link-gen
        * removeResourcesSection
            - Returns the text value without [*resources*] tags and the content inside the tags that are passed in the description, typically pasted from                     /resource-link-gen
    * BodyContentStyle.tsx
        * Component styling
            - defines button and container styles
            - implements responsive design patterns
            - maintains consistent color schemes
            - handles hover and interaction states
        * Text formatting
            - manages font sizes and weights
            - implements responsive text scaling
            - maintains text alignment rules
            - handles text overflow states
        * Layout management
            - defines flexible grid layouts
            - handles mobile responsiveness
            - implements padding and spacing
            - maintains container structures
        * Interactive elements
            - styles navigation elements
            - manages icon positioning
            - implements hover effects
            - handles button states
        * Home page elements
            - styles category buttons
            - manages icon containers
            - implements description layouts
            - maintains responsive grids
    * QuestionUtils.ts
        * Typeform consistency check
            - Defines isTypeformConsistent to compare two sets of typeform data, primarily by comparing the length and the individual questions for equality
            - Useful for detecting changes in questionnaire content over time or between different sessions
        * Question equality
            - Defines areQuestionsEqual to determine if two questions are identical by comparing various properties including IDs, titles, references, types,                   descriptions, choices, solutions, and attachments
            - Ensures perfect equality checks within question sets
        * Choices equality
            - Defines areChoicesEqual to check if two arrays of choices are equal by comparing their IDs, labels, and references
            - Ensures validation of choice arrays within question comparison operations
        * Solutions equality
            - Defines areSolutionsEqual to verify if two arrays of solutions are the same, comparing each solution's ID, title, and URL
            - Ensures consistency in solutions that may be attached to questionnaires
        * Attachments equality
            - Defines `areAttachmentsEqual` for comparing two attachments based on their type and href properties
            - Ensures attachments linked to questions are maintained across updates

### Tests

Docs Written by @jacob-stein1, contact for assistance
DOCUMENTATION

We have written test cases to check the rendering of components, the function of contexts, and more. Testing is written using the Jest JavaScript testing framework. See their [documentation](https://jestjs.io/docs/getting-started) for more info.

Tests are contained within a '**tests**' directory within each sub-directory of the project. For example /pages/**tests**/'page'.test.js contains the test cases for each page in the pages directory.

To run all tests:

$ npm run test

### Recommended Next Steps

- Currently only data for the communication branch is contained in Typeform. Moving the rest of the data from the Figma drawing, or from the client, would be a good step before setting up the next branches.
- QuestionnairePage is a placeholder for making dynamic routing for the four main routes. We recommend using Nextjs dynamic routing to make [id].tsx where id is the four main branches. You can see the dev branch, which is Fall 2023's branch, where they partially implemented dynamic routing.
- Typeform is a temporary solution. We were advised to make a full custom backend using ReactFlow, but we did not have enough time to make it this semester. Implementing a custom backend using Typeform-esque logic will overcome problems like only being able to render one video at a time

We have included each of these next steps and new features as an issue. Please seem them at this [link](https://github.com/BU-Spark/se-bch-als-resource-app/issues)

### Summary of 2024 Fall Semester Updates

- Restructured navigation system with improved desktop and mobile layouts
- Implemented comprehensive accessibility settings system
- Enhanced bookmark management with collections feature
- Added QR code and URL sharing capabilities
- Improved UI/UX across all pages
- Added image support for articles
- Optimized responsive design for all screen sizes

* Core Enhancements:
  * Navigation System
     - Redesigned navbar with left-side panel for desktop
     - Responsive top navigation for mobile
     - Improved hamburger menu functionality

  * Accessibility Features
     - Font size controls
     - Color scheme customization
     - Color mode
     - Font weight adjustment
     - Contrast controls

  * Collection Management
     - Folder creation and organization
     - Bookmark movement between collections
     - Print preview functionality
     - URL and QR code sharing

* Known Issues:
     - Bookmark link generation occasionally leads to 404
     - Footer/navbar position conflict in inverted color mode
     - High resolution images causing display issues
 
* Future Development Suggestions:
     - Fix bookmark link generation system
     - Resolve layout conflicts in inverted color mode
     - Implement image optimization for solution pages

### Deployment

We deployed the frontend in [vercel](https://se-bch-als-resource-app-zeta.vercel.app/)
Please note the deployed link does not work on the BU Network for some reason.

The data is hosted on Typeform on the buspark@bu.edu account. The api calls to typeform are handled in /api/retrieveQuestions

You can contact Jacob at jmstein@bu.edu for information if you need.
