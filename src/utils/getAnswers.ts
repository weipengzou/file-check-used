import inquirer from "inquirer";
import { statSync } from "fs";

export enum OPERATION_ENUM {
  STATIC_FILE = "static file",
  CONSTANTS = "constants",
  TYPES = "types",
  LINES = "lines",
}
type GetAnswersResponse = {
  targetFileUrl: string;
  operation: OPERATION_ENUM;
};
export const getAnswers = async () => {
  return await inquirer.prompt<GetAnswersResponse>([
    {
      type: "checkbox",
      name: "operation",
      message: "Select the operation you want to check",
      default: [
        OPERATION_ENUM.CONSTANTS,
        OPERATION_ENUM.TYPES,
        OPERATION_ENUM.STATIC_FILE,
      ],
      choices: [
        OPERATION_ENUM.CONSTANTS,
        OPERATION_ENUM.TYPES,
        OPERATION_ENUM.STATIC_FILE,
        OPERATION_ENUM.LINES,
      ],
    },
  ]);
};

export const isDirectory = (path: string) => statSync(path).isDirectory();
