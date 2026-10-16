import { HeadContent, Scripts } from "@tanstack/react-router";

import type { ReactNode } from "react";
import { Navigation } from "@/components/navigation";

export function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Navigation />
        {children}

        <Scripts />
      </body>
    </html>
  );
}
