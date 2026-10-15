import { Link } from "@tanstack/react-router";

export function Navigation() {
  return (
    <header>
      <nav aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
