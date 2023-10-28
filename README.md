<!-- TODO
添加 文件行数 检测 如列出 .ts（可配置） 文件 > 300（可配置） 行 -->
<h1>
  <p align='center'>
    File-check-used
  </p>
</h1>

<p align='center'>
  <a href="https://github.com/weipengzou/file-check-used/blob/main/README.md" target="_blank">English</a>
  <span>|</span>
  <a href="https://github.com/weipengzou/file-check-used/blob/main/docs/README.zh_CN.md" target="_blank">中文</a>
</p>

A tool for detecting unused code in projects.

support

- Resource materials
- constant
- TS type declaration (support Automatically remove)

Remove unused assets and reduce the size of the project package.
Millisecond-level speed, zero intrusion into the project, and a size of only 3KB.

<p align='center'>
  <img alt="npm" src="https://img.shields.io/npm/dm/file-check-used">
  <img alt="npm" src="https://img.shields.io/npm/l/file-check-used">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/weipengzou/file-check-used">
</p>

## Install

```shell
npm i -g file-check-used
```

## Usage

Use the `fcu` command in the project root directory after the global installation.

```shell
$ fcu
```

## Cases

```shell
$ fcu
? Enter the file path to be checkedDefaults to current path (.) 


? Enter the file path to be checkedDefaults to current path .
? Select the operation you want to check 
❯ constants 
  static file 
? Select the operation you want to check constants
📌 Check:  .js .jsx .ts .tsx
📌 Target:  .js .jsx .ts .tsx
📁 Count:  15
🚅 Start
✅ Done
================================
📁 src/components/layout/seoData.ts ⚙️  seoData
🔎 Unused constants:  1
🔎 A total of 1 unused variables were found. Please confirm whether the listed variables are used.
⏱️  : 299.249ms
```

## License

MIT
