import { extname, join } from "path";
import { readFileSync, readdirSync, statSync } from "fs";
import { checkExtName, targetExtName } from "./constants.js";

type GetTargetFileArr = (targetFilePath: string) => {
  type: string; // 常量名
  filePath: string; // 文件相对路径
}[];
/** 获取目标常量信息 */
export const getTargetTypeArr: GetTargetFileArr = (targetFilePath) => {
  console.log(`📌 Check: `, checkExtName.join(" "));
  console.log(`📌 Target: `, targetExtName.join(" "));
  let resultArr: ReturnType<typeof getTargetTypeArr> = [];
  // 遍历文件目录
  const readDir = (path: string) => {
    readdirSync(path).forEach((fileName) => {
      if (/node_modules|dist|\.git/.test(path)) return;
      let filePath = join(path, fileName).replace(/\\/g, "/"); // 斜杠转换
      const fileInfo = statSync(filePath);
      // 递归目录
      if (fileInfo.isDirectory()) return readDir(filePath);
      // 检测拓展名
      if (!checkExtName.includes(extname(fileName))) return;
      // 获取当前文件的变量
      const curFileData = readFileSync(filePath, "utf-8").toString();
      // 使用正则表达式匹配以 export interface 开头的常量名，返回匹配结果数组
      const matchArr = curFileData.match(/(?<=\bexport\s+interface\s+)\w+/g) ?? [];
      // 文件
      matchArr.length > 0 &&
        matchArr.map(type =>
          resultArr.push({
            filePath,
            type,
          })
        )
    });
  };
  readDir(targetFilePath);
  console.log("📁 Count: ", resultArr.length);
  return resultArr;
};
