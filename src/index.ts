#!/usr/bin/env node
import fs from "fs";
import { checkFile } from './check-file/index.js'
import { OPERATION_ENUM, getAnswers, } from "./utils/index.js";
import { checkConstant } from "./check-constant/index.js";

const answers = await getAnswers();
const bootstrap = () => {
  if (!fs.existsSync(answers.targetFileUrl)) throw new Error(`${answers.targetFileUrl} not found`);
  console.time("⏱️  ");

  const isCheckFile = answers.operation === OPERATION_ENUM.FILE;
  const isCheckConst = answers.operation === OPERATION_ENUM.CONSTANTS;
  isCheckFile && checkFile(answers.targetFileUrl);
  isCheckConst && checkConstant(answers.targetFileUrl);
  console.timeEnd("⏱️  ");
};

try {
  bootstrap();
} catch (error) {
  console.log(`❗`, error);
}
