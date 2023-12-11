import fs from "fs";
import fg from "fast-glob";
import path from "path";

/** 获取目标地址下全部文件路径
 * @param {string} targetUrl 目标地址
 * @returns {string[]} 返回目标地址下排除 .gitignore 文件下的全部文件路径
 * @example
 * getFilePaths("./myDirectory");
 */
type Params = {
  targetUrl: string;
  source?: string | string[];
  extIgnore?: string[];
};
export const getFilePaths = (params: Params): string[] => {
  const { source = "**/*.*", targetUrl = process.cwd(), extIgnore = [] } = params;
  // 获取绝对路径
  const absolutePath = path.resolve(targetUrl);

  // 获取 gitignore 文件下的所有排除文件路径
  const getAllIgnoreItem = (): string[] => {
    const ignorePath = path.join(absolutePath, ".gitignore");
    const isExist = fs.existsSync(ignorePath);
    const ignore = isExist ? fs.readFileSync(ignorePath, "utf-8").split("\n") : [];
    const gitignorePath = fg.sync(`${absolutePath}/**/.gitignore`, {
      ignore: ignore,
      dot: true,
      onlyFiles: true,
    });
    const reason = gitignorePath.flatMap((ignorePath) => {
      const fileData = fs.readFileSync(ignorePath, "utf-8").split("\n").filter(Boolean);
      return fileData.map((item) => {
        let res = item;
        // 判断是否 / 开头
        const isStartWithSlash = item.startsWith("/");
        // 判断是否 / 结尾
        const isEndWithSlash = item.endsWith("/");
        // 将 res的 / 开头换成 执行命令的相对路径
        if (isStartWithSlash) res = path.join(targetUrl, item.slice(1));
        // 将 res的 / 结尾换成 /**/*.*
        if (isEndWithSlash) res = `${res}**/*.*`;
        return res;
      });
    });
    return [...reason, ...ignore];
  };
  const allIgnoreItem = getAllIgnoreItem(); // 排除类似 build 或者 cache 文件

  // 获取所有文件路径
  const reason = fg.sync(source, {
    ignore: allIgnoreItem,
    dot: true,
    onlyFiles: true,
  });
  return reason;
};
