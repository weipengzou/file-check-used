import inquirer from "inquirer";
import { statSync } from "fs";

type GetAnswersResponse = {
  isAutoDelete: boolean;
};
export const getAnswers = async (): Promise<GetAnswersResponse> => {
  return await inquirer.prompt([
    {
      type: "confirm",
      name: "isAutoDelete",
      message: "Automatically remove listed type declarations?",
      default: true,
    },
  ]);
};

export const isDirectory = (path: string) => statSync(path).isDirectory();
