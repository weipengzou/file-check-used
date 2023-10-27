import inquirer from "inquirer";
import { statSync } from "fs";

export enum OPERATION_ENUM {
  DELETE = '0',
  SAVE = '1',
}
type GetAnswersResponse = {
  isAutoDelete: boolean
};
export const getAnswers = async (): Promise<GetAnswersResponse> => {
  return await inquirer.prompt([

    {
      type: 'confirm',
      name: 'isAutoDelete',
      message: 'Automatically remove listed type declarations?',
      suffix: '(Default true)',
      default: true
    }
  ]);
};

export const isDirectory = (path: string) => statSync(path).isDirectory();
