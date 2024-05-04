import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  FocusedBookmarkProvider,
  useFocusedBookmark,
} from "@/contexts/FocusedBookmarkContext";

function TestComponent() {
  const { focusedBookmark, setFocusedBookmark } = useFocusedBookmark();
  return (
    <div>
      {focusedBookmark ? (
        <div>{focusedBookmark.title}</div>
      ) : (
        <div>No Bookmark Set</div>
      )}
      <button onClick={() => setFocusedBookmark(testBookmark)}>
        Set Bookmark
      </button>
      <button onClick={() => setFocusedBookmark(null)}>Clear Bookmark</button>
    </div>
  );
}

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
    render(
      <FocusedBookmarkProvider>
        <TestComponent />
      </FocusedBookmarkProvider>
    );
    expect(screen.getByText("No Bookmark Set")).toBeInTheDocument();
  });

  /**
   * Test to ensure that the focused bookmark can be set and retrieved correctly.
   */
  it("Should allow setting and retrieving a focused bookmark", () => {
    render(
      <FocusedBookmarkProvider>
        <TestComponent />
      </FocusedBookmarkProvider>
    );
    fireEvent.click(screen.getByText("Set Bookmark"));
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  /**
   * Test to ensure that the focused bookmark can be set to null after being set to a value.
   */
  it("Should allow clearing the focused bookmark", () => {
    render(
      <FocusedBookmarkProvider>
        <TestComponent />
      </FocusedBookmarkProvider>
    );
    fireEvent.click(screen.getByText("Set Bookmark"));
    fireEvent.click(screen.getByText("Clear Bookmark"));
    expect(screen.getByText("No Bookmark Set")).toBeInTheDocument();
  });
});
