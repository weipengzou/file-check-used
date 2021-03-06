import { getTargetFileArr } from './searchAssetsFile.js';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

let ui = new inquirer.ui.BottomBar();
export const checkFileUsed = (targetFileUrl: string) => {
  let assetsFileArr = getTargetFileArr(targetFileUrl);
  ui.log.write('ðStart');

  // éåå¨é¨æä»¶å¤¹
  const readFile = (filePath: any) => {
    // éåæä»¶ç®å½
    fs.readdirSync(filePath).forEach((fileName) => {
      if (/node_modules|dist|\.git/.test(filePath)) return;

      const file = path.join(filePath, fileName);
      const info = fs.statSync(file);

      // éå½ç®å½
      if (info.isDirectory()) readFile(file);
      // æä»¶
      else {
        // ãæ ¸å¿ãä»£ç ð
        // è·åéåæä»¶çåå®¹
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
        ui.updateBottomBar(`å©ä½æ°éï¼${assetsFileArr.length}ä¸ª`);
      }
    });
  };
  readFile(__dirname);
  return assetsFileArr;
};
