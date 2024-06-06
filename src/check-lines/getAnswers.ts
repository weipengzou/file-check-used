import inquirer from "inquirer";
import { defaultTargetLines, TS_EXTNAME, extnameList } from "./constants.js";

type GetAnswersResponse = {
  targetLines: number;
  targetExtName: string[];
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
      type: "checkbox",
      name: "targetExtName",
      message: "What is your target file extension?",
      // 默认全选
      default: TS_EXTNAME,
      choices: extnameList.map((value) => ({ name: value, value })),
    },
  ]);
};