import inquirer from "inquirer";
import { defaultTargetLines } from "./constants.js";

type GetAnswersResponse = {
  targetLines: number;
  targetExtName: string;
};
export const getAnswers = async () => {
  return await inquirer.prompt<GetAnswersResponse>([
    {
      type: "number",
      name: "targetLines",
      message: "What is your threshold row count?",
      default: defaultTargetLines,
    },
    {
      type: "input",
      name: "targetExtName",
      message: "input check extname? (🔴 .ts 🟢 ts)",
      validate: (input) => /^[a-zA-Z]*$/.test(input), // 只接受英文字符的输入
    },
  ]);
};
