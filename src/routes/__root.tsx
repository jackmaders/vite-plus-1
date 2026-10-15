import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router";

import type { ReactNode } from "react";
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
        // oxlint-disable-next-line unicorn/text-encoding-identifier-case -- HTML charset metadata uses the official template's UTF-8 label, not a Node encoding identifier.
        charSet: "utf-8",
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
  shellComponent: RootDocument,
});

// oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- ReactNode includes framework-owned mutable element/iterable types; props are readonly.
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}

        <Scripts />
      </body>
    </html>
  );
}
