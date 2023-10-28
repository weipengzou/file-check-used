import { greenBright, line, blueBright, yellowBright, bold } from "../constants/index.js";
import { checkConstantsUsed } from "./checkConstantsUsed.js";

/** 检查常量 */
export const checkConstant = (targetFileUrl: string) => {
  console.time("⏱️  ");
  const resArr = checkConstantsUsed(targetFileUrl);
  console.log(greenBright("✅ Done"));
  console.log(line);
  resArr.forEach(({ filePath, constant }) => {
    console.log(`📁 ${blueBright(filePath)} ⚙️  ${greenBright(constant)}`);
  });
  // check no unused
  const isNoUnused = resArr.length === 0;
  isNoUnused && console.log(greenBright("🍻 Great,There are no unused in your code"));
  if (isNoUnused) return;
  else console.log(line);
  // response
  const countStyleText = yellowBright(bold(resArr.length));
  console.log(`🔎 Unused constant: `, countStyleText);
  console.log(greenBright(`🔎 A total of ${countStyleText} unused constant were found. Please confirm whether the listed constant are used.`));
  console.timeEnd("⏱️  ");
};
