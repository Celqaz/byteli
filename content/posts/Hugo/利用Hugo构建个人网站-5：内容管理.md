---
title: 利用Hugo构建个人网站-5：内容管理
tags: [blog101, Hugo, 建站]
date: 2020-02-16T09:55:00.000+08:00
description: "网站上线后，forestry将为我们提供简单而高效的内容管理方案。"
categories: ["Hugo创建个人博客指南"]
keywords: [hugo, 个人博客, 建站教程, hugo教程, 个人博客, 独立博客, 网站建站, 零基础建站, netlify, forestry, GitHub, CMS, 内容管理平台]
---

## 1. 内容管理——配置forestry

现在，我们的网站框架已经搭设好，我们再进行最后一步设置，就可以随时编辑和发布文章了。

### 1.1 连接Forestry与Github

1. 访问[forestry](https://forestry.io/)，在登录选项中，选择GitHub登录。

2. 登录成功后，点击"Add site"，并选择Hugo及最新的版本号。

   ![1forestry添加网站-1.png](https://i.loli.net/2020/02/16/GAJjqs2c71fr953.png)

3. 在"git provider"中，选择"GitHub"。之后选择我们放置网站的仓库。

   ![2forestry添加网站-2.png](https://i.loli.net/2020/02/16/KGjbXeEcs95VMuY.png)

4. 稍作等待，forestry就已经读取并同步我们的内容。我们可以新建、修改、发布文章。

   ![3forestry用户界面.png](https://i.loli.net/2020/02/16/18pUC4yMoRNJ7s3.png)

### 1.2 通过Front Matter进行内容管理

这里需要额外提醒的一点是Front matter，这个是我们博客的头文件，用于储存每篇博文的诸如：标签、分类、关键字、摘要等额外信息，既方便了我们对文章的分类及管理，又可以提升网站访问的体验。

对于Meme主题，作者在主题项目页即详细列出来Meme主题支持的Front matter 字段及说明，我们可以参考。不同的主题，可能有所差异，需要我们参照项目的说明。

![4Meme支持的Front Matter.png](https://i.loli.net/2020/02/16/2Ieylc9oRnpPAkr.png)

我们点击左侧侧边栏的Front matter，从已经创建的博文中，构建一个通用的模板。

![5forestry新建Front Matter模板.png](https://i.loli.net/2020/02/16/EkZAQalGgeFzHdn.png)

这里，我添加了如下的字段：

| 序号 | 字段        | 说明                                                         |
| ---- | ----------- | ------------------------------------------------------------ |
| 1    | title       | 文章标题                                                     |
| 2    | date        | 文章创建日期                                                 |
| 3    | tags        | 文章标签                                                     |
| 4    | categories  | 文章分类                                                     |
| 5    | summary     | 文章摘要，为访客提供文章的简要信息。<br />为空则抓取文章正文的文字。 |
| 6    | description | 文章表述，主要为搜索引擎提供文章的内容信息                   |

![6我构建的Front Matter模板.png](https://i.loli.net/2020/02/16/rQh8DSbK14iHCEG.png)

### 1.3 更新&预览&发布文章

#### 1.3.1 更新

我们点击"helloworld"这篇博文，应用这个模板文件。

![7更改博文的Front Matter模板.png](https://i.loli.net/2020/02/16/C9RtGwBA2kpaJ6u.png)

这里注意，右上角的眼镜左侧，我们现在"Draft"为"off"，即表示我们保存后就会在网站上进行更新。

如果你还不想发布，可以将模式点回"On"，这样"Save"选项就会变成"Save Draft"。

![8保存编辑后的草稿文件.png](https://i.loli.net/2020/02/16/iPzATCEh3HXlIc7.png)

#### 1.3.2 预览

保存草稿之后，如果我们需要即时预览的话，可以点击左侧的"settings"-"Previews"-"Start Preview"，当显示"SERVER: READY"的信息后，即表明我们的即时预览功能已经开启。

![9开启forestry的即时预览功能.png](https://i.loli.net/2020/02/16/4GciUXfx3B1ZTzR.png)

#### 1.3.3 发布

我们预览后，没有问题的话，就可以将"Draft"的状态设置为"Off"，并点击Sav，之后，forestry就会将我们的更改提交上去，我们刷新下自己的网站就能看到更新了。更新后的结果如下：

![10网站完成.png](https://i.loli.net/2020/02/16/6Q5OznhLc4iV17E.png)

---


至此，我们已经完成了一个网站的创建，它包括独立的域名、安全的https、分类的页面及方便的内容管理。现在，你已经可以开始着手发布你的第一篇博文了 ✧\*｡٩(ˊᗜˋ*)و✧\*

如果还想进一步个性化自己的网站，我们将在下一节给出两种简单有效的路径。