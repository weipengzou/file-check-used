import { statSync } from "fs";
import { imgExtName, videoExtName } from "../constants/index.js";
import { getIgnore } from "../utils/getIgnore.js";
import fg from "fast-glob";

type GetTargetFileArr = (targetFilePath?: string) => {
  fileName: string; // 文件名
  filePath: string; // 文件相对路径
  fileSize: number; // 文件大小
}[];
/** 获取目标文件信息 */
export const getTargetFileArr: GetTargetFileArr = () => {
  const path = `**/*.(${imgExtName.join("|")})`;
  console.log(`path: `, path);
  const files = fg.sync(path, { dot: true, onlyFiles: true, ignore: ["node_modules", ".git"] });
  const ig = getIgnore();
  const responseFiles = ig.filter(files).map((item) => {
    const fileInfo = statSync(item);
    return {
      filePath: item,
      fileName: item,
      fileSize: fileInfo.size,
    };
  });

  return responseFiles;
};
