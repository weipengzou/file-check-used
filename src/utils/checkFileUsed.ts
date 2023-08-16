import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { isDirectory } from "./getAnswers.js";
import { getTargetFileArr } from "./searchAssetsFile.js";

const __dirname = path.resolve();
const ui = new inquirer.ui.BottomBar();

export const checkFileUsed = (targetFileUrl: string) => {
  const reasonFileArr = getTargetFileArr(targetFileUrl); // 目标文件下所有的文件数据

  ui.log.write("🚅 开始查询");
  // 遍历全部文件夹
  const readFile = (filePath: any) => {
    // 遍历文件目录
    fs.readdirSync(filePath).forEach((fileName) => {
      if (/node_modules|dist|\.git/.test(filePath)) return;
      const file = path.join(filePath, fileName);
      // 递归目录
      if (isDirectory(file)) return readFile(file);
      // 获取遍历文件的内容
      const curFileData = fs.readFileSync(file, "utf-8").toString();
      const waitDelArr: any[] = [];
      reasonFileArr.forEach((item) => {
        const isUsed = new RegExp(item.fileName).test(curFileData); // 是否在使用
        isUsed && waitDelArr.push(item);
      });
      waitDelArr.forEach((item) => reasonFileArr.splice(reasonFileArr.indexOf(item), 1));
      ui.updateBottomBar(`剩余数量：${reasonFileArr.length}个`);
    });
  };
  readFile(__dirname);
  ui.updateBottomBar("");
  return reasonFileArr;
};
