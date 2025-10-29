import { _env } from "../config/_env";
import { PlaywrightOptions } from "../types/playwright";

/**
 * Get Playwright options from environment variables
 */
export function getOptionsFromEnv(): PlaywrightOptions {
  return {
    headless: _env.PLAYWRIGHT_HEADLESS === "true",
    slowMo: parseInt(_env.PLAYWRIGHT_SLOW_MO || "0"),
    timeout: parseInt(_env.PLAYWRIGHT_TIMEOUT || "30000"),
    logConsole: _env.PLAYWRIGHT_LOG_CONSOLE === "true",
    recordVideo: _env.PLAYWRIGHT_RECORD_VIDEO === "true",
    videoDir: _env.PLAYWRIGHT_VIDEO_DIR || "./videos",
  };
}

/**
 * Check if running in Docker environment
 */
export function isDockerEnvironment(): boolean {
  try {
    return require("fs").existsSync("/.dockerenv");
  } catch {
    return false;
  }
}

/**
 * Get safe Playwright options for server environments
 */
export function getSafeServerOptions(): PlaywrightOptions {
  const isDocker = isDockerEnvironment();
  const isProduction = _env.NODE_ENV === "production";

  return {
    headless: true, // Always headless on servers
    slowMo: 0,
    timeout: 30000,
    recordVideo: !isProduction, // Record only in non-production
    continueOnFailure: false,
  };
}
