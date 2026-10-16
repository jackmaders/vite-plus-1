import { createRootRoute } from "@tanstack/react-router";

import { NotFound } from "@/components/not-found";
import { RootDocument } from "@/components/root-document";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        href: appCss,
        rel: "stylesheet",
      },
    ],
    meta: [
      {
        charSet: "utf8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});
