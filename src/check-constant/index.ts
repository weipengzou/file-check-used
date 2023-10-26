import chalk from "chalk";
import { checkConstantsUsed } from "./checkConstantsUsed.js";

const { greenBright, blueBright, } = chalk;
const line = "================================";

// 检查常量
export const checkConstant = (targetFileUrl: string) => {
  const resArr = checkConstantsUsed(targetFileUrl);
  console.log(greenBright("✅ Done"));
  console.log(line);
  resArr.forEach(({ filePath, constants },) => {
    if (constants.length === 0) return;
    constants.forEach(val => console.log(`📁 ${blueBright(filePath)} ⚙️  ${greenBright(val)}`));
  })
  const unusedConstants = resArr.reduce((prev, cur) => prev + cur.constants.length, 0);// 累加记数
  console.log(`unused constants: `, unusedConstants);
  console.log(greenBright(`🔎 A total of ${unusedConstants} unused variables were found. Please confirm whether the listed variables are used.`));
  console.log(greenBright(`🔎 共找到 ${unusedConstants} 个未使用变量,请确认列出变量是否使用`));
  console.log(line);
}
