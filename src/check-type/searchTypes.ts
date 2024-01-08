import { readFileSync } from "fs";
import { getFilePaths } from "../utils/getFilePaths.js";

export type GetTargetFileArr = (targetFilePath: string) => {
  type: string; // 常量名
  filePath: string; // 文件相对路径
}[];
/** 获取目标常量信息 */
export const getTargetTypeArr: GetTargetFileArr = (targetFilePath) => {
  let resultArr: ReturnType<typeof getTargetTypeArr> = [];
  const files = getFilePaths({ source: "**/*.(ts|js)" });
  files.forEach((path) => {
    // 获取当前文件的变量
    const curFileData = readFileSync(path, "utf-8").toString();
    const matchArr = curFileData.match(/(?<=\bexport\s+interface\s+)\w+/g) ?? [];
    if (matchArr.length === 0) return;
    // 文件
    matchArr.map((type) => resultArr.push({ filePath: path, type }));
  });
  console.log("📁 Count: ", resultArr.length);
  return resultArr;
};
