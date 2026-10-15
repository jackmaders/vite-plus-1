import { Matches } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { createRouterWrapper } from "@/testing/wrappers/router";

describe("application", () => {
  it("renders the home route in the application document", async () => {
    const wrapper = await createRouterWrapper();
    render(<Matches />, { container: document, wrapper });
    await expect(
      screen.findByRole("heading", { name: "Welcome to TanStack Start" }),
    ).resolves.toBeVisible();
    expect(screen.getByText("src/routes/index.tsx")).toBeVisible();
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.title).toBe("TanStack Start Starter");
  });

  it("loads the about route directly", async () => {
    const wrapper = await createRouterWrapper("/about");
    render(<Matches />, { container: document, wrapper });
    await expect(
      screen.findByRole("heading", { name: "About this starter" }),
    ).resolves.toBeVisible();
  });

  it("shows the router not-found response for unknown URLs", async () => {
    const wrapper = await createRouterWrapper("/missing");
    render(<Matches />, { container: document, wrapper });
    await expect(screen.findByText("Not Found")).resolves.toBeVisible();
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });
});
