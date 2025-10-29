export interface TestStep {
  action:
    | "navigate"
    | "click"
    | "type"
    | "fill"
    | "verify"
    | "assert"
    | "wait"
    | "scroll"
    | "hover"
    | "select"
    | "screenshot";
  selector?: string;
  value?: string;
  expected?: string;
}

export interface TestResult {
  step: number;
  action: string;
  status: "passed" | "failed";
  duration: number;
  screenshot: string | null;
  error: string | null;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  successRate: string;
}

export interface ExecutionResult {
  results: TestResult[];
  summary: TestSummary;
}

export interface PlaywrightOptions {
  headless?: boolean;
  slowMo?: number;
  devtools?: boolean;
  timeout?: number;
  recordVideo?: boolean;
  videoDir?: string;
  logConsole?: boolean;
  continueOnFailure?: boolean;
  viewport?: {
    width: number;
    height: number;
  } | null;
  userAgent?: string;
}

export interface BrowserLaunchOptions {
  headless: boolean;
  slowMo: number;
  devtools: boolean;
  args: string[];
}

export interface ContextOptions {
  viewport: {
    width: number;
    height: number;
  } | null;
  recordVideo?: {
    dir: string;
    size: {
      width: number;
      height: number;
    };
  };
  userAgent?: string;
}
