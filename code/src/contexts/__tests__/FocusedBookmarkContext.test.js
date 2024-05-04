import { renderHook, act } from "@testing-library/react-hooks";

import {
  FocusedBookmarkProvider,
  useFocusedBookmark,
} from "@/contexts/FocusedBookmarkContext";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

const testBookmark = {
  id: "1",
  title: "Google",
  url: "https://google.com",
};

describe("FocusedBookmarkContext", () => {
  /**
   * Test to ensure that the hook can read the initial state which should be null.
   */
  it("Should initialize with null focused bookmark", () => {
    const { result } = renderHook(() => useFocusedBookmark(), {
      wrapper: FocusedBookmarkProvider,
    });
    expect(result.current.focusedBookmark).toBeNull();
  });

  /**
   * Test to ensure that the focused bookmark can be set and retrieved correctly.
   */
  it("Should allow setting and retrieving a focused bookmark", () => {
    const { result } = renderHook(() => useFocusedBookmark(), {
      wrapper: FocusedBookmarkProvider,
    });

    act(() => {
      result.current.setFocusedBookmark(testBookmark);
    });

    expect(result.current.focusedBookmark).toEqual(testBookmark);
  });

  /**
   * Test to ensure that the focused bookmark can be set to null after being set to a value.
   */
  it("Should allow clearing the focused bookmark", () => {
    const { result } = renderHook(() => useFocusedBookmark(), {
      wrapper: FocusedBookmarkProvider,
    });

    // Set to a value first
    act(() => {
      result.current.setFocusedBookmark(testBookmark);
    });

    // Then clear it
    act(() => {
      result.current.setFocusedBookmark(null);
    });

    expect(result.current.focusedBookmark).toBeNull();
  });

  /**
   * Test to ensure that using useFocusedBookmark outside of its provider throws an error.
   */
  it("Should throw an error", () => {
    const { result } = renderHook(() => useFocusedBookmark());
    expect(result.error).toEqual(
      new Error(
        "useFocusedBookmark must be used within a FocusedBookmarkProvider"
      )
    );
  });
});
