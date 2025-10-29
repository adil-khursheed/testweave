import OpenAI from "openai";
import { TestStep } from "../types/playwright";
import { _env } from "../config/_env";

const openai = new OpenAI({
  apiKey: _env.AI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": _env.FRONTEND_URL,
    "X-Title": "TestWeave",
  },
});

interface AIResponse {
  steps: TestStep[];
}

export async function interpretTestPrompt(
  prompt: string,
  projectUrl: string
): Promise<TestStep[]> {
  try {
    const systemPrompt = `You are a QA automation expert. Convert natural language test descriptions into structured test steps.

Return a JSON object with a "steps" array containing test steps with this structure:
{
  "steps": [
    {
      "action": "navigate|click|type|verify|wait",
      "selector": "CSS selector or descriptive text",
      "value": "value to type (if applicable)",
      "expected": "expected result for verification"
    }
  ]
}

Rules:
- Start with navigate action to the base URL
- Use clear, specific selectors (prefer data-testid, then id, then class)
- Include verification steps
- Keep steps atomic and simple
- For type actions, always include the value field
- For verify actions, include expected field`;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Project URL: ${projectUrl}\n\nTest request: ${prompt}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const response: AIResponse = JSON.parse(content);

    if (!response.steps || !Array.isArray(response.steps)) {
      throw new Error("Invalid AI response format");
    }

    return response.steps;
  } catch (error) {
    console.error("AI interpretation error:", error);
    throw new Error(
      `Failed to interpret test prompt: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
