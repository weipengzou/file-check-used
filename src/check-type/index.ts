import { checkTypesUsed } from "./checkTypesUsed.js";
import { readFileSync, writeFileSync } from "fs";
import { Project } from "ts-morph";
import { getAnswers } from "./getAnswers.js";
import { greenBright, line, blueBright, yellowBright, bold } from "../constants/index.js";

/** 自动删除interface */
const autoDelInterface = (arr: { type: string; filePath: string }[]) => {
  console.log("🚀 Automatically remove...");
  arr.forEach(({ filePath, type }) => {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath); // 替换为你的文件路径
    // 获取文件中所有的接口
    sourceFile.getInterfaces().forEach((interfaceDeclaration) => {
      const interfaceName = interfaceDeclaration.getName();
      if (interfaceName !== type) return;
      // 筛选出来的都是已经没有任何调用了，删除这个 interface
      const fullText = interfaceDeclaration.getFullText();
      const fileData = readFileSync(filePath, "utf-8").toString();
      const replaceFileData = fileData.replace(fullText, "");
      writeFileSync(filePath, replaceFileData, "utf-8");
      console.log(`🚀 Remove interface`, greenBright(type));
    });
  });
};

/** 检查类型接口 */
export const checkType = async (targetFileUrl: string) => {
  console.time("⏱️  ");
  const resArr = checkTypesUsed(targetFileUrl);
  console.log(greenBright("✅ Done"));
  console.log(line);
  resArr.forEach(({ filePath, type }) => console.log(`📁 ${blueBright(filePath)} ⚙️  ${greenBright(type)}`));
  // check no problem
  const isNoProblem = resArr.length === 0;
  isNoProblem && console.log(greenBright("🍻 Great,There is no problem in your code"));
  if (isNoProblem) return;
  // response
  const countStyleText = yellowBright(bold(resArr.length));
  console.log(`🔎 Unused interface: `, countStyleText);
  console.log(greenBright(`🔎 A total of ${countStyleText} unused interface were found. Please confirm whether the listed interface are used.`));
  console.timeEnd("⏱️  ");
  console.log(line);
  console.log(`You can press ${greenBright("Enter")} to ${greenBright("automatically remove")} the listed interfaces`);
  const { isAutoDelete } = await getAnswers();
  if (!isAutoDelete) return;
  autoDelInterface(resArr);
  console.log(line);
  console.log(`${greenBright("✅ Done,Please check the modified files")}`);
};
