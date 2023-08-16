import inquirer from "inquirer";
import fs from "fs";

type GetAnswersResponse = {
  targetFileUrl: string;
  operation: string[];
};

export const getAnswers = async (): Promise<GetAnswersResponse> => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "targetFileUrl",
      message: "输入要排查的文件地址",
      suffix: "（默认为当前地址）",
      default: ".",
    },
    // {
    //   type: "checkbox",
    //   name: "operation",
    //   message: "文件操作",
    //   default: ["Search"],
    //   choices: [
    //     {
    //       value: "Search",
    //     },
    //     {
    //       value: "Delete",
    //       disabled: true,
    //     },
    //   ],
    // },
  ]);
};

export const isDirectory = (path: string) => fs.statSync(path).isDirectory();
