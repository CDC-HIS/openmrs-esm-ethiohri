import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorState } from "./error-state.component";

describe("ErrorState component", () => {
  test("renders error message and header title", () => {
    const error = {
      response: {
        status: 404,
        statusText: "Not Found",
      },
    };
    const headerTitle = "Error State";

    render(<ErrorState error={error} headerTitle={headerTitle} />);

    const errorMessage = screen.getByText("Error 404: Not Found");
    const errorCopy = screen.getByText(
      "Sorry, there was a problem displaying this information. You can try to reload this page, or contact the site administrator and quote the error code above."
    );

    expect(errorMessage).toBeInTheDocument();
    expect(errorCopy).toBeInTheDocument();
  });
});
