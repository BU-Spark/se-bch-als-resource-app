import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { BookmarkProvider, useBookmarks } from "@/contexts/BookmarkContext";

function TestComponent({ onBookmarkChange }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id}>{bookmark.title}</div>
      ))}
      <button
        onClick={() =>
          addBookmark({ id: "1", title: "Google", url: "https://google.com" })
        }
      >
        Add Google
      </button>
      <button onClick={() => removeBookmark("1")}>Remove Google</button>
      <button onClick={() => onBookmarkChange(bookmarks)}>Test Output</button>
    </div>
  );
}

describe("BookmarkContext", () => {
  /**
   * Tests that the bookmarks context initializes with an empty list
   */
  it("Should initialize empty", () => {
    render(
      <BookmarkProvider>
        <TestComponent
          onBookmarkChange={(bookmarks) => {
            expect(bookmarks).toEqual([]);
          }}
        />
      </BookmarkProvider>
    );
    fireEvent.click(screen.getByText("Test Output"));
  });

  /**
   * Tests the ability to add a single bookmark
   */
  it("Should add a bookmark", () => {
    render(
      <BookmarkProvider>
        <TestComponent
          onBookmarkChange={(bookmarks) => {
            expect(bookmarks).toEqual([
              { id: "1", title: "Google", url: "https://google.com" },
            ]);
          }}
        />
      </BookmarkProvider>
    );
    fireEvent.click(screen.getByText("Add Google"));
    fireEvent.click(screen.getByText("Test Output"));
  });

  /**
   * Tests the ability to remove a bookmark
   */
  it("Should remove a bookmark", () => {
    render(
      <BookmarkProvider>
        <TestComponent
          onBookmarkChange={(bookmarks) => {
            expect(bookmarks).toEqual([]);
          }}
        />
      </BookmarkProvider>
    );
    fireEvent.click(screen.getByText("Add Google"));
    fireEvent.click(screen.getByText("Remove Google"));
    fireEvent.click(screen.getByText("Test Output"));
  });

  /**
   * Tests that adding the same bookmark twice doesn't create duplicates
   */
  it("Should treat bookmarks as a set", () => {
    render(
      <BookmarkProvider>
        <TestComponent
          onBookmarkChange={(bookmarks) => {
            expect(bookmarks.length).toBe(1);
          }}
        />
      </BookmarkProvider>
    );
    fireEvent.click(screen.getByText("Add Google"));
    fireEvent.click(screen.getByText("Add Google"));
    fireEvent.click(screen.getByText("Test Output"));
  });
});
