---
title: 利用Hugo构建个人网站-3：内容中转
tags: [blog101, Hugo, 建站]
date: 2020-02-15T22:51:26.000+08:00
summary: "在完成本地网站的搭建后，我们在这一步中将把GitHub作为我们的内容中转平台，用来在线上存储我们的网站内容。"
categories: ["Hugo创建个人博客指南"]
keywords: [hugo, 个人博客, 建站教程, hugo教程, 个人博客, 独立博客, 网站建站, 零基础建站, netlify, forestry, GitHub]
comments: true
---



## 1. 内容中转——配置GitHub

### 1.1 向GitHub同步网站

这里我们使用cmd命令行工具，向Github推送我们的更新，现在还不用理解这些代码：

```c#
e:
cd hugo
cd byteli-local //定位到博客根目录，对我而言，及"E:\Hugo\byteli-local"
git init //初始化git
git add . //添加所有文件，最后有一个"."，表示选择所有文件
git commit -m "byteli" //编写提交的备注，方便之后自己查看版本
git remote add origin https://github.com/Celqaz/byteli.git //输入GitHub仓库的地址 
git push origin master //发出推送命令
```

最后一步向我们GitHub仓库推送成功的反馈结果大致如下：

![3.1master.png](https://i.loli.net/2020/02/15/OtMP3lGScK6CEds.png)

现在，我们再次打开GitHub的仓库页面，可以看到我们的项目已经成功上传。

![3.2upload to github.png](https://i.loli.net/2020/02/15/HpJmaBbTuyjZF59.png)

至此，我们就完成了本地网站的上传。