---
title: 利用Hugo构建个人网站-4：发布网站
tags: [blog101, Hugo, 建站]
date: 2020-02-16T09:06:26.000+08:00
summary: "现在我们将通过Netlify的一键部署，完成网站内容从本地到全球的最后跳跃。"
categories: ["Hugo创建个人博客指南"]
keywords: [hugo, 个人博客, 建站教程, hugo教程, 个人博客, 独立博客, 网站建站, 零基础建站, netlify, forestry, GitHub]
---

## 发布网站——配置Netlify

### 将网站托管于Netlify

这一步中，Netlify将会把我们的网站推向整个互联网。

#### 向全球部署你的网站

1. 注册并登录[Netlify](https://app.netlify.com)，点击首页的"New site from Git"，然后在下面的页面中点击GitHub进行连接。![3选择仓库进行部署.png](https://i.loli.net/2020/02/16/s1erdB7iunl9IUA.png)

2. 选择授权Netlify的仓库，即我们的项目仓库，点击保存确认，提示"Authorized"即表明授权完成，我们可以进入下一步。

   ![2选择项目所在仓库.png](https://i.loli.net/2020/02/16/K96u57NHhprwed2.png)

3. 这一步 ，我们确认连接的仓库和我们此前创建的一致后，点击这个仓库名称，进入下一步。

   ![1连接GitHub与Netlify.png](https://i.loli.net/2020/02/16/ju9yUBRxJNe35Sm.png)

4. 这一步无需任何更改，点击最下方的"deploy  site"即可：

   ![4部署网站.png](https://i.loli.net/2020/02/16/7gpCbkJQXcKd5Iz.png)

5. 稍等片刻，Netlifty就会将我们的网站部署好，红框内即是我们的域名，点击就可以访问了。

   这里，如果你选择的也是Meme主题，这里可能会因为版本原因部署失败，我们马上会给出解决办法。![5部署成功.png](https://i.loli.net/2020/02/16/ibxECUGAPBzh9SH.png)

   ![6新网站.png](https://i.loli.net/2020/02/16/rsNRkwdDOzvu6pS.png)

   关于Meme主题提示部署失败的解决办法：

   我这里第一步部署时提示失败，我们可以切换到"Deploy"页面，查看此次报错的日志( Deploy Log)。![7查看部署日志.png](https://i.loli.net/2020/02/16/CIQDJg5qE1tiYGv.png)高亮的部分即首次报错的记录。我们发现，我这次选用的MEME主题，不支持Netlify默认的"Hugo 0.54.0"版本，该主题需要的最低版本号为"Hugo 0.62.2"，所以导致了失败。

   在 [Hugo关于Netlify的官方的配置说明](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/#configure-hugo-version-in-netlify) 中，我们找到了通过修改"HUGO_VERSION"参数，更改版本号的方法。

   接下来，我们只需要在设置选项中，修改这个参数即可。因为我本地的Hugo版本为"0.64.0"，所以我将Netlify也指定为该版本。

   ![8定义Netlify运行的Hugo版本.png](https://i.loli.net/2020/02/16/bLEaMDW32m9NYTz.png)

   之后选择清空缓存并重新部署网站("Clear cache and deploy site"选项)，网站就部署成功了。

#### 配置个性化域名

目前，你实际已经拥有了自己的网站，如果你对现状很满意，那么就可以直接进入第4章。如果你想让自己的免费域名更个性一些，或者在考虑使用自己购买的个性域名，并免费配置Https提升网站的安全性，那么我们将通过简单的步骤一一实现。

1. 配置nelify域名

   我们在"Domain management"中 ，选择系统随机给我们分配的链接，然后点击"Edit site name"，在弹出的页面中输入我们想要的域名开头，然后保存即可。

   由于你的网站用的书Netlify提供的域名，所以默认已经开启了Https访问。

   ![9自定义netlify网站域名.png](https://i.loli.net/2020/02/16/sT1IRG6KLBEmweg.png)

2. 配置自己的域名

   1. Ntelif添加域名

      还是在"Domain management"中，我们点击"Add custom domain"，添加自己的域名，一路yes点完，我们会看到新的域名已经添加至Netlify。

      ![10配置DNS.png](https://i.loli.net/2020/02/16/UiIojvAcCPkqKQp.png)

      点击 "Check DNS configuration"，在弹出的窗口中，点击"Set up Netlify DNS for 你的域名"，然后一路确认。

      ![11设置Netlify的DNS.png](https://i.loli.net/2020/02/16/BWJL2e5CKZq8xcl.png)

      我们最后会停留在这个页面，这时先不要点击Done，也不要关闭网页。

      ![12获取名称伺服器地址.png](https://i.loli.net/2020/02/16/z6c8uPATmW5ivr9.png)

   2. Godaddy设置

      我们打开[GoDaddy](https://hk.godaddy.com/)，进入自己的产品页面，选中自己域名的DNS选项。

      ![13配置Godaddy名称伺服器-.png](https://i.loli.net/2020/02/16/M4bJAE3nWGxOCQU.png)

      之后点击更改我们的名称伺服器：

      ![14配置Godaddy名称伺服器-2.png](https://i.loli.net/2020/02/16/MNTC6wmGoWqYE8d.png)

      选择"输入我自己的名称伺服器"

      ![15配置Godaddy名称伺服器-3.png](https://i.loli.net/2020/02/16/HVal1GL495NqkTv.png)

      在这里输入Netlify中给我们列出的四个地址，输入完后，点击保存。

      ![16配置Godaddy名称伺服器-4.png](https://i.loli.net/2020/02/16/bfrZ7Uu45hI8DeP.png)

      此时再切回Netlify的页面，点击"Done"，稍等片刻，出现如下的标志，即表示我们已经配置完成。

      ![17DNS配置完成.png](https://i.loli.net/2020/02/16/yQ31Hop6tMfasbL.png)

   3. Netlify配置Https

      Netlify配置https非常简单。我们配置完域名后，将页面往下拉，就会看到专门的https区域。点击"Verify DNS configuration"。等待系统处理一段时间后，就已经配置完成了。

      ![18Netlify为网站开启HTTPS.png](https://i.loli.net/2020/02/16/bxBN2lODTeXSZJg.png)

      完成后的状态：

      ![19Netlify成功开启HTTPS.png](https://i.loli.net/2020/02/16/AdfkUoHGFwEWg7K.png)

不论你采用以上哪种路径，现在任何人只需要在浏览器中输入你的域名，就可以轻松访问到你网站上的内容。注意域名前的那把小锁，它会向访客表示你的网站遵循了一套国际认可的加密标准，去保护访客的安全性。

在接下来的一节中，我们将讨论如何进行博文的编辑与发布，在这之后，你的网站就可以运行起来了。

![20线上网站完成.png](https://i.loli.net/2020/02/16/tu3ovpOMNw8BqWD.png)