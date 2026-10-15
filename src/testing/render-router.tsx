import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getRouter } from "@/router";

export async function renderRouter(path = "/") {
  const router = getRouter();
  router.update({ history: createMemoryHistory({ initialEntries: [path] }) });
  await router.load();
  const user = userEvent.setup();
  render(<RouterProvider router={router} />, { container: document });
  return { user };
}
