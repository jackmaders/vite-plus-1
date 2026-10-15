import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <main>
      <h1>About this starter</h1>
      <p>
        Edit <code>src/routes/about.tsx</code> to get started.
      </p>
    </main>
  );
}
