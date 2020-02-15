---
title: 利用Hugo构建个人网站-2：生成网页
tags: [blog101, Hugo, 建站]
date: 2020-02-15T22:27:26.000+08:00
summary: "此前我们我们已经完成了搭建网站的所有前期准备，现在，让我们开始创造吧。"
categories: ["Hugo创建个人博客指南"]
---

## 1. 生成网页——配置Hugo

### 1.1 搭建网站框架

####  1.1.1 创建框架文件

再一次打开cmd命令行工具，通过定位到我们此前解压Hugo的文件夹中。

```c#
cd e: //先且换到E盘
cd hugo //再进入Hugo文件夹，此时定位于"E:\Hugo"
```

这时，通过一行语句就可以创建我们个人网站本地的初始文件，下文的"byteli-local"可以替换为你的网站名称。

```c#
hugo new site byteli-local //创建网站根目录，byteli-local可以替换为你的网站名称
```

![2.1hugo创建本地网站.png](https://i.loli.net/2020/02/15/aTcevfpJyX2HrUj.png)

此时，本地网站初始化成功，我们进入"E:\Hugo"文件夹，可以看到多了一个"byteli-local"的文件夹，里面即是已经创建好的网站初始文件。

![2-2网站初始化.png](https://i.loli.net/2020/02/15/EsBCwfcrixz9ymR.png)

相关文件夹及文件的说明如下，其中，我们初期只需要了解content、themes和config.html三个文件的位置即可：

| 子目录名称  | 功能                                                         |
| ----------- | ------------------------------------------------------------ |
| archetypes  | 存放新文章默认的模板                                         |
| content     | 存放所有`Markdown`格式的文章                                 |
| data        | 存放数据文件                                                 |
| layouts     | 存放自定义的版式，可为空                                     |
| static      | 存放图像、CNAME、css、js等资源，发布后该目录下所有资源将处于网页根目录 |
| themes      | 存放下载的主题                                               |
| config.toml | `Hugo`配置文档                                               |



#### 1.1.2 创建并编辑博文内容

这一步的目的主要是为了之后我们可以在本地预览效果。

##### 1.1.2.1 创建博文文件

首先，打开cmd命令行工具，进入我们的网站根目录，对我而言，即"E:\Hugo\byteli"。

```c#
cd e: //进入E盘
cd hugo //再进入E盘下的Hugo文件夹
cd byteli-local //替换为你创建的网站文件夹名称
```

然后在命令行工具中输入如下代码，创建两篇博文，其中包含一篇我们自定义位置的博文：

```c#
hugo new about.md //创建一篇名称为about的文章,格式为Markdown（后缀为.md）
hugo new posts/helloworld.md //在posts文件夹中，创建一篇名称为helloworld的文章,格式为Markdown（后缀为.md）
```

命令行反馈在"E:\Hugo\byteli\content"目录下，创建了我们需要的文件。

![2-3博文创建成功.png](https://i.loli.net/2020/02/15/fsYoTwqR8ikGnDd.png)

##### 1.1.2.2 编辑博文文件

我们创建的所有文件，默认状态均是草稿（draft），所以不会在网站中展示，需要我们简单修改。

上一步出现的content目录，即为我们博客文本文件首先存放的地方，它主要存放的是Markdown文件，Markdown为我们提供了可能是最简洁方便的文本编辑方法。

关于Markdown的介绍和使用，可以参考[这里](https://www.runoob.com/markdown/md-tutorial.html)。对于这类文件的编辑，我们可以选择[Typora](https://typora.io/)这样一款轻量的Markdown文本编辑器进行编辑。

我们使用Typora打开about.md文件, 将"draft: true"这句删去，写点内容后，我们即可保存并关闭。

![2-4about.png](https://i.loli.net/2020/02/15/WOelNSuUnXgYmrQ.png)

同样的，我们打开"posts"文件下的"helloworld.md"，同样删去"draft: true"，写些内容后保存关闭。

至此，我们就完成了网站内容的创建。

### 1.2 安装网站主题

#### 1.2.1 主题选择

你可以在[Hugo官方网站主题库](https://themes.gohugo.io/)中选择主题，你可以点击每套主题左侧的"Demo"进行预览，选择自己喜欢的主题，该网站上的所有主题都是开源，可以放心使用，随意更换。

这里，我选择了[reuixiy](https://io-oi.me/)编写的[MemE](https://themes.gohugo.io/hugo-theme-meme/)：一方面，这套主题具有丰富的拓展性，我觉得完全符合我对博客网站的需求；另一方面作者写有中文注释，对于之后希望自定义的人来说，也提供了一定方便。你可以选择自己更喜欢的主题。

#### 1.2.2 主题安装

每个主题下方的说明中，第一项都会说明如何安装主题，主要分为两种：

1. 下载主题文件，解压到本地

   这个只需要到每个项目的GitHub页，下载安装包，并解压至"themes/主题名称"文件夹下即可，适用于由于网络原因，git传输效果太差的情况。

2. git同步

   1. git clone 语句

      这个和第一种方法类似，只是通过命令行实现会更cool一些😎，当然，是在网络好的情况下。

   2. git submodule add语句（推荐）

      这种方法会将这个主题作为一个你网站项目子模块，这样的优势在于：

      1. 你无法上传对这些文件的更改，所以你的网站主题内部会更稳定，不会因为你的改动引发整个站点的崩溃。这里需要指出的是，在这种情况下，主题创作者都会单独提供一个独立的样式文件（通常是css文件）中，让你可以在那里打造独一无二的网站风格。这样，即使出了问题，你只需删除最近的更新，就可以安全而迅速地回退至上一个稳定版本。
      2. 由于主题创作者的文件成为了你的子项目，你后期可以通过一行代码就将这个主题升级至最新版本，这种便利性对于一个开源主题是至关重要的。此时，如果你选择的是其他方法，你就需要重新下载并安装最新的主题文件。

基于上述原因，我们选择"git submodule add"语句来安装主题，基本上所有主题都会提供git安装语句，我们遵循作者的引导就好了，需要注意的是，我们复制并执行的是"\$"符号之后（不含"\$"）代码。

MemE主题作者为我们提供的安装语句如下。注意，主题作者在标题处表明，hugo版本应为拓展（extened）版。

![2-5theme setup.png](https://i.loli.net/2020/02/15/UM3Ym2Ol5ojakvG.png)

我们打开命令行，进入博客目录 ，输入:

```c#
git init

git submodule add https://github.com/reuixiy/hugo-theme-meme.git themes/meme
```

这一步通常会因为网络情况比较慢，也会出现安装失败的情况，多试几次就好了，正常安装后，命令行会返回如下信息。

![2-6submoudle meme.png](https://i.loli.net/2020/02/15/SJNIBRM14dfkaED.png)

此时，查看你的"themes"目录，下面会出现名为你所选中的主题名称的文件夹，对我而言，这个文件夹是meme。

![2-7meme folder.png](https://i.loli.net/2020/02/15/WUpS1rNIoMuyfJQ.png)

#### 1.2.3 加载主题

 这一步，我们要让网站知道要用哪个主题。

##### 1.2.3.1 通用方法

一般情况，你只需要打开博客根目录下的"config.toml"配置文件，添加新的一行:

```c#
theme = "meme" //这里替换为你选择的主题名称
```

就可以让网站加载指定主题。

![2-8安装主题.png](https://i.loli.net/2020/02/15/q5BwTyaWo7bGIQO.png)

你可能会注意到，这里就可以更改你网站链接的域名、网站语言、和网站名称。

##### 1.2.3.2 一种更好的方法

通常，主题作者会帮我们完成这一步，我们可以在主题文件夹内找到这个"config.toml"配置文件，我们需要做的，只是将它粘贴入网站根目录，替换掉Hugo自己生成的配置文件，然后在新文件中修改域名和网站名称就好了。

对于meme这个主题而言，作者在项目介绍页直接给了我们"config.toml"配置文件的地址，我们只需要将它移到"E:\Hugo\byteli-local\"目录下，替换掉原来的，遵照作者的提示，修改域名和网站名称就好了。

![2-9meme folder.png](https://i.loli.net/2020/02/15/Lew8xsWaUFAtok2.png)

修改后的配置信息如下，主要就改动了两条信息，其他的自定义选项我们目前可以先跳过：

![2-10config-meme.png](https://i.loli.net/2020/02/15/cDvfguOrCiptsNT.png)

### 1.3 预览网站

Finally!

我们在这一步就可以在本地看到自己网站了,而Hugo让这一步变的尤其简单,打开命令行,切换到我们的博客目录,输入:

```c#
hugo server
```

![2-11hugo server.png](https://i.loli.net/2020/02/15/JsSxd8T34EkqN6F.png)

你就会看到Hugo已经完成了对我们网站的本地部署,我们在浏览器的地址栏中输入 http://localhost:1313 ,你就看到了我们网站的样貌​ :happy:

![2-12localhost.png](https://i.loli.net/2020/02/15/WLhPve4Mu6SIj9g.png)

接下来，我们按"Ctrl + C"停止预览，然后用hugo根据我们的预览，打包生成浏览器可以理解的各种网站文件，这个核心功能语句只有一个单词，那就是

```
hugo
```

![2-13hugp.png](https://i.loli.net/2020/02/15/Vlwh7BzFr4jpPmM.png)

这个时候，你会发现我们位于博客根目录下，原本为空的"public"文件夹，多出了很多内容，这些，就是Hugo已经帮我们整理好的网站文件。

![2-14public.png](https://i.loli.net/2020/02/15/CmfbeltLI9yvnXJ.png)

至此，我们的本地网站已经建设完毕，接下来，我们再向前迈一步，让全世界都可以访问到它吧。