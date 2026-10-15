import { screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { renderRouter } from "@/testing/render-router";

describe("application", () => {
  it("renders the home route in the application document", async () => {
    await renderRouter();
    await expect(
      screen.findByRole("heading", { name: "Welcome to TanStack Start" }),
    ).resolves.toBeVisible();
    expect(screen.getByText("src/routes/index.tsx")).toBeVisible();
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.title).toBe("TanStack Start Starter");
  });

  it("loads the about route directly", async () => {
    await renderRouter("/about");
    await expect(
      screen.findByRole("heading", { name: "About this starter" }),
    ).resolves.toBeVisible();
  });

  it("shows the router not-found response for unknown URLs", async () => {
    await renderRouter("/missing");
    await expect(screen.findByText("Not Found")).resolves.toBeVisible();
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });
});
