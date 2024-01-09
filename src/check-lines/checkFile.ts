import { readFileSync } from "fs";
import { getFilePaths } from "../utils/getFilePaths.js";
import { __dirname, bottomBar } from "../constants/index.js";
import { defaultTargetLines } from "./constants.js";
import path from "path";

type CheckFileLineFn = (
  targetLines: number,
  targetExtName: string
) => {
  fileName: string; // 文件名
  filePath: string; // 文件相对路径
  fileLines: number; // 文件相对路径
}[];
export const checkFileLine: CheckFileLineFn = (targetLines = defaultTargetLines, targetExtName) => {
  const source = `**/*\.${targetExtName}`;
  const paths = getFilePaths({ source }); // 目标文件下所有的文件数据
  const reasonList: ReturnType<CheckFileLineFn> = [];
  bottomBar.log.write(`find ${paths.length} files`);
  bottomBar.log.write("🚅 Start");
  // 遍历全部文件夹
  paths.forEach((filePath, index, array) => {
    if (!filePath) return;
    const fileName = path.basename(filePath);
    let curFileData: string = "";
    try {
      curFileData = readFileSync(filePath, "utf-8").toString();
    } catch (error) {
      console.log("error", error);
      console.log("error filePath", filePath);
    }
    const curLines = (curFileData.match(/\n/g) || []).length;
    if (curLines > targetLines) {
      reasonList.push({ filePath, fileName, fileLines: curLines });
    }

    const progress = (index / array.length) * 100;
    bottomBar.updateBottomBar(`🚀 Progress: ${progress.toFixed(2)}%`);
  });
  bottomBar.updateBottomBar("");
  return reasonList;
};
