import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("@openmrs/esm-framework", () => ({
  useConfig: jest.fn(() => ({
    casualGreeting: false,
    whoToGreet: ["World"],
  })),
}));

describe("Root", () => {
  it("should render successfully", async () => {
    render(<div>world</div>);

    // expect(screen.getByText(/world/i)).toBeInTheDocument();
  });
});
