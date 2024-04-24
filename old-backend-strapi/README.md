Written by @jacob-stein1

When we began working on this project, all data was stored in a headless CMS called Strapi. We ultimately migrated away from Strapi to Typeform due to the tree-like structure of the data. Strapi did not have built in infrastructure to support trees, so the previous team implemented the questionnaire structure using a doubly-linked list.

The old linked-list based structure worked, but was not very intuitive. It was very difficult to insert nodes and update the questionnaire, as it would require an entire restructuring of the data. We have since migrated to Typeform, which contains a better interface for supporting tree-like data.

To learn more about how the data was structured, see the 'old-content-structure-examples' directory. In that directory, the JSONs inform how the data was originally structured. Each JSON represents a different schema in the original design, and contains several examples of each type. The types 'choice-to-question-maps' and 'question-to-choice-maps' were used to represent the doubly-linked lists. The 'solution' schema represented leaf nodes in the tree, and 'first-entires' served as the root.

There was an instance of Strapi hosted on Railway, which we populated for original testing when we first received the project. This directory is used to launch a local instance of Strapi, which previous teams would test on before pushing to the instance on Railway. The file StrapiDocs.md contains instructions on how to load a local Strapi instance.

This directory is not particularly useful, however, because the frontend has been changed to interact with Typeform API. In other words, even if you run the Strapi backend locally, it will not be populated nor connected to your local frontend. If you'd still like to try running it locally, please see old commits on the dev branch.

There is little use for this directory beyond documentation purposes. If you feel it provides no information beyond this README, please feel free to delete it.
