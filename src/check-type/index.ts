import chalk from "chalk";
import { checkTypesUsed } from "./checkTypesUsed.js";
import { readFileSync, writeFileSync } from "fs";
import { Project } from 'ts-morph';
import { getAnswers } from "./getAnswers.js";
const { greenBright, blueBright } = chalk;
const line = "================================";

// 检查类型接口
export const checkType = async (targetFileUrl: string) => {
  console.time("⏱️  ");
  const resArr = checkTypesUsed(targetFileUrl);
  console.log(greenBright("✅ Done"));
  console.log(line);
  resArr.forEach(({ filePath, type },) => {
    console.log(`📁 ${blueBright(filePath)} ⚙️  ${greenBright(type)}`)
  })
  const unusedCount = resArr.length;// 记数
  console.log(`unused interface: `, unusedCount);
  console.log(greenBright(`🔎 A total of ${unusedCount} unused interface were found. Please confirm whether the listed interface are used.`));
  console.log(greenBright(`🔎 共找到 ${unusedCount} 个未使用类型接口,请确认列出类型接口是否使用`));
  console.timeEnd("⏱️  ");
  console.log(line);
  const { isAutoDelete } = await getAnswers();
  if (!isAutoDelete) return;
  console.log('🚀 Automatically remove...');
  resArr.forEach(({ filePath, type }) => {

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath); // 替换为你的文件路径
    // 获取文件中所有的接口
    sourceFile.getInterfaces().forEach((interfaceDeclaration) => {
      const interfaceName = interfaceDeclaration.getName();
      // get del interface
      if (interfaceName === type) {
        const fullText = interfaceDeclaration.getFullText();
        const fileData = readFileSync(filePath, "utf-8").toString()
        // 筛选出来的都是已经没有任何调用了，删除这个 interface
        const replaceFileData = fileData.replace(new RegExp(fullText + '\n', 'g'), '');
        writeFileSync(filePath, replaceFileData, "utf-8");
        console.log(`🚀 Del interface`, greenBright(type));
      }
    });
  });
  console.log();
  console.log(`${greenBright("✅ Done")},Please check the modified files`);
}