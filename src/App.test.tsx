import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

describe("RoadRate app", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("calculates an estimate from the form", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /estimate toll/i }));

    expect(screen.getByText("$4.65")).toBeInTheDocument();
    expect(screen.getByText(/Morning peak rate/)).toBeInTheDocument();
  });

  it("can switch to weekend rates", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText(/day type/i), "weekend");
    await user.clear(screen.getByLabelText(/travel time/i));
    await user.type(screen.getByLabelText(/travel time/i), "17:15");
    await user.click(screen.getByRole("button", { name: /estimate toll/i }));

    expect(screen.getByText("$3.60")).toBeInTheDocument();
  });
});
