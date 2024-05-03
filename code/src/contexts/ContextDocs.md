Docs Written by @jacob-stein1, contact for assistance
DOCUMENTATION:

Below is documentation for the contexts. Contexts behave like global states, allowing different components and pages to modify a stateful resource. These contexts each have the modifiable data, and then mutator functions. For more information on contexts, see the [official React documentation](https://react.dev/reference/react/useContext)

### BookmarkContext

- BookmarkContext maintains a global array of bookmarks
- Bookmarks contain an id, title, and url
- The context can be invoked using the useBookmarks custom hook, which returns bookmarks, and an add and remove function
- All children using the context must be wrapped in the BookmarkContextProvider
- Currently, the entire application is wrapped in the BookmarkContextProvider
- The two useEffect hooks read bookmarks from localStorage to the context, and vice versa
- Conditions within the useEffect hooks prevent infinite loop of adding bookmarks
- The context is used primariy within the BookmarkButton, which controls state management of the bookmark array

### FocusedBookmarkContext

- FocusedBookmarkContext maintains the state of a 'focused' bookmark
- A bookmark is 'focused' if a user has clicked it on from /bookmarks
- This context was used as a solution to route from /bookmarks to /communication while maintaining a state
- This context could be substituted for localStorage, but we found this to be more intuitive and scalable
- The context can be invoked using the useFocusedBookmark hook, which returns the bookmark and a mutator function
- By default, the 'focused' bookmark is set to undefined
- The /communication page contains a useEffect which checks if there is a focused bookmark, rendering it if so
- When a user clicks a bookmark from the bookmark page, it sets the focused bookmark so that the useEffect in /communication will render it
- After the focused bookmark is render, it is set back to undefined so it will not reload if the user navigates to /communication from anywhere else
- In other words, navigating to /communication from /bookmark temporarily stores the bookmark in the context so it can be rendered, then it is removed
- Feel free to replace this mechanism with a better state control mechanism if you see fit