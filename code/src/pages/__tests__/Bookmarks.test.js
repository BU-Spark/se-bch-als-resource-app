import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

import Bookmarks from "../bookmarks";
import { BookmarkProvider, useBookmarks } from "@/contexts/BookmarkContext";
import { FocusedBookmarkProvider } from "@/contexts/FocusedBookmarkContext";

fetchMock.enableMocks();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
  }),
}));

/**
 * Mocks the BookmarkContext.
 */
jest.mock("@/contexts/BookmarkContext", () => {
  const originalModule = jest.requireActual("@/contexts/BookmarkContext");
  return {
    __esModule: true,
    ...originalModule,
    useBookmarks: jest.fn(() => ({
      bookmarks: [],
      addBookmark: jest.fn(),
      removeBookmark: jest.fn(),
    })),
  };
});

describe("Bookmarks Page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify({ questions: [] }), {
      status: 200,
    });
  });

  /**
   * Tests rendering with no bookmarks.
   */
  it("Renders with no bookmarks", async () => {
    await act(async () => {
      render(
        <BookmarkProvider>
          <Bookmarks />
        </BookmarkProvider>
      );
    });
    const elements = screen.getAllByText(/You don't have any bookmarks/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  /**
   * Tests rendering a bookmark when added.
   */
  it("Renders a bookmark when added", async () => {
    useBookmarks.mockReturnValue({
      bookmarks: [{ id: "1", title: "Bookmark 1", url: "Communication" }],
      addBookmark: jest.fn(),
      removeBookmark: jest.fn(),
    });

    const { rerender } = render(
      <FocusedBookmarkProvider>
        <BookmarkProvider>
          <Bookmarks />
        </BookmarkProvider>
      </FocusedBookmarkProvider>
    );

    await waitFor(
      () =>
        expect(
          screen.getByText(
            /Use the link below to automatically load and access your bookmarks in the future, from any device./i
          )
        ).toBeInTheDocument(),
      {
        timeout: 1000,
      }
    );
  });

  /**
   * Tests rendering bookmark categories.
   */
  it("Renders bookmark categories", async () => {
    useBookmarks.mockReturnValue({
      bookmarks: [
        { id: "1", title: "Bookmark 1", url: "Communication" },
        { id: "2", title: "Bookmark 2", url: "Computer Access" },
      ],
      addBookmark: jest.fn(),
      removeBookmark: jest.fn(),
    });

    await act(async () => {
      render(
        <FocusedBookmarkProvider>
          <BookmarkProvider>
            <Bookmarks />
          </BookmarkProvider>
        </FocusedBookmarkProvider>
      );
    });

    const cat1 = screen.getByText("Communication");
    const cat2 = screen.getByText("Computer Access");
    expect(cat1).toBeInTheDocument();
    expect(cat2).toBeInTheDocument();
  });

  /**
   * Tests if URL encoding component is rendered correctly.
   */
  it("URL encoding component rendered", async () => {
    useBookmarks.mockReturnValue({
      bookmarks: [
        { id: "1", title: "Bookmark 1", url: "Communication" },
        { id: "2", title: "Bookmark 2", url: "Computer Access" },
      ],
      addBookmark: jest.fn(),
      removeBookmark: jest.fn(),
    });

    await act(async () => {
      render(
        <FocusedBookmarkProvider>
          <BookmarkProvider>
            <Bookmarks />
          </BookmarkProvider>
        </FocusedBookmarkProvider>
      );
    });

    const actualText = screen.getByText("Save Your Resources")
      .nextElementSibling.textContent;
    const expectedText =
      "Use the link below to automatically load and access your bookmarks in the future, from any device.";
    expect(actualText).toBe(expectedText);
  });

  /**
   * Tests if unexpected original URLs are handled.
   */
  it("Handles unexpected original URLs", async () => {
    console.warn = jest.fn();

    useBookmarks.mockReturnValue({
      bookmarks: [{ id: "1", title: "Bookmark 1", url: "Invalid Category" }],
      addBookmark: jest.fn(),
      removeBookmark: jest.fn(),
    });

    await act(async () => {
      render(
        <FocusedBookmarkProvider>
          <BookmarkProvider>
            <Bookmarks />
          </BookmarkProvider>
        </FocusedBookmarkProvider>
      );
    });

    expect(console.warn).toHaveBeenCalledWith(
      "Unexpected original: Invalid Category"
    );
  });
});
