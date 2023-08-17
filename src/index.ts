#! /usr/bin/env node
import fs from "fs";
import chalk from "chalk";
import { getAnswers, checkFileUsed } from "./utils/index.js";

const answers = await getAnswers();

if (!fs.existsSync(answers.targetFileUrl)) throw new Error(`❗ 错误：本地目录 ${answers.targetFileUrl} 不存在！`);

const bootstrap = () => {
  console.time("⏱️共耗时");
  const resultArr = checkFileUsed(answers.targetFileUrl);
  let totalSize = 0; // MB
  console.log(chalk.greenBright("✅ 查询结果"));
  const line = "================================";
  console.log(line);
  resultArr.forEach(({ filePath, fileName, fileSize }) => {
    const size = (fileSize / 1024).toFixed(2); // KB
    const path = filePath.replace(fileName, chalk.greenBright(fileName));
    totalSize = totalSize + fileSize;
    console.log(`文件地址 ${chalk.bold(path)} ${size}KB`);
  });
  console.log(line);
  console.timeEnd("⏱️共耗时");
  console.log(chalk.greenBright(`🔎 共找到 ${resultArr.length} 个未使用文件，共计 ${(totalSize / 1024).toFixed(2)} MB，请确认列出文件是否使用`));
};

try {
  bootstrap();
} catch (error) {
  console.log(`❗ 错误：`, error);
}
