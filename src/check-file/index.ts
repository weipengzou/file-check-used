import chalk from "chalk";

import { checkFileUsed } from "./checkFileUsed.js";
import { bold, greenBright, line, yellowBright } from "../constants/index.js";

/** 检查文件 */
export const checkFile = (targetFileUrl: string) => {
  console.time("⏱️  ");
  const resArr = checkFileUsed(targetFileUrl);
  let totalSize: number = 0; // 总计大小
  console.log(greenBright("✅ Done"));
  console.log(line);
  resArr.forEach((item) => {
    const { filePath, fileName, fileSize } = item;
    const path = chalk.bold(filePath.replace(fileName, greenBright(fileName)));
    totalSize += fileSize;
    const sizeKB = +(fileSize / 1024).toFixed(1); // KB
    const size = sizeKB > 100 ? yellowBright(sizeKB) : sizeKB; // 超过100kb换成黄色提示
    console.log(`📁 ${path} ${size}KB`);
  });
  // check no unused
  const isNoUnused = resArr.length === 0;
  isNoUnused && console.log(greenBright("🍻 Great,There are no unused in your code"));
  if (isNoUnused) return;
  // response
  const countStyleText = yellowBright(bold(resArr.length));
  const totalSizeStr = yellowBright(bold((totalSize / Math.pow(1024, 2)).toFixed(2))); // MB
  console.log(`🔎 Unused constant: `, countStyleText);
  console.log(greenBright(`🔎 A total of ${countStyleText} unused files were found, totaling ${totalSizeStr} MB. Please confirm whether the listed files are used.`));
  console.timeEnd("⏱️  ");
};
