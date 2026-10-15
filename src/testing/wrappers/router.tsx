import { createMemoryHistory, RouterContextProvider } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { getRouter } from "@/router";

export async function createRouterWrapper(path = "/") {
  const router = getRouter();
  router.update({ history: createMemoryHistory({ initialEntries: [path] }) });
  await router.load();

  return function RouterWrapper({ children }: PropsWithChildren) {
    return <RouterContextProvider router={router}>{children}</RouterContextProvider>;
  };
}
