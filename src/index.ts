#! /usr/bin/env node
import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { getAnswers, checkFileUsed } from "./utils/index.js";
import path from "path";

const ui = new inquirer.ui.BottomBar();
const answers = await getAnswers();

if (!fs.existsSync(answers.targetFileUrl)) throw new Error(`❗ 错误： 本地目录 ${answers.targetFileUrl} 不存在！`);

const resultArr = checkFileUsed(answers.targetFileUrl);
console.log(chalk.greenBright("✅ 查询结果"));
const line = "================================";
console.log(line);
resultArr.forEach(({ filePath, fileName }) => console.log(`文件地址 ${chalk.bold(filePath.replace(fileName, chalk.greenBright(fileName)))}`));
console.log(line);
console.log(chalk.greenBright(`📊 共找到 ${resultArr.length} 个未使用文件`));
