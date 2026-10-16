import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vite-plus/test";
// oxlint-disable-next-line import/no-namespace -- Register the complete jest-dom matcher namespace.
import * as matchers from "@testing-library/jest-dom/matchers";

type HappyDomWindow = Window & {
  happyDOM: {
    settings: { handleDisabledFileLoadingAsSuccess: boolean };
  };
};

function isHappyDomWindow(window: Window): window is HappyDomWindow {
  return "happyDOM" in window;
}

vi.mock("@/styles.css?url", () => ({ default: "/src/styles.css" }));

const browserWindow = document.defaultView;
if (browserWindow && isHappyDomWindow(browserWindow)) {
  browserWindow.happyDOM.settings.handleDisabledFileLoadingAsSuccess = true;
}

expect.extend(matchers);

beforeEach(() => {
  // oxlint-disable-next-line no-empty-function -- Silence output so the assertions below can fail on calls.
  vi.spyOn(globalThis.console, "log").mockImplementation(() => {});
  // oxlint-disable-next-line no-empty-function -- Silence output so the assertions below can fail on calls.
  vi.spyOn(globalThis.console, "warn").mockImplementation(() => {});
  // oxlint-disable-next-line no-empty-function -- Silence output so the assertions below can fail on calls.
  vi.spyOn(globalThis.console, "error").mockImplementation(() => {});
});

afterEach(() => {
  try {
    expect(vi.mocked(globalThis.console.log)).not.toHaveBeenCalled();
    expect(vi.mocked(globalThis.console.warn)).not.toHaveBeenCalled();
    expect(vi.mocked(globalThis.console.error)).not.toHaveBeenCalled();
  } finally {
    cleanup();
  }
});
