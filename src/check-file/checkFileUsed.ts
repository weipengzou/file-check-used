import { readFileSync, readdirSync } from "fs";
import { join, extname } from "path";
import { isDirectory } from "../utils/getAnswers.js";
import { getTargetFileArr } from "./searchAssetsFile.js";
import { targetExtName } from "./constants.js";
import { __dirname, bottomBar, gnoreReg } from "../constants/index.js";

export const checkFileUsed = () => {
  type ValueType = ReturnType<typeof getTargetFileArr>[0];
  const resSet = new Set<ValueType>(getTargetFileArr()); // 目标文件下所有的文件数据
  bottomBar.updateBottomBar("🚅 Start");
  // 遍历全部文件夹
  const readFile = (filePath: any) => {
    // 遍历文件目录
    readdirSync(filePath).forEach((fileName, index, array) => {
      if (gnoreReg.test(filePath)) return;
      const file = join(filePath, fileName);
      // 递归目录
      if (isDirectory(file)) return readFile(file);
      // 检测拓展名
      if (!targetExtName.includes(extname(fileName))) return;
      // 获取遍历文件的内容
      const curFileData = readFileSync(file, "utf-8").toString();
      const waitDelSet = new Set<ValueType>();
      resSet.forEach((item) => {
        const isUsed = curFileData.includes(fileName); // 是否在使用
        isUsed && waitDelSet.add(item);
      });
      waitDelSet.forEach((item) => resSet.delete(item));
      const progress = (index / array.length) * 100;
      bottomBar.updateBottomBar(`🚀 Progress: ${progress.toFixed(2)}%`);
    });
  };
  readFile(__dirname);
  bottomBar.updateBottomBar("");
  return Array.from(resSet);
};