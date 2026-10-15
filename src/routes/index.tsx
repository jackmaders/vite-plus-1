import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <main>
      <h1>Vite+ meets TanStack Start</h1>
      <p>A minimal React starter with file-based routing and server rendering.</p>
      <Link to="/about">About this starter</Link>
    </main>
  );
}
