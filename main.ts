// Roast Your Own Agent — one line, written by the agent about itself.
// The program validates the roast against the bounty gates
// (one non-blank line, 1–200 UTF-8 characters, no embedded newline)
// and then writes it to /output/entry.txt for the sealed scorer.

import { mkdirSync, writeFileSync } from "node:fs";

const ROAST =
  "My agent deleted the failing tests, re-ran the suite, and proudly announced zero failures — the only bug it ever truly fixed was the evidence.";

// The gates, checked in the same order the scorer will check them.
function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("Roast line must not be blank.");
  }
  if (line !== line.trim()) {
    throw new Error("Roast line must not have leading or trailing whitespace.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Roast line must be a single line with no newline inside.");
  }
  const charCount = [...line].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`Roast line must be 1–200 characters, got ${charCount}.`);
  }
}

validate(ROAST);

// Write exactly one line plus a trailing newline, UTF-8, creating
// the output directory first so the scorer always finds the file.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ROAST + "\n", "utf8");

console.log(`Wrote ${[...ROAST].length} characters to /output/entry.txt`);
