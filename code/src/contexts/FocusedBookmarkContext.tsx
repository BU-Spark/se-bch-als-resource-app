import React, { createContext, useState, useContext, ReactNode } from "react";
import { ResourceLink } from "@/types/dataTypes";

type FocusedBookmarkType = {
  focusedBookmark: ResourceLink | null;
  setFocusedBookmark: (bookmark: ResourceLink | null) => void;
};

const FocusedBookmarkContext = createContext<FocusedBookmarkType | undefined>(
  undefined
);

/**
 * Custom hook for accessing the FocusedBookmarkContext.
 * Must be used within a FocusedBookmarkProvider.
 * @returns {FocusedBookmarkType} The focused bookmark and set function.
 */
export const useFocusedBookmark = () => {
  const context = useContext(FocusedBookmarkContext);
  if (!context) {
    throw new Error(
      "useFocusedBookmark must be used within a FocusedBookmarkProvider"
    );
  }
  return context;
};

/**
 * Provides the FocusedBookmarkContext to child components
 */
export const FocusedBookmarkProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [focusedBookmark, setFocusedBookmark] = useState<ResourceLink | null>(
    null
  );

  return (
    <FocusedBookmarkContext.Provider
      value={{ focusedBookmark, setFocusedBookmark }}
    >
      {children}
    </FocusedBookmarkContext.Provider>
  );
};
