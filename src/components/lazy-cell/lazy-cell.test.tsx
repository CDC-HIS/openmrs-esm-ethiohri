import React from "react";
import { render, waitFor } from "@testing-library/react";
import { LazyCell } from "./lazy-cell.component";

describe("LazyCell", () => {
  test("renders the resolved value after the promise is resolved", async () => {
    const { container } = render(
      <LazyCell lazyValue={Promise.resolve("Lazy cell")} />
    );
    await waitFor(() =>
      expect(container.firstChild).toHaveTextContent("Lazy cell")
    );
  });
});
