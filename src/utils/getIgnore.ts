import ignore from "ignore";
import fs from "fs";
import fg from "fast-glob";
import { __dirname } from "../constants/index.js";

export const getIgnore = () => {
  const ig = ignore.default();
  const gitignoreFiles = fg.sync("**/.gitignore", {
    dot: true,
    onlyFiles: true,
    ignore: ['node_modules', '.git']
  });
  gitignoreFiles.map((item) => ig.add(fs.readFileSync(item).toString()));
  return ig;
};
