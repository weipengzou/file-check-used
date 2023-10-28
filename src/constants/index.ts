import chalk from "chalk";
import inquirer from "inquirer";
import { resolve } from "path";

export const __dirname = resolve();
export const bottomBar = new inquirer.ui.BottomBar();
export const { greenBright, blueBright, yellowBright, bold } = chalk;
export const line = "================================";
export const gnoreReg = /node_modules|dist|\.git/;
