import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";

import QuestionaireBodyContent from "../questionaire-page";

const initialChoices = [
  { id: "0", ref: "0", label: "Communication", link: "/communication" },
  { id: "1", ref: "0", label: "Computer Access", link: "/computer-access" },
  { id: "2", ref: "0", label: "Home Access", link: "/home-access" },
  {
    id: "3",
    ref: "0",
    label: "Smart Phone Access",
    link: "/smart-phone-access",
  },
];

const currQuestion = {
  id: "0",
  title: "Which area do you want to look into?",
  ref: "0",
  type: "multiple_choice",
};

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const setup = () => {
  const push = jest.fn();
  useRouter.mockImplementation(() => ({ push }));
  render(<QuestionaireBodyContent />);
  return { push };
};

describe("QuestionaireBodyContent", () => {
  /**
   * Render initial choices
   */
  it("Should render initial choices", () => {
    setup();
    initialChoices.forEach((choice) => {
      expect(screen.getByText(choice.label)).toBeInTheDocument();
    });
  });

  /**
   * Check for correct naviation
   */
  it("Should navigates to correct page", () => {
    const { push } = setup();
    const choiceButton = screen.getByText("Communication");
    fireEvent.click(choiceButton);
    expect(push).toHaveBeenCalledWith("/communication");
  });

  /**
   * Check page title
   */
  it("Should display the correct title", () => {
    setup();
    expect(
      screen.getByText("Which area do you want to look into?")
    ).toBeInTheDocument();
  });

  /**
   * Check question correctness
   */
  it("Should display correct question", () => {
    setup();
    expect(screen.getByText(currQuestion.title)).toBeInTheDocument();
    if (currQuestion.description) {
      expect(screen.getByText(currQuestion.description)).toBeInTheDocument();
    }
  });
});
