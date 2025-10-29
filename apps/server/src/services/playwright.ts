import { chromium, Browser, BrowserContext, Page, Locator } from "playwright";
import * as path from "path";
import * as fs from "fs/promises";
import {
  BrowserLaunchOptions,
  ContextOptions,
  ExecutionResult,
  PlaywrightOptions,
  TestResult,
  TestStep,
  TestSummary,
} from "../types/playwright";

// ============================================
// PlaywrightService Class
// ============================================

export class PlaywrightService {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private options: Required<PlaywrightOptions>;

  constructor(options: PlaywrightOptions = {}) {
    this.options = {
      headless: options.headless !== undefined ? options.headless : true,
      slowMo: options.slowMo || 0,
      devtools: options.devtools || false,
      timeout: options.timeout || 30000,
      recordVideo: options.recordVideo || false,
      videoDir: options.videoDir || "./videos",
      logConsole: options.logConsole || false,
      continueOnFailure: options.continueOnFailure || false,
      viewport:
        options.viewport !== undefined
          ? options.viewport
          : { width: 1920, height: 1080 },
      userAgent: options.userAgent || "",
    };
  }

  /**
   * Initialize the browser, context, and page
   */
  public async initialize(): Promise<void> {
    // Browser launch options
    const launchOptions: BrowserLaunchOptions = {
      headless: this.options.headless,
      slowMo: this.options.slowMo,
      devtools: this.options.devtools,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", // Prevent memory issues
      ],
    };

    // Additional args for headed mode
    if (!this.options.headless) {
      launchOptions.args.push(
        "--start-maximized",
        "--disable-blink-features=AutomationControlled"
      );
    }

    console.log(
      `Launching browser in ${this.options.headless ? "HEADLESS" : "HEADED"} mode...`
    );

    this.browser = await chromium.launch(launchOptions);

    // Context options
    const contextOptions: ContextOptions = {
      viewport: this.options.viewport,
    };

    // Add video recording if enabled
    if (this.options.recordVideo) {
      contextOptions.recordVideo = {
        dir: this.options.videoDir,
        size: { width: 1280, height: 720 },
      };
    }

    // Add custom user agent if provided
    if (this.options.userAgent) {
      contextOptions.userAgent = this.options.userAgent;
    }

    this.context = await this.browser.newContext(contextOptions);
    this.page = await this.context.newPage();

    // Set default timeout
    this.page.setDefaultTimeout(this.options.timeout);

    // Log console messages from the page (useful for debugging)
    if (this.options.logConsole) {
      this.page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    }

    // Log page errors
    this.page.on("pageerror", (error) =>
      console.error("PAGE ERROR:", error.message)
    );
  }

  /**
   * Execute a single test step
   */
  public async executeStep(
    step: TestStep,
    stepNumber: number,
    screenshotDir: string
  ): Promise<TestResult> {
    if (!this.page) {
      throw new Error("Page not initialized. Call initialize() first.");
    }

    const startTime = Date.now();
    const result: TestResult = {
      step: stepNumber,
      action: step.action,
      status: "passed",
      duration: 0,
      screenshot: null,
      error: null,
    };

    try {
      console.log(
        `Step ${stepNumber}: ${step.action} - ${step.selector || step.value || ""}`
      );

      switch (step.action.toLowerCase()) {
        case "navigate":
          await this.handleNavigate(step);
          break;

        case "click":
          await this.handleClick(step);
          break;

        case "type":
        case "fill":
          await this.handleType(step);
          break;

        case "verify":
        case "assert":
          await this.handleVerify(step);
          break;

        case "wait":
          await this.handleWait(step);
          break;

        case "scroll":
          await this.handleScroll();
          break;

        case "hover":
          await this.handleHover(step);
          break;

        case "select":
          await this.handleSelect(step);
          break;

        case "screenshot":
          // Screenshot will be taken at the end
          console.log("✓ Screenshot will be captured");
          break;

        default:
          throw new Error(`Unknown action: ${step.action}`);
      }

      // Take screenshot after successful step
      const screenshotPath = path.join(screenshotDir, `step-${stepNumber}.png`);
      await this.page.screenshot({
        path: screenshotPath,
        fullPage: false,
      });
      result.screenshot = screenshotPath;
    } catch (error) {
      result.status = "failed";
      result.error = error instanceof Error ? error.message : String(error);
      console.error(`✗ Step ${stepNumber} failed:`, result.error);

      // Take error screenshot
      try {
        const errorScreenshotPath = path.join(
          screenshotDir,
          `step-${stepNumber}-error.png`
        );
        await this.page.screenshot({
          path: errorScreenshotPath,
          fullPage: true,
        });
        result.screenshot = errorScreenshotPath;
      } catch (screenshotError) {
        console.error("Failed to take error screenshot:", screenshotError);
      }
    }

    result.duration = Date.now() - startTime;
    return result;
  }

  /**
   * Handle navigation action
   */
  private async handleNavigate(step: TestStep): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");

    const url = step.value || step.selector;
    if (!url) throw new Error("Navigate action requires a URL");

    await this.page.goto(url, {
      waitUntil: "networkidle",
      timeout: this.options.timeout,
    });
    console.log(`✓ Navigated to ${url}`);
  }

  /**
   * Handle click action
   */
  private async handleClick(step: TestStep): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");
    if (!step.selector) throw new Error("Click action requires a selector");

    const element = await this.findElement(step.selector);
    await element.click();
    await this.page.waitForTimeout(1000); // Wait for animations
    console.log(`✓ Clicked on ${step.selector}`);
  }

  /**
   * Handle type/fill action
   */
  private async handleType(step: TestStep): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");
    if (!step.selector) throw new Error("Type action requires a selector");
    if (!step.value) throw new Error("Type action requires a value");

    const element = await this.findElement(step.selector);
    await element.fill(step.value);
    console.log(`✓ Typed "${step.value}" into ${step.selector}`);
  }

  /**
   * Handle verify/assert action
   */
  private async handleVerify(step: TestStep): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");
    if (!step.selector) throw new Error("Verify action requires a selector");

    const element = await this.findElement(step.selector);
    const text = await element.textContent();

    if (step.expected && text && !text.includes(step.expected)) {
      throw new Error(`Expected "${step.expected}" but found "${text}"`);
    }
    console.log(`✓ Verified ${step.selector}`);
  }

  /**
   * Handle wait action
   */
  private async handleWait(step: TestStep): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");

    const waitTime = parseInt(step.value || "2000");
    await this.page.waitForTimeout(waitTime);
    console.log(`✓ Waited ${waitTime}ms`);
  }

  /**
   * Handle scroll action
   */
  private async handleScroll(): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");

    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    console.log("✓ Scrolled to bottom");
  }

  /**
   * Handle hover action
   */
  private async handleHover(step: TestStep): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");
    if (!step.selector) throw new Error("Hover action requires a selector");

    const element = await this.findElement(step.selector);
    await element.hover();
    console.log(`✓ Hovered over ${step.selector}`);
  }

  /**
   * Handle select action
   */
  private async handleSelect(step: TestStep): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");
    if (!step.selector) throw new Error("Select action requires a selector");
    if (!step.value) throw new Error("Select action requires a value");

    await this.page.selectOption(step.selector, step.value);
    console.log(`✓ Selected "${step.value}" in ${step.selector}`);
  }

  /**
   * Find element using multiple strategies
   */
  private async findElement(selector: string): Promise<Locator> {
    if (!this.page) throw new Error("Page not initialized");

    // Strategy 1: Try as CSS selector
    try {
      await this.page.waitForSelector(selector, { timeout: 10000 });
      return this.page.locator(selector).first();
    } catch {
      // Strategy 2: Try as text content
      try {
        const textLocator = this.page.getByText(selector, { exact: false });
        await textLocator.first().waitFor({ timeout: 5000 });
        return textLocator.first();
      } catch {
        // Strategy 3: Try as placeholder
        try {
          const placeholderLocator = this.page.getByPlaceholder(selector);
          await placeholderLocator.first().waitFor({ timeout: 5000 });
          return placeholderLocator.first();
        } catch {
          // Strategy 4: Try as label
          try {
            const labelLocator = this.page.getByLabel(selector);
            await labelLocator.first().waitFor({ timeout: 5000 });
            return labelLocator.first();
          } catch {
            // Strategy 5: Try as button role
            try {
              const buttonLocator = this.page.getByRole("button", {
                name: selector,
              });
              await buttonLocator.first().waitFor({ timeout: 5000 });
              return buttonLocator.first();
            } catch {
              // Strategy 6: Try as alt text
              const altLocator = this.page.getByAltText(selector);
              await altLocator.first().waitFor({ timeout: 5000 });
              return altLocator.first();
            }
          }
        }
      }
    }
  }

  /**
   * Get the current page URL
   */
  public getPageUrl(): string {
    if (!this.page) throw new Error("Page not initialized");
    return this.page.url();
  }

  /**
   * Get the page title
   */
  public async getPageTitle(): Promise<string> {
    if (!this.page) throw new Error("Page not initialized");
    return await this.page.title();
  }

  /**
   * Take a screenshot
   */
  public async takeScreenshot(
    path: string,
    fullPage: boolean = false
  ): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");
    await this.page.screenshot({ path, fullPage });
  }

  /**
   * Cleanup browser resources
   */
  public async cleanup(): Promise<void> {
    if (this.page) {
      await this.page
        .close()
        .catch((err) => console.error("Error closing page:", err));
    }
    if (this.context) {
      await this.context
        .close()
        .catch((err) => console.error("Error closing context:", err));
    }
    if (this.browser) {
      await this.browser
        .close()
        .catch((err) => console.error("Error closing browser:", err));
    }
    console.log("Browser closed");
  }
}

// ============================================
// Main Test Execution Function
// ============================================

/**
 * Execute a complete test with multiple steps
 * @param steps - Array of test steps to execute
 * @param testRunId - Unique identifier for this test run
 * @param options - Playwright configuration options
 * @returns Execution results with summary
 */
export async function executeTest(
  steps: TestStep[],
  testRunId: string,
  options: PlaywrightOptions = {}
): Promise<ExecutionResult> {
  const service = new PlaywrightService(options);
  const screenshotDir = path.join(__dirname, "../screenshots", testRunId);

  // Create screenshot directory
  await fs.mkdir(screenshotDir, { recursive: true });

  const results: TestResult[] = [];

  try {
    await service.initialize();

    for (let i = 0; i < steps.length; i++) {
      const result = await service.executeStep(steps[i], i + 1, screenshotDir);
      results.push(result);

      // Stop execution if a step fails (unless continueOnFailure is true)
      if (result.status === "failed" && !options.continueOnFailure) {
        console.log("Stopping test execution due to failure");
        break;
      }
    }
  } catch (error) {
    console.error("Test execution error:", error);
    throw error;
  } finally {
    await service.cleanup();
  }

  // Calculate summary
  const summary: TestSummary = {
    total: results.length,
    passed: results.filter((r) => r.status === "passed").length,
    failed: results.filter((r) => r.status === "failed").length,
    successRate: "0",
  };
  summary.successRate = ((summary.passed / summary.total) * 100).toFixed(2);

  return { results, summary };
}

export default {
  executeTest,
  PlaywrightService,
};
