import { extname, join } from "path";
import { readdirSync, statSync } from "fs";
import { checkExtName } from "./constants.js";
import { gnoreReg } from "../constants/index.js";

type GetTargetFileArr = (targetFilePath: string) => {
  fileName: string; // 文件名
  filePath: string; // 文件相对路径
  fileSize: number; // 文件大小
}[];
/** 获取目标文件信息 */
export const getTargetFileArr: GetTargetFileArr = (targetFilePath) => {
  let resultArr: ReturnType<typeof getTargetFileArr> = [];
  // 遍历文件目录
  const readDir = (path: string) => {
    readdirSync(path).forEach((fileName) => {
      if (gnoreReg.test(path)) return;
      let filePath = join(path, fileName).replace(/\\/g, "/"); // 斜杠转换
      const fileInfo = statSync(filePath);
      // 递归目录
      if (fileInfo.isDirectory()) return readDir(filePath);
      // 检测拓展名
      if (!checkExtName.includes(extname(fileName))) return;

      // 文件
      resultArr.push({
        filePath,
        fileName,
        fileSize: fileInfo.size,
      });
    });
  };
  readDir(targetFilePath);
  console.log("📁 File Count: ", resultArr.length);
  return resultArr;
};
