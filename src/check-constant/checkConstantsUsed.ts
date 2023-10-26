import inquirer from "inquirer";
import { readFileSync, readdirSync } from "fs";
import { resolve, join, extname } from "path";
import { isDirectory } from "../utils/getAnswers.js";
import { targetExtName } from "./constants.js";
import { getTargetConstantArr } from "./searchConstants.js";



const __dirname = resolve();
const ui = new inquirer.ui.BottomBar();

export const checkConstantsUsed = (targetFileUrl: string) => {
  const resArr = getTargetConstantArr(targetFileUrl); // 目标文件下所有的文件数据
  ui.log.write("🚅 Start");
  // 遍历全部文件夹
  const readFile = (filePath: any) => {
    // 遍历文件目录
    readdirSync(filePath).forEach((fileName) => {
      if (/node_modules|dist|\.git/.test(filePath)) return;
      const file = join(filePath, fileName);
      // 递归目录
      if (isDirectory(file)) return readFile(file);
      // 检测拓展名
      if (!targetExtName.includes(extname(fileName))) return;
      // 获取遍历文件的内容
      const curFileData = readFileSync(file, "utf-8").toString();
      const waitDelArr: any[] = [];
      resArr.forEach((item) => {
        if (resolve(item.filePath) === file) return;// 除了当前文件以外
        const isUsed = (curFileData.match(new RegExp(item.constant, 'g')) ?? [])?.length > 1; // 是否在使用,出现两次及以上
        isUsed && waitDelArr.push(item);
      });
      waitDelArr.forEach((item) => resArr.splice(resArr.indexOf(item), 1));
      ui.updateBottomBar(`剩余数量：${resArr.length}个`);
    });
  };
  readFile(__dirname);
  ui.updateBottomBar("");
  return resArr;
};
