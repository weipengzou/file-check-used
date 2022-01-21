import path from 'path';
import fs from 'fs';
export const getTargetFileArr = (targetFilePath: any) => {
  let resultArr: {
    name: string;
    file: string;
  }[] = [];

  // 遍历文件夹
  const readDir = (filePath: any) => {
    // 遍历文件目录
    fs.readdirSync(filePath).forEach((fileName) => {
      if (/node_modules|dist/.test(filePath)) return;
      let file = path.join(filePath, fileName);
      file = file.replace(/\\/g, '/'); // 斜杠转换
      const info = fs.statSync(file);
      // 递归目录
      if (info.isDirectory()) readDir(file);
      // 文件
      else {
        resultArr.push({
          file: file,
          name: fileName,
        });
      }
    });
  };
  readDir(targetFilePath);
  console.log('文件总数：', resultArr.length);

  return resultArr;
};
