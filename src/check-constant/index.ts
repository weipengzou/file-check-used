import { greenBright, line, blueBright, yellowBright, bold } from "../constants/index.js";
import { checkConstantsUsed } from "./checkConstantsUsed.js";

/** 检查常量 */
export const checkConstant = () => {
  const resArr = checkConstantsUsed();
  console.log(greenBright("✅ Done"));
  console.log(`${line} Const ${line}`);
  resArr.forEach(({ filePath, constant }) => {
    console.log(`📁 ${blueBright(filePath)} ⚙️  ${greenBright(constant)}`);
  });
  // check no problem
  const isNoProblem = resArr.length === 0;
  isNoProblem && console.log(greenBright("🍻 Great,There is no problem in your code"));
  if (isNoProblem) return;
  // response
  const countStyleText = yellowBright(bold(resArr.length));
  console.log(`🔎 Unused constant: `, countStyleText);
  console.log(greenBright(`🔎 A total of ${countStyleText} unused constant were found. Please confirm whether the listed constant are used.`));
};
