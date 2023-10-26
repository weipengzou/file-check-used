#!/usr/bin/env node
import fs from "fs";
import { checkFile } from './check-file/index.js'
import { OPERATION_ENUM, getAnswers, } from "./utils/index.js";
import { checkConstant } from "./check-constant/index.js";
import { checkType } from "./check-type/index.js";

const answers = await getAnswers();
const bootstrap = () => {
  if (!fs.existsSync(answers.targetFileUrl)) throw new Error(`${answers.targetFileUrl} not found`);
  console.time("⏱️  ");

  const isCheckFile = answers.operation === OPERATION_ENUM.STATIC_FILE;
  const isCheckConst = answers.operation === OPERATION_ENUM.CONSTANTS;
  const isCheckType = answers.operation === OPERATION_ENUM.TYPES;
  isCheckFile && checkFile(answers.targetFileUrl);
  isCheckConst && checkConstant(answers.targetFileUrl);
  isCheckType && checkType(answers.targetFileUrl);
  console.timeEnd("⏱️  ");
};

try {
  bootstrap();
} catch (error) {
  console.log(`❗`, error);
}
