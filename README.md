<h1>
  <p align='center'>
    File-check-used
  </p>
</h1>

<p align='center'>
  <a href="https://github.com/weipengzou/file-check-used/blob/main/README.md" target="_blank">English</a>
  <span>|</span>
  <a href="https://github.com/weipengzou/file-check-used/blob/main/README.zh_CN.md" target="_blank">中文</a>
</p>

A tool to detect unused asset assets in a project.
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
? 输入要排查的文件地址（默认为当前地址） (.)
? 输入要排查的文件地址（默认为当前地址） .
📌 Check:  .svg .gif .png .jpg .jpeg .mp4 .mov
📌 Target:  .js .jsx .ts .tsx .css .sass .scss .less .md .mdx .html
📁 File Count:  32
🚅 Start
✅ Done
================================
📁 public/images/icons/download-qr-code.png 24.2KB
📁 public/images/icons/records-icon-28px.png 1.1KB
📁 public/images/icons/records-icon-512px.png 23.3KB
📁 public/images/index/2Graphs.png 22.1KB
📁 public/images/index/Feed_Card3.png 24.0KB
📁 public/images/index/Gallery colorful.png 25.6KB
📁 public/images/index/Green_Graph.png 8.2KB
📁 public/images/index/Horizontal_Graphs.png 11.0KB
📁 public/images/index/Radial_Graphs.png 12.0KB
📁 public/images/index/Radial_Progress.png 31.8KB
📁 public/images/index/Vertical_Graph.png 29.3KB
📁 public/images/index/phone.png 167.4KB
📁 public/images/index/undraw_hooked_re_vl59.svg 10.7KB
📁 public/images/index/undraw_investor_update_re_qnuu.svg 15.5KB
📁 public/images/index/undraw_mobile_posts_re_bpuw.svg 10.4KB
📁 public/vercel.svg 1.1KB
================================
🔎 共找到 16 个未使用文件,共计 0.41 MB,请确认列出文件是否使用
⏱️  : 48.262ms
```

## License

MIT
