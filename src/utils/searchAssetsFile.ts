import { extname, join } from "path";
import { readdirSync, statSync } from "fs";
import { checkExtName } from "../constants.js";

type GetTargetFileArr = (targetFilePath: string) => {
  fileName: string; // 文件名
  filePath: string; // 文件相对路径
  fileSize: number; // 文件大小
}[];
/** 获取目标文件信息 */
export const getTargetFileArr: GetTargetFileArr = (targetFilePath) => {
  console.log(`📌 检查扩展名：`, checkExtName.join(" "));
  let resultArr: ReturnType<typeof getTargetFileArr> = [];
  // 遍历文件夹
  // 遍历文件目录
  const readDir = (path: string) => {
    readdirSync(path).forEach((fileName) => {
      if (/node_modules|dist|\.git/.test(path)) return;
      let filePath = join(path, fileName).replace(/\\/g, "/"); // 斜杠转换
      const info = statSync(filePath);
      // 递归目录
      if (info.isDirectory()) return readDir(filePath);
      // 检测拓展名
      if (!checkExtName.includes(extname(fileName))) return;
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
        fileSize: info.size,
      });
    });
  };
  readDir(targetFilePath);
  console.log("📁 文件总数：", resultArr.length);
  return resultArr;
};
