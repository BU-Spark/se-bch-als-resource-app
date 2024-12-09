## Getting Started

## ALS Resource App

### Project Description

People with ALS around the world are not offered a variety of clinical options. There are dozens of opportunities for what could be the most beneficial option to them, but are usually only offered a few. The goal is to take clinical decision making and turn it into a tool that allows ALS patients to look at options and discuss them with their clinician (I have questions about a, b, and c). This tool/guide will allow people with ALS and clinicians/clinics to collaborate in the process of identifying best options throughout the disease process. Tools, resources, and methodologies are continually evolving to help people with ALS to cope with their condition. Because of the rapid nature of development(s), communicating updated resources to both clinicians and patients is difficult.

The two primary users of this application (mobile or web app) would be patients with ALS or clinicians who work with ALS patients on occasion (such as primary care physicians etc). The goal would be to provide them with a guided system that is constantly updated with the latest information. Each answer to a question or series of questions would lead the user down a different branch of questions and finally suggestions for the patient's current condition. The end goal would be creating a platform that helps distribute the information to patients and clinicians who might not have access to clinics with ALS experts.

### User Stories

As a user, I want to customize font size, contrast and colors so that I can better read and navigate the application.

As a patient, I want to organize bookmarks into custom folders so that I can better manage saved resources.

As a user, I want to share resources via QR codes and links so that I can collaborate with my healthcare team.

As a patient, I want to access full functionality on both computer and smartphone so that I can use resources anywhere.

As a user, I want secure access to my saved information so that my privacy is protected.

### Run Project

Frontend: <br>
nagivate to \code <br>

```bash
npm install
npm run dev
```

Backend: <br>

Backend is hosted on Typeform.

For a detailed walkthrough of the backend functionality and setup, please watch our guide video: [Backend Tutorial] (https://drive.google.com/file/d/1d9_V7mGNgFwFdflefdp7k5er5ok1WIl4/view)


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

### Core Components

The application consists of these key functional areas:

* Navigation System
  - Navbar with responsive design
  - Settings management
  - Accessibility controls
  - Route handling

* Content Management
  - Bookmark system
  - Resource display
  - Solution pages
  - Collection organization

* User Interface Components
  - Modals and notifications
  - Form elements
  - Interactive controls
  - Responsive layouts

For detailed component documentation, see:
- ComponentDocs.md - UI component details
- Pages&UtilsDocs.md - Page and utility documentation

### Technical Architecture

Key directories:
- `/components` - Core UI components
- `/pages` - Application routes
- `/utils` - Helper functions
- `/styles` - Global styling

Core utilities:
- API integration
- State management
- Data processing
- Resource handling

For implementation details, refer to inline documentation and respective .md files.

### Tests

Docs Written by @jacob-stein1, contact for assistance
DOCUMENTATION

We have written test cases to check the rendering of components, the function of contexts, and more. Testing is written using the Jest JavaScript testing framework. See their [documentation](https://jestjs.io/docs/getting-started) for more info.

Tests are contained within a '**tests**' directory within each sub-directory of the project. For example /pages/**tests**/'page'.test.js contains the test cases for each page in the pages directory.

To run all tests:

$ npm run test

### Current Priorities & Issues & Recommended Next Steps

1. UI/UX Improvements
  - Fix bookmark link generation (404 errors)
  - Resolve layout conflicts in inverted color mode
  - Implement image optimization

2. Technical Debt
  - Build custom backend with ReactFlow
  - Remove single-video limitation from Typeform
  - Optimize high-resolution image handling

3. System Performance
  - Address navigation performance in mobile view
  - Improve loading states for resources
  - Enhance cross-browser compatibility

All issues tracked in [GitHub Issues](https://github.com/BU-Spark/se-bch-als-resource-app/issues)

### Fall 2024 Updates

Core Features:
1. Navigation & UI
  - Left-side panel desktop navigation
  - Responsive mobile design
  - Enhanced UI/UX elements

2. Accessibility System
  - Font size/weight controls
  - Color scheme customization
  - Contrast adjustment
  - Color mode options

3. Resource Management
  - Custom folder organization
  - Collection movement
  - QR code/URL sharing
  - Print preview system

### Deployment & Contacts

Frontend: [Vercel Deployment](https://se-bch-als-resource-app-zeta.vercel.app/)
Note: Access limited on BU Network

Backend: Typeform (buspark@bu.edu)
API: Managed via /api/retrieveQuestions

Contact Information:
Previous Team (2023):
- Jacob Stein (jmstein@bu.edu)
- 
Current Team (2024 Fall):
- Brian Zeng (bzeng0@bu.edu)
- Charles Zhang (zhr114@bu.edu)
- Minyang Li (limingy@bu.edu)
