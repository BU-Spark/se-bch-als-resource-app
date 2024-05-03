import { renderHook, act } from "@testing-library/react-hooks";
import { BookmarkProvider, useBookmarks } from "@/contexts/BookmarkContext";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("BookmarkContext", () => {
  /**
   * Tests that the bookmarks context initializes with an empty list
   */
  it("Initializes empty", () => {
    const { result } = renderHook(() => useBookmarks(), {
      wrapper: BookmarkProvider,
    });
    expect(result.current.bookmarks).toEqual([]);
  });

  /**
   * Tests the ability to add a single bookmark
   */
  it("Can add a bookmark", () => {
    const { result } = renderHook(() => useBookmarks(), {
      wrapper: BookmarkProvider,
    });

    act(() => {
      result.current.addBookmark({
        id: "1",
        title: "Google",
        url: "https://google.com",
      });
    });

    expect(result.current.bookmarks).toEqual([
      { id: "1", title: "Google", url: "https://google.com" },
    ]);
  });

  /**
   * Tests the ability to remove a bookmark
   */
  it("Can remove a bookmark", () => {
    const { result } = renderHook(() => useBookmarks(), {
      wrapper: BookmarkProvider,
    });

    act(() => {
      result.current.addBookmark({
        id: "1",
        title: "Google",
        url: "https://google.com",
      });
    });

    act(() => {
      result.current.removeBookmark("1");
    });

    expect(result.current.bookmarks).toEqual([]);
  });

  /**
   * Tests that adding the same bookmark twice doesn't create duplicates
   */
  it("Bookmarks treated as a set", () => {
    const { result } = renderHook(() => useBookmarks(), {
      wrapper: BookmarkProvider,
    });

    act(() => {
      result.current.addBookmark({
        id: "1",
        title: "Google",
        url: "https://google.com",
      });
      result.current.addBookmark({
        id: "1",
        title: "Google",
        url: "https://google.com",
      });
    });

    expect(result.current.bookmarks.length).toBe(1);
  });
});
