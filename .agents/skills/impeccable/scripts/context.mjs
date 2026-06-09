#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const productNames = ["PRODUCT.md", "Product.md", "product.md"];
const designNames = ["DESIGN.md", "Design.md", "design.md"];
const fallbackDirs = [".agents/context", "docs"];

function firstExisting(dir, names) {
  for (const name of names) {
    const file = path.join(dir, name);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

function resolveContextDir() {
  if (firstExisting(cwd, [...productNames, ...designNames])) return cwd;

  for (const rel of fallbackDirs) {
    const dir = path.resolve(cwd, rel);
    if (firstExisting(dir, [...productNames, ...designNames])) return dir;
  }

  if (process.env.IMPECCABLE_CONTEXT_DIR) {
    const dir = path.isAbsolute(process.env.IMPECCABLE_CONTEXT_DIR)
      ? process.env.IMPECCABLE_CONTEXT_DIR
      : path.resolve(cwd, process.env.IMPECCABLE_CONTEXT_DIR);
    if (firstExisting(dir, [...productNames, ...designNames])) return dir;
  }

  return cwd;
}

const contextDir = resolveContextDir();
const productPath = firstExisting(contextDir, productNames);
const designPath = firstExisting(contextDir, designNames);

if (!productPath) {
  console.log("NO_PRODUCT_MD");
  process.exit(0);
}

console.log(`# Impeccable Context\n`);
console.log(`contextDir: ${path.relative(cwd, contextDir) || "."}`);
console.log(`productPath: ${path.relative(cwd, productPath)}`);
console.log("");
console.log(fs.readFileSync(productPath, "utf8"));

if (designPath) {
  console.log("\n---\n");
  console.log(`designPath: ${path.relative(cwd, designPath)}`);
  console.log("");
  console.log(fs.readFileSync(designPath, "utf8"));
}

