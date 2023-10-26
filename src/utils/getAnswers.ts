import inquirer from "inquirer";
import { statSync } from "fs";

export enum OPERATION_ENUM {
  STATIC_FILE = 'static file',
  CONSTANTS = 'constants',
  TYPES = 'types',
}
type GetAnswersResponse = {
  targetFileUrl: string;
  operation: OPERATION_ENUM;
};
export const getAnswers = async (): Promise<GetAnswersResponse> => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "targetFileUrl",
      message: "Enter the file path to be checked",
      suffix: "Defaults to current path",
      default: ".",
    },
    {
      type: "list",
      name: "operation",
      message: "Select the operation you want to check",
      default: OPERATION_ENUM.CONSTANTS,
      choices: [
        {
          value: OPERATION_ENUM.CONSTANTS,
        },
        {
          value: OPERATION_ENUM.STATIC_FILE,
        },
        {
          value: OPERATION_ENUM.TYPES,
        },
      ],
    },
  ]);
};

export const isDirectory = (path: string) => statSync(path).isDirectory();
