import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <main>
      <h1>About this starter</h1>
      <p>
        Both pages render on the server. Navigation continues in the browser with TanStack Router.
      </p>
      <Link to="/">Back to home</Link>
    </main>
  );
}
