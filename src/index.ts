#! /usr/bin/env node
import fs from 'fs';
import path from 'path';
// import { program } from 'commander';
import inquirer from 'inquirer';
import { checkFileUsed } from './checkFileUsed.js';

let ui = new inquirer.ui.BottomBar();
// ui.log.write('current environment: dev');

let getAnswers = async (): Promise<{
  targetFileUrl: string;
  operation: string[];
}> => {
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
      default: ['Search'],
      choices: [
        {
          value: 'Search',
        },
        {
          value: 'Delete',
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

const resultArr = checkFileUsed(answers.targetFileUrl);

if (answers.operation.includes('Search')) {
  ui.log.write('🎯查询结果：');
  console.log(resultArr);
}
if (answers.operation.includes('Delete')) {
  resultArr.forEach((element) => {
    return fs.unlinkSync(element.file);
  });
}
