
# Combined Technical Issues Summary and Solutions

## Context
Development of a web application featuring a choice-based questionnaire, with the frontend interacting with Strapi CMS. This document combines the initial and updated logs of setups, encountered technical issues and their resolutions.

This current version should have a fully functional branches on Communciation, Computer Access and Smartphone Access. As well as a save feature(bookmark) at each solution page that stores the page identifier under the user the user.


## Export-script usages

### Endpoint permission Setups 
Make sure to adjust the accessibility of API endpoints in strapi admin domain BEFORE making ANY changes. Go to Settings -> Users & Permissions Plugin -> Roles -> Public -> Permissions. Modify permission level for each collection type accordingly before making any API calls

For endpoint issues, use POSTman or ThunderClient to check debug, more description on "403, 404, 405 issues.md"

### export-chocie-script
This script is an example script on how to export a specific collection type from strapi to save it on a developer's local repository, as changes made in strapi admin panel will not be explicitly recorded on the repository otherwise.(reccommended to turn all permission on except for delete)

### export-script
This script is the main export script to save all data entries from strapi admin panel to a developer's local repo. Due to entry deletions, some ID numbers will not exist, therefore the script used a hardcode approach to go thorugh all total number of entry IDs in each collection types. To make adjustment, make sure to adjust the upperbound of totalEntries attribute for each accordingly. Use by calling "node export-script.js" in root directory.

## Primary Issues and Resolutions

### Initial Issues
1. **Frontend Data Fetching Error (404 Not Found)**
   - **Problem:** Errors when fetching data for "Communication" choice from Strapi.
   - **Resolution:** Corrected the API endpoint in `QuestionairePage.tsx`.

2. **Strapi Data Import Script Failure (405 Method Not Allowed and 404 Not Found)**
   - **Problem:** Failed to authenticate with Strapi.
   - **Resolution:** Adjusted user and permissions settings in Strapi admin panel.

3. **Strapi Console Errors (403 Forbidden, 404 Not Found)**
   - **Problem:** Various errors on API requests.
   - **Resolution:** Permissions adjusted in Strapi, and API endpoints corrected.

4. **Adding TitleDescription Box to Questions**
   - **Requirement:** Implement a description field for questions.
   - **Resolution:** Added `QuestionDescription` field in Strapi and updated the frontend.

### Updated Issues and Solutions
1. **Save Feature Implementation (Bookmark)**
   - **Issue:** Limited to solution pages as per Figma design.
   - **Resolution:** Functionality confirmed on solution pages.

2. **Incomplete Figma Structure**
   - **Issue:** Missing solutions for certain choices, questions have incomplete branches in Figma.
   - **Resolution:** Collaboration with the design team needed for completion.

3. **Incomplete Platform Selection**
   - **Issue:** Incomplete implementation of dropdown menu for device and OS selection in 
   Strapi, unclear selection and choices of combination in Communication branch.
   - **Resolution:** Future Figma developers need to clarify and elaborate relations and functionalities.

4. **Duplicate Page Names & Chioces in Figma**
   - **Issue:** Naming duplication of questions and choices in Figma design(Ex. multiple questions with name "Which of the following applies to you?" exist), causing confusion in backend developments. Distinguishable choice names is HIGHLY necessary, especially for computer access branch: it contains multiple subpages with same choices & questions.
   - **Resolution:** Discuss with UX team for naming clarity.

5. **Bookmark Feature and User Association**
   - **Issue:** Bookmarks linked to users as page ID numbers, however page IDs aren't specified in figma.
   - **Resolution:** Enhancements needed for descriptive bookmark information.

6. **Homepage questions & First entry/tree level usages**
   - **Issue:** Currenntly the first question on homepage is hardcoded with a question and   4 choices on the branch that the user wish to look into
   - **Resolution:** Make use of the first entry collection type(currently not used) and tree level to make a more managable system in larger scale in backend.
   
## New Considerations for Future Development

1. **Homepage Development**
   - **Requirement:** Develop a proper homepage with user login(for user creditials on save feature).
   - **Suggested Approach:** Design and implement a homepage aligning with the application's theme.

2. **Sidebar Menu Implementation**
   - **Requirement:** Creation of a sidebar menu to access user creditials and save features.
   - **Suggested Approach:** Develop a user-friendly sidebar menu for better navigation.

3. **User Feedback Loop**
   - **Action:** Introduce a system for collecting user feedback.

4. **Scalability and Security**
   - **Action:** Ensure scalability and regularly update security measures.

## Conclusion
This combined document aims to assist future developers by providing detailed records of technical challenges and solutions, encouraging continual updates for efficient knowledge transfer and problem-solving in the development process.

Last edited by **Lionel Chen** on 12/04/23, please contact me for any questions [lionelc@bu.edu]
