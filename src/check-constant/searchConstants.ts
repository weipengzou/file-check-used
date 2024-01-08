import { readFileSync } from "fs";
import { getFilePaths } from "../utils/getFilePaths.js";

type GetTargetFileArr = (targetFilePath: string) => {
  constant: string; // 常量名
  filePath: string; // 文件相对路径
}[];
/** 获取目标常量信息 */
export const getTargetConstantArr: GetTargetFileArr = (targetFilePath) => {
  let resultArr: ReturnType<typeof getTargetConstantArr> = [];
  const files = getFilePaths({ source: "**/*.(ts|tsx|js|jsx)" });
  files.forEach((path) => {
    // 获取当前文件的变量
    const curFileData = readFileSync(path, "utf-8").toString();
    const matchArr = curFileData.match(/(?<=\bexport\s+(const|let|var)\s+)\w+/g) ?? [];
    if (matchArr.length === 0) return;
    // 文件
    matchArr.map((constant) => resultArr.push({ filePath: path, constant }));
  });
  console.log("📁 Count: ", resultArr.length);
  return resultArr;
};
