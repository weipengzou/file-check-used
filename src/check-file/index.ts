import chalk from "chalk";

import { checkFileUsed } from "./checkFileUsed.js";

const { greenBright, yellowBright } = chalk;
const line = "================================";

// 检查文件
export const checkFile = (targetFileUrl: string) => {
  const resArr = checkFileUsed(targetFileUrl);
  let totalSize: number = 0; // 总计大小
  const largeSizeVal = 100; // KB
  console.log(greenBright("✅ Done"));
  resArr.length > 0 && console.log(line);
  resArr.forEach((item) => {
    const { filePath, fileName, fileSize } = item;
    const path = chalk.bold(filePath.replace(fileName, greenBright(fileName)));
    totalSize += fileSize;
    const sizeKB = (fileSize / 1024).toFixed(1); // KB
    const size = Number(sizeKB) > largeSizeVal ? yellowBright(sizeKB) : sizeKB;
    console.log(`📁 ${path} ${size}KB`);
  });
  resArr.length > 0 && console.log(line);
  // response
  const totalSizeStr = (totalSize / Math.pow(1024, 2)).toFixed(2); // MB
  console.log(greenBright(`🔎 A total of ${resArr.length} unused files were found, totaling ${totalSizeStr} MB. Please confirm whether the listed files are used.`));
  console.log(greenBright(`🔎 共找到 ${resArr.length} 个未使用文件,共计 ${totalSizeStr} MB,请确认列出文件是否使用`));
}