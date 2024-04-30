Docs Written by @jacob-stein1, contact for assistance
DOCUMENTATION:

Below is the file structure of the pages and utils. Most pages rely on global styles, which are available in the utils folder. Most components also require additional static styling, which is including in the .css files in the /styles directory.

File Structure:

- public/
  - best_childrens_hospital_us_news.png
  - Boston_Children's_Hospital_logo.png
  - communications.png
  - copy-icon.svg
  - doctor.png
  - favicon.ico
  - favicon.png
  - footerImg.png
  - friends.png
  - home.png
  - titleImgCommunication.png
  - titleImgHome.PNG

- src/
  - pages/
    - api/
      - retrieveQuestions.tsx
    - _app.tsx
    - bookmarks.tsx
    - communication.tsx
    - index.tsx
    - questionnaire-page.tsx
    - resource-link-gen.tsx
  - styles/
    - Bookmark.module.css
    - Communication.module.css
    - Globals.css
    - Home.module.css
    - ResourceLinkGen.module.css
  - utils/
    - BodyContentStyle.tsx
    - GetSolutionPageForChoice.tsx
    - QuestionUtils.tsx
    - Pages&UtilsDocs.md
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
    * _app.tsx
        * MantineProvider
            - Provides global styles and normalization of CSS across the application
            - Encapsulates the whole application
        * Nav component
            - Displays the navigation bar consistently across all pages
            - Contains hamburder to display the options on-click
        * Context Providers
            - Wraps the content with BookmarkProvider and FocusedBookmarkProvider
            - Passes bookmark-related global states down to the bookmark page
    * bookmarks.tsx
        * URL encoding and loading
            - On page load, bookmarks are fetched and added through URL encoding
            - Fetches data using the fetchAndAddBookmarks function inside a useEffect
            - Sets a loading state while bookmarks are being retrieved
        * Bookmarks categorization
            - Sorts and categorizes bookmarks into predefined groups such as Communication
            - Uses a forEach loop to push bookmarks into their respective array and checks for correct key values
        * Bookmark URL construction
            - Constructs a shareable URL with encoded bookmark IDs.
            - The URL reflects the current state of bookmarks allowing them to be shared across devices
            - Updates the URL state whenever bookmarks change, and prevent infinite useEffect loop
        * EncodedUrlDisplay subcomponent
            - Renders a text prompt for saving resources
            - Displays the encoded URL which users can copy to save their bookmark state
            - Uses the CopyableLink component to display the URL
    * communication.tsx
        * Local storage utilities
            - Provides saveToLocalStorage and loadFromLocalStorage functions to load states and bookmarks
            - Ensures survey progress and bookmarks are saved on page reload, but is overridden by URL encoding
        * Reset notification
            - Notifies the user when a change has been made in Typeform that is not reflected on their website
            - Asks that the user reload the page to maintain consistency with the backend
            - Dismisses the notification after a few seconds to ensure it is not too distracting
        * Initial choices state
            - Defines a base state for choices using initialChoices
            - These choices act as the starting point for the communication questionnaire
            - If there are choices saved in local storage upon reload, loads them
        * Question state management
            - Manages the state of the current question, available choices, and the question timeline
            - Includes logic to handle transitions between questions based on user interaction
            - Loads question from local storage if it exists
        * SolutionPage rendering
            - Conditionally renders SolutionPage when a leaf in the question tree is reached
            - Passes the content down to the component, see component for more details
            - SolutionPage ids get preserved in the FocusedBookmark context for navigation to /communication
        * Question fetching and state
            - Fetches question list from an API and updates local storage accordingly
            - Checks for typeform consistency and updates the UI if changes are detected
        * Choice handling
            - Handles user's choice clicks and determines the next question or solution to display
            - Provides a notification if logic is not set on the backend for a given choice
            - Loads choices from local storage if they exist
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

    * BodyContentStyle.tsx
        * Common style traits
            - Establishes consistent color schemes and border styles
            - Implements responsive design traits that adapt to smaller screens
        * Inner style
            - Styles for button-like components, ensuring they are properly sized within their wrappers
            - Defines hover effects that change background and text color
        * Chevron style
            - Provides a specific style for chevron icons used in the Title
            - Includes a transition effect
        * Text styles
            - Defines the main text style used throughout the application
            - Ensures text elements maintain their style on smaller devices
        * Description text style
            - Sets a slightly smaller and lighter style for description text to differentiate them from primary text
            - Maintains consistent alignment and font traits with the main text style
        * Outer container style
            - Styles the outermost container of components to properly align content within the layout
        * Bookmark container style
            - Customizes the look for bookmark display
            - Ensures that the container is large enough
        * Copy icon style
            - Defines styles for icons used in copy functionalities
            - Ensures copy buttons are visually identifiable within the rest of the applicable
    * QuestionUtils.tsx
        * Typeform consistency check
            - Defines isTypeformConsistent to compare two sets of typeform data, primarily by comparing the length and the individual questions for equality
            - Useful for detecting changes in questionnaire content over time or between different sessions
        * Question equality
            - Defines areQuestionsEqual to determine if two questions are identical by comparing various properties including IDs, titles, references, types, descriptions, choices, solutions, and attachments
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


