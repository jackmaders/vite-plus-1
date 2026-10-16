import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vite-plus/test";
// oxlint-disable-next-line import/no-namespace -- Register the complete jest-dom matcher namespace.
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
afterEach(cleanup);
