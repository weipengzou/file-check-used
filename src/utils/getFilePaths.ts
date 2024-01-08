import fg from "fast-glob";
import { getIgnore } from "./getIgnore.js";

/** 获取目标地址下全部文件路径
 * @param {string} targetUrl 目标地址
 * @returns {string[]} 返回目标地址下排除 .gitignore 文件下的全部文件路径
 * @example
 * getFilePaths("./myDirectory");
 */
type Params = {
  targetUrl?: string;
  source?: string | string[];
  extIgnore?: string[];
};
const ig = getIgnore();
export const getFilePaths = ({source = "**/*.*"}: Params): string[] => {
  const reason = fg.sync(source, {
    dot: true,
    onlyFiles: true,
    ignore: ['node_modules','.git']
  });
  return ig.filter(reason);
};