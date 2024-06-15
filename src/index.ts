#!/usr/bin/env node
import { checkFile } from "./check-file/index.js";
import { OPERATION_ENUM, getAnswers } from "./utils/index.js";
import { checkConstant } from "./check-constant/index.js";
import { checkType } from "./check-type/index.js";
import { checkLines } from "./check-lines/index.js";

/** 启动 */
const bootstrap = async () => {
  const answers = await getAnswers();
  const isCheckFile = answers.operation.includes(OPERATION_ENUM.STATIC_FILE);
  const isCheckConst = answers.operation.includes(OPERATION_ENUM.CONSTANTS);
  const isCheckType = answers.operation.includes(OPERATION_ENUM.TYPES);
  const isCheckLines = answers.operation.includes(OPERATION_ENUM.LINES);
  isCheckLines && await checkLines();
  isCheckFile && checkFile();
  isCheckConst && checkConstant();
  isCheckType && checkType();
};

try {
  bootstrap();
} catch (error) {
  console.log(`❗`, error);
}
