import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

import Bookmarks from "../../pages/bookmarks";
import { BookmarkProvider, useBookmarks } from "@/contexts/BookmarkContext";

// Enable fetch mocking
fetchMock.enableMocks();

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
    isReady: true,
    pathname: "/bookmarks"
  }),
}));

// Mock BookmarkContext with default values
jest.mock("@/contexts/BookmarkContext", () => {
  const originalModule = jest.requireActual("@/contexts/BookmarkContext");
  return {
    __esModule: true,
    ...originalModule,
    useBookmarks: jest.fn(() => ({
      bookmarks: [],
      folders: [],
      addBookmark: jest.fn(),
      createFolder: jest.fn(),
      deleteFolder: jest.fn(),
      renameFolder: jest.fn(),
    })),
  };
});

// Setup global mocks
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Bookmarks Page", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Reset fetch mock
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify({ questions: [] }), {
      status: 200,
    });

    // Set default useBookmarks mock return value
    useBookmarks.mockReturnValue({
      bookmarks: [],
      folders: [],
      addBookmark: jest.fn(),
      createFolder: jest.fn(),
      deleteFolder: jest.fn(),
      renameFolder: jest.fn(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /**
   * Tests initial render state with default collection
   */
  it("Should render default collection", async () => {
    await act(async () => {
      render(
        <BookmarkProvider>
          <Bookmarks />
        </BookmarkProvider>
      );
    });

    expect(screen.getByText("Default Collection")).toBeInTheDocument();
    expect(screen.getByText("0 bookmark(s)")).toBeInTheDocument();
  });

  /**
   * Tests the folder creation flow including modal interaction
   */
  it("Should open create folder modal and create new folder", async () => {
    const createFolder = jest.fn();
    useBookmarks.mockReturnValue({
      bookmarks: [],
      folders: [],
      createFolder,
      deleteFolder: jest.fn(),
      renameFolder: jest.fn(),
    });

    await act(async () => {
      render(
        <BookmarkProvider>
          <Bookmarks />
        </BookmarkProvider>
      );
    });

    fireEvent.click(screen.getByLabelText("Add Folder"));
    fireEvent.change(screen.getByPlaceholderText("Enter collection name"), {
      target: { value: "New Folder" },
    });
    fireEvent.click(screen.getByText("Create"));

    expect(createFolder).toHaveBeenCalledWith("New Folder");
  });

  /**
   * Tests folder settings menu display and interactions
   */
  it("Should open settings menu for folder", async () => {
    useBookmarks.mockReturnValue({
      bookmarks: [],
      folders: [{ id: "1", name: "Test Folder", bookmarks: [] }],
      createFolder: jest.fn(),
      deleteFolder: jest.fn(),
      renameFolder: jest.fn(),
    });

    await act(async () => {
      render(
        <BookmarkProvider>
          <Bookmarks />
        </BookmarkProvider>
      );
    });

    const settingsButton = screen.getByTestId("folder-settings-button");
    fireEvent.click(settingsButton);

    expect(screen.getByText("Bookmark Settings")).toBeInTheDocument();
    expect(screen.getByText("Rename Collection")).toBeInTheDocument();
    expect(screen.getByText("Delete Collection")).toBeInTheDocument();
  });

  /**
   * Tests the complete folder deletion flow
   */
  it("Should delete folder", async () => {
    const deleteFolder = jest.fn();
    useBookmarks.mockReturnValue({
      bookmarks: [],
      folders: [{ id: "1", name: "Test Folder", bookmarks: [] }],
      createFolder: jest.fn(),
      deleteFolder,
      renameFolder: jest.fn(),
    });

    await act(async () => {
      render(
        <BookmarkProvider>
          <Bookmarks />
        </BookmarkProvider>
      );
    });

    const settingsButton = screen.getByTestId("folder-settings-button");
    fireEvent.click(settingsButton);

    const deleteOption = screen.getByTestId("delete-folder-option");
    fireEvent.click(deleteOption);

    const confirmDeleteButton = screen.getByTestId("confirm-delete-button");
    fireEvent.click(confirmDeleteButton);

    expect(deleteFolder).toHaveBeenCalledWith("1");
  });

  /**
   * Tests bookmark count display for both default and custom folders
   */
  it("Should display correct bookmark counts", async () => {
    useBookmarks.mockReturnValue({
      bookmarks: [{ id: "1", title: "Bookmark 1" }],
      folders: [
        {
          id: "1",
          name: "Test Folder",
          bookmarks: [{ id: "2", title: "Bookmark 2" }]
        }
      ],
      createFolder: jest.fn(),
      deleteFolder: jest.fn(),
      renameFolder: jest.fn(),
    });

    await act(async () => {
      render(
        <BookmarkProvider>
          <Bookmarks />
        </BookmarkProvider>
      );
    });

    const bookmarkCounts = screen.getAllByText(/1 bookmark\(s\)/);
    expect(bookmarkCounts).toHaveLength(2);

    const defaultFolder = screen.getByText("Default Collection")
      .nextElementSibling;
    expect(defaultFolder).toHaveTextContent("1 bookmark(s)");

    const testFolder = screen.getByText("Test Folder")
      .nextElementSibling;
    expect(testFolder).toHaveTextContent("1 bookmark(s)");
  });
});