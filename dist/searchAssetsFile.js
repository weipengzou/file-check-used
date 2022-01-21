import path from 'path';
import fs from 'fs';
export const getTargetFileArr = (targetFilePath) => {
    let resultArr = [];
    // 遍历文件夹
    const readDir = (filePath) => {
        // 遍历文件目录
        fs.readdirSync(filePath).forEach((fileName) => {
            if (/node_modules|dist/.test(filePath))
                return;
            const file = path.join(filePath, fileName);
            const info = fs.statSync(file);
            // 递归目录
            if (info.isDirectory())
                readDir(file);
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