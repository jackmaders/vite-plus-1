import { createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    links: [{ href: appCss, rel: "stylesheet" }],
    meta: [
      { charSet: "utf8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: "Vite+ · TanStack Start" },
      { content: "A React and TanStack Start starter powered by Vite+.", name: "description" },
    ],
  }),
  notFoundComponent: NotFoundPage,
  shellComponent: RootDocument,
});

function NotFoundPage() {
  return (
    <main>
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </main>
  );
}

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
