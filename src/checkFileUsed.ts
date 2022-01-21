import { getTargetFileArr } from './searchAssetsFile.js';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

let ui = new inquirer.ui.BottomBar();
export const checkFileUsed = (targetFileUrl: string) => {
  let assetsFileArr = getTargetFileArr(targetFileUrl);
  ui.log.write('🚅Start');

  // 遍历全部文件夹
  const readFile = (filePath: any) => {
    // 遍历文件目录
    fs.readdirSync(filePath).forEach((fileName) => {
      if (/node_modules|dist|\.git/.test(filePath)) return;

      const file = path.join(filePath, fileName);
      const info = fs.statSync(file);

      // 递归目录
      if (info.isDirectory()) readFile(file);
      // 文件
      else {
        // 《核心》代码😂
        // 获取遍历文件的内容
        let curFileData = fs.readFileSync(file, 'utf-8').toString();
        let waitDelArr = [];
        for (let i = 0; i < assetsFileArr.length; i++) {
          const item = assetsFileArr[i];
          if (new RegExp(item.file).test(curFileData)) {
            waitDelArr.push(item);
          }
        }
        for (let i = 0; i < waitDelArr.length; i++) {
          const element = waitDelArr[i];
          assetsFileArr.splice(assetsFileArr.indexOf(element), 1);
        }
        ui.updateBottomBar(`剩余数量：${assetsFileArr.length}个`);
      }
    });
  };
  readFile(__dirname);
  return assetsFileArr;
};
