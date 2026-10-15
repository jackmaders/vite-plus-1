import userEvent from "@testing-library/user-event";
import { Matches } from "@tanstack/react-router";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { createRouterWrapper } from "@/testing/wrappers/router";

describe("navigation", () => {
  it("navigates between routes using the main navigation", async () => {
    const wrapper = await createRouterWrapper();
    const user = userEvent.setup();
    render(<Matches />, { container: document, wrapper });
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    await user.click(within(navigation).getByRole("link", { name: "About" }));
    await expect(
      screen.findByRole("heading", { name: "About this starter" }),
    ).resolves.toBeVisible();
    expect(screen.getByText("src/routes/about.tsx")).toBeVisible();
    await user.click(within(navigation).getByRole("link", { name: "Home" }));
    await expect(
      screen.findByRole("heading", { name: "Welcome to TanStack Start" }),
    ).resolves.toBeVisible();
  });
});
