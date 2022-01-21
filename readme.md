### Introduce(介绍)

一个检测项目中未使用资源素材的工具，去除未使用素材，降低项目打包的大小。

A tool for detecting unused resource materials in a project to remove unused materials and reduce the package size of the project.

### Installation(安装)

```
npm install file-check-used -g
```

### Usage(使用)

```
fcu
```

全局安装后在项目中使用`fcu`命令。

### Example(案例)

新建一个测试项目

目录结构

```
>demo
    >assets
        >test
            imga.png
            imgb.png
        imga.png
        imgb.png
    index.html
```

```
<!-- index.html -->
<html>
  <img src="./assets/imgb.png" alt="" />
</html>
```

使用`fcu`命令

```
PS C:\Users\94474\Desktop\新建文件夹> fcu
? 输入要排查的文件地址 (assets)
? 输入要排查的文件地址 assets
? 文件操作 (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to p
? 文件操作 Search
Answers:{"targetFileUrl":"assets","operation":["Search"]}
[
  { file: 'assets/imga.png', name: 'imga.png' },
  { file: 'assets/imgb.png', name: 'imgb.png' },
  { file: 'assets/test/imga.png', name: 'imga.png' },
  { file: 'assets/test/imgb.png', name: 'imgb.png' }
]
文件总数： 4
🚅Start
imgb.png-----assets/imgb.png
🎯查询结果：
[
  { file: 'assets/imga.png', name: 'imga.png' },
  { file: 'assets/test/imga.png', name: 'imga.png' },
  { file: 'assets/test/imgb.png', name: 'imgb.png' }
]
PS C:\Users\94474\Desktop\新建文件夹>
```

### Todo List(待办)

- 检测项目中使用的别名  
  Detect aliases used in projects

### Github

https://github.com/weipengzou

### Contact

weipengzou19867636668@gmail.com
