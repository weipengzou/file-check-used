import { readFileSync, readdirSync } from "fs";
import { resolve, join, extname } from "path";
import { isDirectory } from "../utils/getAnswers.js";
import { targetExtName } from "./constants.js";
import { getTargetConstantArr } from "./searchConstants.js";
import { __dirname, bottomBar, gnoreReg } from "../constants/index.js";

export const checkConstantsUsed = (targetFileUrl: string) => {
  const resArr = getTargetConstantArr(targetFileUrl); // 目标文件下所有的文件数据
  bottomBar.log.write("🚅 Start");
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
      const waitDelArr: any[] = [];
      resArr.forEach((item) => {
        const isSelf = resolve(item.filePath) === file; //当前文件
        const match = curFileData.match(new RegExp(`\\b${item.constant}\\b`, "g")) ?? [];
        const isUsed = match?.length >= (isSelf ? 2 : 1); // 是否在使用, 当前出现两次，其他文件一次
        isUsed && waitDelArr.push(item);
      });
      waitDelArr.forEach((item) => resArr.splice(resArr.indexOf(item), 1));
      const progress = (index / array.length) * 100;
      bottomBar.updateBottomBar(`🚀 Progress: ${progress.toFixed(2)}%`);
    });
  };
  readFile(__dirname);
  bottomBar.updateBottomBar("");
  return resArr;
};
