import { readFileSync } from "fs";
import { resolve } from "path";
import { getTargetTypeArr } from "./searchTypes.js";
import { __dirname, bottomBar } from "../constants/index.js";
import { getFilePaths } from "../utils/getFilePaths.js";

export const checkTypesUsed = () => {
  type ValueType = ReturnType<typeof getTargetTypeArr>[0];
  const resSet = new Set<ValueType>(getTargetTypeArr()); // 目标文件下所有的文件数据
  const allArr = getFilePaths();// 目标文件下所有的文件数据
  bottomBar.updateBottomBar("🚅 Start");
  allArr.forEach((filePath, index) => {
    // 获取遍历文件的内容
    const curFileData = readFileSync(filePath, "utf-8").toString();
    const waitDelSet = new Set<ValueType>();
    resSet.forEach((item) => {
      const regex = new RegExp(`\\b${item.type}\\b`, "g");
      const isSelf = resolve(item.filePath) === resolve(filePath); //当前文件
      const match = curFileData.match(regex) ?? [];
      const isUsed = match?.length >= (isSelf ? 2 : 1); // 是否在使用, 当前出现两次，其他文件一次
      isUsed && waitDelSet.add(item);
    });
    waitDelSet.forEach((item) => resSet.delete(item));
    const progress = (index / allArr.length) * 100;
    bottomBar.updateBottomBar(`🚀 Progress: ${progress.toFixed(2)}%`);
  });
  bottomBar.updateBottomBar("");
  return Array.from(resSet);
};