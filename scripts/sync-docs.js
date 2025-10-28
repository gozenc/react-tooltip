#!/usr/bin/env node
import { mkdir, readFile, writeFile, rm, cp } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const htmlSource = path.join(rootDir, "docs.html");
const distSource = path.join(rootDir, "dist");
const docsDir = path.join(rootDir, "docs");
const docsDist = path.join(docsDir, "dist");
const docsIndex = path.join(docsDir, "index.html");

async function run() {
  // Create docs directory
  await mkdir(docsDir, { recursive: true });

  // Copy docs.html to docs/index.html
  const html = await readFile(htmlSource, "utf8");
  await writeFile(docsIndex, html, "utf8");

  // Remove old dist folder in docs and copy fresh one
  await rm(docsDist, { recursive: true, force: true });
  await cp(distSource, docsDist, { recursive: true });

  console.log("✅ Docs synced successfully!");
  console.log("   docs.html -> docs/index.html");
  console.log("   dist/ -> docs/dist/");
}

run().catch((error) => {
  console.error("❌ Failed to sync docs:", error);
  process.exitCode = 1;
});
