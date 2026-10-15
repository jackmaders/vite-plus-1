import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { renderRouter } from "@/testing/render-router";

describe("navigation", () => {
  it("navigates between routes using the main navigation", async () => {
    const { user } = await renderRouter();
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
