import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vite-plus/test";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
afterEach(cleanup);
