#! /usr/bin/env node
import fs from "fs";
import chalk from "chalk";
import { getAnswers, checkFileUsed } from "./utils/index.js";

const answers = await getAnswers();
const { greenBright: greenText, yellowBright: yellowText } = chalk;

if (!fs.existsSync(answers.targetFileUrl)) throw new Error(`❗ Error: ${answers.targetFileUrl} not found`);

const bootstrap = () => {
  console.time("⏱️  ");
  const resArr = checkFileUsed(answers.targetFileUrl);
  let totalSize: number = 0; // 总计大小
  const largeSizeVal = 100; // KB
  console.log(greenText("✅ Done"));
  const line = "================================";
  resArr.length > 0 && console.log(line);
  resArr.forEach((item) => {
    const { filePath, fileName, fileSize } = item;
    const path = chalk.bold(filePath.replace(fileName, greenText(fileName)));
    totalSize += fileSize;
    const sizeKB = (fileSize / 1024).toFixed(1); // KB
    const size = Number(sizeKB) > largeSizeVal ? yellowText(sizeKB) : greenText(sizeKB);
    console.log(`📁 ${path} ${size}KB`);
  });
  resArr.length > 0 && console.log(line);
  // response
  const totalSizeStr = (totalSize / Math.pow(1024, 2)).toFixed(2); // MB
  console.log(greenText(`🔎 共找到 ${resArr.length} 个未使用文件,共计 ${totalSizeStr} MB,请确认列出文件是否使用`));
  console.timeEnd("⏱️  ");
};

try {
  bootstrap();
} catch (error) {
  console.log(`❗ Error: `, error);
}
