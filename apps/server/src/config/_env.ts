import { config } from "dotenv";

config();

export const _env = Object.freeze({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DB_URL: process.env.TEST_WEAVE_DB_URL,
  AI_API_KEY: process.env.AI_API_KEY,
  PLAYWRIGHT_HEADLESS: process.env.PLAYWRIGHT_HEADLESS,
  PLAYWRIGHT_SLOW_MO: process.env.PLAYWRIGHT_SLOW_MO,
  PLAYWRIGHT_TIMEOUT: process.env.PLAYWRIGHT_TIMEOUT,
  PLAYWRIGHT_LOG_CONSOLE: process.env.PLAYWRIGHT_LOG_CONSOLE,
  PLAYWRIGHT_RECORD_VIDEO: process.env.PLAYWRIGHT_RECORD_VIDEO,
  PLAYWRIGHT_VIDEO_DIR: process.env.PLAYWRIGHT_VIDEO_DIR,
});
