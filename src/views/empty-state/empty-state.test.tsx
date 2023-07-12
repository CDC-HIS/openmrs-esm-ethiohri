import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state.component";

describe("EmptyState Component", () => {
  const headerTitle = "This is a header";
  const displayText = "example display text";

  test("renders header title", () => {
    render(<EmptyState headerTitle={headerTitle} displayText={displayText} />);
    const headerElement = screen.getByText(headerTitle);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders display text", () => {
    render(<EmptyState headerTitle={headerTitle} displayText={displayText} />);
    const displayTextElement = screen.getByText(
      `There are no ${displayText} to display for this patient`
    );
    expect(displayTextElement).toBeInTheDocument();
  });
});
