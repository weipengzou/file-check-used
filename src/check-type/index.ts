import chalk from "chalk";
import { checkTypesUsed } from "./checkTypesUsed.js";

const { greenBright, blueBright } = chalk;
const line = "================================";

// 检查类型接口
export const checkType = (targetFileUrl: string) => {
  const resArr = checkTypesUsed(targetFileUrl);
  console.log(greenBright("✅ Done"));
  console.log(line);
  resArr.forEach(({ filePath, type },) => {
    console.log(`📁 ${blueBright(filePath)} ⚙️  ${greenBright(type)}`)
  })
  const unusedCount = resArr.length;// 记数
  console.log(`unused interface: `, unusedCount);
  console.log(greenBright(`🔎 A total of ${unusedCount} unused interface were found. Please confirm whether the listed interface are used.`));
  console.log(greenBright(`🔎 共找到 ${unusedCount} 个未使用类型接口,请确认列出类型接口是否使用`));
  console.log(line);
}
