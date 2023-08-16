import { join } from "path";
import fs from "fs";

type GetTargetFileArr = (targetFilePath: string) => {
  fileName: string; // 文件名
  filePath: string; // 文件相对路径
}[];
/** 获取目标文件信息 */
export const getTargetFileArr: GetTargetFileArr = (targetFilePath) => {
  let resultArr: ReturnType<typeof getTargetFileArr> = [];
  // 遍历文件夹
  // 遍历文件目录
  const readDir = (path: string) =>
    fs.readdirSync(path).forEach((fileName) => {
      if (/node_modules|dist/.test(path)) return;
      let filePath = join(path, fileName).replace(/\\/g, "/"); // 斜杠转换
      const info = fs.statSync(filePath);
      // 递归目录
      if (info.isDirectory()) {
        readDir(filePath);
        return;
      }
      // paths 别名转换
      // Object.entries(paths)?.forEach(([alias, aliasPath]) => {
      //   let handleAlias = alias.replace("*", "");
      //   let handleAliasPath = aliasPath?.[0]?.replace("*", "");
      //   if (filePath.includes(handleAliasPath)) {
      //     filePath = filePath.replace(handleAliasPath, handleAlias);
      //   }
      // });
      // 文件
      resultArr.push({
        filePath,
        fileName,
      });
    });
  readDir(targetFilePath);
  console.log("文件总数：", resultArr.length);
  return resultArr;
};
