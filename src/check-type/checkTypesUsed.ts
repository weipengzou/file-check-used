import { readFileSync } from "fs";
import { resolve } from "path";
import { getTargetTypeArr } from "./searchTypes.js";
import { __dirname, bottomBar } from "../constants/index.js";
import { getFilePaths } from "../utils/getFilePaths.js";

export const checkTypesUsed = () => {
  const resArr = getTargetTypeArr();
  const allArr = getFilePaths();// 目标文件下所有的文件数据
  bottomBar.log.write("🚅 Start");
  allArr.forEach((filePath, index) => {
    // 获取遍历文件的内容
    const waitDelArr: typeof resArr = [];
    resArr.forEach((item) => {
      const curFileData = readFileSync(filePath, "utf-8").toString();
      const isSelf = resolve(item.filePath) === resolve(filePath); //当前文件
      const match = curFileData.match(new RegExp(`\\b${item.type}\\b`, "g")) ?? [];
      const isUsed = match?.length >= (isSelf ? 2 : 1); // 是否在使用, 当前出现两次，其他文件一次
      isUsed && waitDelArr.push(item);
    });
    waitDelArr.forEach((item) => resArr.splice(resArr.indexOf(item), 1));
    const progress = (index / allArr.length) * 100;
    bottomBar.updateBottomBar(`🚀 Progress: ${progress.toFixed(2)}%`);
  });
  bottomBar.updateBottomBar("");
  return resArr;
};
