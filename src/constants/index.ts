import chalk from "chalk";
import inquirer from "inquirer";
import { resolve } from "path";

export const __dirname = resolve();
export const bottomBar = new inquirer.ui.BottomBar();
export const { greenBright, blueBright, yellowBright, bold } = chalk;
export const line = "================================";
export const gnoreReg = /node_modules|dist|\.git/;

export const imgExtName = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".bmp", ".ico", ".webp"];
export const videoExtName = [".mp4", ".avi", ".mov", ".wmv", ".mkv", ".flv", ".f4v", ".m4v", ".rmvb", ".rm", ".3gp", ".dat", ".ts", ".mts", ".vob"];
export const configExtName = [".yml", ".yaml", ".xml", ".csv", ".ini", ".toml", ".properties", ".json", ".json5", ".hjson"];
export const codeExtName = [
  "js",
  "ts",
  "jsx",
  "tsx", // JavaScript and TypeScript
  "java", // Java
  "py", // Python
  "rb", // Ruby
  "go", // Go
  "rs", // Rust
  "c",
  "cpp",
  "h",
  "hpp", // C and C++
  "php", // PHP
  "cs", // C#
  "m",
  "swift", // Objective-C and Swift
  "kt",
  "kts", // Kotlin
  "dart", // Dart
  "scala", // Scala
  "groovy", // Groovy
  "lua", // Lua
  "r", // R
  "sh",
  "bash", // Shell script
  "pl",
  "pm", // Perl
  "sql", // SQL
  "html",
  "css", // HTML and CSS
  "json",
  "xml",
  "yaml",
  "yml", // Data formats
  "md",
  "markdown", // Markdown
];
