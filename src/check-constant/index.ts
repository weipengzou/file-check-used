import chalk from "chalk";
import { checkConstantsUsed } from "./checkConstantsUsed.js";

const { greenBright, blueBright } = chalk;
const line = "================================";

// 检查常量
export const checkConstant = (targetFileUrl: string) => {
  console.time("⏱️  ");
  const resArr = checkConstantsUsed(targetFileUrl);
  console.log(greenBright("✅ Done"));
  console.log(line);
  resArr.forEach(({ filePath, constant },) => {
    console.log(`📁 ${blueBright(filePath)} ⚙️  ${greenBright(constant)}`)
  })
  const unusedCount = resArr.length;// 记数
  console.log(`unused constants: `, unusedCount);
  console.log(greenBright(`🔎 A total of ${unusedCount} unused variables were found. Please confirm whether the listed variables are used.`));
  console.log(greenBright(`🔎 共找到 ${unusedCount} 个未使用变量,请确认列出变量是否使用`));
  console.timeEnd("⏱️  ");
  console.log(line);
}
