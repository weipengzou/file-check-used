#! /usr/bin/env node
import fs from 'fs';
import path from 'path';
// import { program } from 'commander';
import inquirer from 'inquirer';
import { getTargetFileArr } from './searchAssetsFile.js';
let ui = new inquirer.ui.BottomBar();
// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();
let getAnswers = async () => {
    return await inquirer.prompt([
        {
            type: 'input',
            message: '输入要排查的文件地址',
            name: 'targetFileUrl',
            default: 'assets',
        },
        {
            type: 'checkbox',
            name: 'operation',
            message: '文件操作',
            default: ['查询'],
            choices: [
                {
                    value: '查询',
                },
                {
                    value: '删除',
                    disabled: true,
                },
            ],
        },
    ]);
};
let answers = await getAnswers();
ui.log.write('Answers:' + JSON.stringify(answers));
if (!fs.existsSync(answers.targetFileUrl))
    throw new Error('Error❗: 本地目录' + answers.targetFileUrl + '不存在！');
const checkFileUsed = () => {
    let assetsFileArr = getTargetFileArr(answers.targetFileUrl);
    ui.log.write('🚅Start');
    // 遍历全部文件夹
    const readFile = (filePath) => {
        // 遍历文件目录
        fs.readdirSync(filePath).forEach((fileName) => {
            if (/node_modules|dist|\.git/.test(filePath))
                return;
            const file = path.join(filePath, fileName);
            const info = fs.statSync(file);
            // 递归目录
            if (info.isDirectory())
                readFile(file);
            // 文件
            else {
                let curFileData = fs.readFileSync(file, 'utf-8').toString();
                for (let i = 0; i < assetsFileArr.length; i++) {
                    const item = assetsFileArr[i];
                    if (new RegExp(item.name).test(curFileData)) {
                        // ui.updateBottomBar(`剩余数量：${assetsFileArr.length}个`);
                        console.log(item.name + '-----' + item.file);
                        assetsFileArr = assetsFileArr.filter((filterItem) => filterItem != item);
                        continue;
                    }
                }
            }
        });
    };
    readFile(__dirname);
    return assetsFileArr;
};
const resultArr = checkFileUsed();
answers.operation.includes('查询') && console.log(resultArr);
if (answers.operation.includes('删除')) {
    resultArr.forEach((element) => {
        return fs.unlinkSync(element.file);
    });
}
