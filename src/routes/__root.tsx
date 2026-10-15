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
  shellComponent: RootDocument,
});

// oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- ReactNode includes framework-owned mutable types; component props remain readonly.
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav aria-label="Main navigation">
            {/* oxlint-disable-next-line react/jsx-max-depth -- Document navigation nests inside html and body. */}
            <Link to="/">Home</Link>
            {/* oxlint-disable-next-line react/jsx-max-depth -- Document navigation nests inside html and body. */}
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}

        <Scripts />
      </body>
    </html>
  );
}
