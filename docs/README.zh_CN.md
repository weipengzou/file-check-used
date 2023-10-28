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

</p>

一个检测项目中未使用的代码工具。

支持

- 资源素材
- 常量
- TS类型声明（支持自动删除）

方便去除未使用素材，降低项目打包的大小。

毫秒级速度，项目零侵入，大小仅3KB。

<p align='center'>
  <img alt="npm" src="https://img.shields.io/npm/dm/file-check-used">
  <img alt="npm" src="https://img.shields.io/npm/l/file-check-used">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/weipengzou/file-check-used">
</p>

## 安装

```shell
npm i -g file-check-used
```

## 用法

全局安装后在项目根目录中使用 `fcu`命令。

```shell
$ fcu
```

## 案例

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
