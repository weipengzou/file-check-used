import { greenBright, line, blueBright, yellowBright, bold } from "../constants/index.js";
import { checkFileLine } from "./checkFile.js";
import { getAnswers } from "./getAnswers.js";

/** 检查 lines */
export const checkLines = async () => {
  const { targetLines, targetExtName } = await getAnswers();

  const resArr = checkFileLine(targetLines, targetExtName);
  console.log(greenBright("✅ Done"));
  console.log(line);
  resArr.forEach(({ fileLines, filePath }) => {
    console.log(`📁 ${blueBright(filePath)} ⚙️  ${greenBright(fileLines)} lines`);
  });
  // check no problem
  const isNoProblem = resArr.length === 0;
  isNoProblem && console.log(greenBright("🍻 Great,There is no problem in your code"));
  if (isNoProblem) return;

  // response
  const countStyleText = yellowBright(bold(resArr.length));
  console.log(`🔎 Total file: `, countStyleText);
};
