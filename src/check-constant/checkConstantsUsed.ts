import inquirer from "inquirer";
import { readFileSync, readdirSync } from "fs";
import { resolve, join, extname } from "path";
import { isDirectory } from "../utils/getAnswers.js";
import { targetExtName } from "./constants.js";
import { getTargetConstantArr } from "./searchConstants.js";



const __dirname = resolve();
const ui = new inquirer.ui.BottomBar();

export const checkConstantsUsed = (targetFileUrl: string) => {
  const reasonConstantsArr = getTargetConstantArr(targetFileUrl); // 目标文件下所有的文件数据
  ui.log.write("🚅 Start");
  // 遍历全部文件夹
  const readFile = (filePath: any) => {
    // 遍历文件目录
    readdirSync(filePath).forEach((fileName) => {
      if (/node_modules|\.git/.test(filePath)) return;
      const file = join(filePath, fileName);
      // 递归目录
      if (isDirectory(file)) return readFile(file);
      // 检测拓展名
      if (!targetExtName.includes(extname(fileName))) return;
      // 获取遍历文件的内容
      const curFileData = readFileSync(file, "utf-8").toString();
      const waitDelArr: any[] = [];
      reasonConstantsArr.forEach((item) => item.constants.map(constant=>{
        if(resolve(item.filePath)=== file)return;// 除了当前文件以外
        const isUsed = new RegExp(constant).test(curFileData); // 是否在使用
        isUsed && waitDelArr.push(item);
      }));
      waitDelArr.forEach((item) => reasonConstantsArr.splice(reasonConstantsArr.indexOf(item), 1));
      ui.updateBottomBar(`剩余数量：${reasonConstantsArr.length}个`);
    });
  };
  readFile(__dirname);
  ui.updateBottomBar("");
  return reasonConstantsArr;
};
