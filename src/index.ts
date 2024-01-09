#!/usr/bin/env node
import fs from "fs";
import { checkFile } from "./check-file/index.js";
import { OPERATION_ENUM, getAnswers } from "./utils/index.js";
import { checkConstant } from "./check-constant/index.js";
import { checkType } from "./check-type/index.js";
import { checkLines } from "./check-lines/index.js";

const answers = await getAnswers();
const bootstrap = () => {
  // if (!fs.existsSync(answers.targetFileUrl)) throw new Error(`${answers.targetFileUrl} not found`);
  const isCheckFile = answers.operation === OPERATION_ENUM.STATIC_FILE;
  const isCheckConst = answers.operation === OPERATION_ENUM.CONSTANTS;
  const isCheckType = answers.operation === OPERATION_ENUM.TYPES;
  const isCheckLines = answers.operation === OPERATION_ENUM.LINES;
  isCheckFile && checkFile();
  isCheckConst && checkConstant();
  isCheckType && checkType();
  isCheckLines && checkLines();
};

try {
  bootstrap();
} catch (error) {
  console.log(`❗`, error);
}
