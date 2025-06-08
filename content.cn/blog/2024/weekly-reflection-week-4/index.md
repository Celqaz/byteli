---
title: 'Weekly Reflection 24#4: 步履不停'
tags: ['Weekly Reflection']
pubDate: '2024-02-01T00:27:27.000'
description: '2024 年第 4 周的回顾与反思'
---

{{< spotify "https://open.spotify.com/embed/track/2Sx4E0kdPhpDSzKl1OBhJ5" >}}


本篇是对`2024-01-21` 到 `2024-01-27` 这周生活的记录与思考。

## 春饼迎春

熊小花的一位朋友周五来家里做客，我们想着离立春挺近了。就张罗着做了春饼，配了鱼香肉丝、蚝油杏鲍菇、酸辣土豆丝和凉拌包菜。其中，下厨房上鱼香肉丝的配方完全，熊小花的凉拌包菜备受好评，主要得益于贵州的魏老妈辣椒面；下厨房上的[这份鱼香肉丝菜谱](https://www.xiachufang.com/recipe/100352761/) 不仅味道出众，而且所有的主要材料都可以在这边买到，一饼解乡愁。

虽然这只是我和熊猫老师第二次一起做春饼，但我们的合作已经非常成熟了。和面、发面、擀饼和烙饼，整个流水线作业，没想到我这个在国内没有怎么吃春饼的人，竟然会在荷兰自己做出来，也算是很特别的人生经历了。

食物真是种特别的东西，在吃春饼的时候，突然想到某个回家的悠长午后，自己没来由地走进一家春饼店中吃了一顿，当时吃的什么已经完全记不得了，只记得在氤氲的蒸汽中嘈杂的人声和在午后阳光下擦得闪亮的蘸碟。

## 步履不停

这周和熊小花一起看完了《请回答 1988》，这部剧集的独特魅力在于可以用藏于细节的温情激活观众角落的记忆，在淡淡的乡愁中想象一种慢下来的生活。这种转换，让我想起了刚打开星露谷物语的那个遥远的下午。熊培云在《自由在高处》中，对此有过这样的总结：

> 《旧金山纪事报》曾经嘲笑美国是个朝着微波炉大吼大叫，仍然嫌它速度太慢的民族。不断地更新换代同样让人们患上了“喜新厌旧症”，“旧的不去，新的不来”感染了社会上每一个人。正因为此，有人满怀乡愁——如何回到原来的价值观，长久地住在同一套房子里，长久地保存重要的东西，并且彼此忠诚，这已经是稀有的生活。

整部剧集看下来，前半部分涉及父母生活的部分让我们感触最多。之前在国内的时候，虽然也不经常在父母身边，但是总是会想自己有时间就会回去，即使回去的时间也并没有那么多。然而，出国之后，这种总可以相聚的心理预期已经消失，才能在真实的分别中，重新审视和家人的联结。在这样的情境下，这部剧恰当地提供了一个通向过去的入口，我在多处和剧情暗合的感觉中，发现了此前被未被留意的家庭生活片段；同时，这部剧也提供了一个情感的出口，让我们在怀念过去的时候，也更好得珍惜现在。去年在北京办理完签证事宜，从北京坐动车回家，在和邻座的阿姨聊天中，她说到“你还有父母可真好啊。”。

> 而关于我接下来要讲的那一天，其实也没有发生什么决定性的事件，我只是隐隐约约地感觉到，许多事情已经在水面下悄悄酝酿。但即便如此，我却故意装作什么都不知道。直到我真的搞清楚的时候，我的人生已经往后翻了好几页，再也无法回头挽救什么。因为，那时，我已经失去了我的父母。——是枝裕和《步履不停》

## 寒假的尾巴

距离开学只剩一周，自己心中没有特别的激动，反而是日渐趋暖的天气让人感觉心情也一起开朗了起来。冬季昼短夜长，这在在高纬地区尤其明显，所以早起的灿烂阳光，总是带来类似春天的错觉，也因此驱散了漫漫长夜中的寒冷。

这一周内，自己主要完成 Master 的项目注册和课程注册。虽然 pre-master 的考试成绩早早就放出来了，但是由于老师要等到 resit 才上传成绩，所以学校的系统此前一直没有给自己 Enrollment Certificate 。在将近一个月的等待后，老师终于上传了成绩，自己也正式注册了 Master 项目。

语言课上，此前考虑到方便实习，自己没有立即注册课程。这周我想要再选修一门荷兰语课，发现语言课的注册已经关闭了，只能靠自学 + Duolingo 了，去年完成了 Duolingo 365 streak，希望这些底子可以让自己的自学之路不那么坎坷。

## $1

今年，给自己定了赚取 $1 被动收入的目标。

有天在回到家时，看到 youtube 推了在 [RapidAPI](https://rapidapi.com/hub) 上部署简单 API 服务的[教程](https://www.youtube.com/watch?v=GK4Pl-GmPHk)，看了一下，用的架构还是 Node.js 和 express.js，数据源获取则使用 [cheerio](https://cheerio.js.org/) 进行爬取，最后部署到 [Heroku](https://www.heroku.com/home)。

这个项目本身没有什么难度，之后可以优化的点在于：

- 数据存储：目前的方案中，每次 request 都会发起一起爬虫请求，一方面服务器的压力过大，且存在大量的性能浪费，另一方面在 request 数量上升后，容易触发网站的反爬虫策略，使得整个程序失效。之后自己部署的方案中，可以将爬虫结果存储在数据库，目前考虑是之前用过的 MongoDB。

这个项目带来的启发是：

- 了解 JaveScript 的爬虫库。之前我一直使用 BeatifulSoup 在 Python 中进行爬虫，通过对 cheerio 库的了解，全栈的技术有所提高（即，用 JavaScript 写一切）。
- API as a Service。之前在学习时，我主要从数据在前后端的传输理解 API，简单地将后端的工作局限在数据库。通过这个项目，我才发现 API 在输入和输出流中，提供服务的可能性。在 [The Top 50 Most Popular APIs](https://rapidapi.com/blog/most-popular-api/) 这篇总结文章中，多数 API 提供的服务其实和数据库无关，例如提供 TikTok 无水印下载的 [Tiktok Download Without Watermark](https://rapidapi.com/yi005/api/tiktok-download-without-watermark), [NLP Translation](https://rapidapi.com/gofitech/api/nlp-translation) 以及 [Article Data Extraction and Text Mining](https://rapidapi.com/blog/most-popular-api/)。这其中，机器学习的应用是个新的趋势，使得复杂的模型可以通过标准的 API，应用到更多的场景。

## Data Science

这一周从此前一直主要投实习的节奏中切换回来，继续在 DataCamp 上学习。

这周主要学了 [seaborn](https://seaborn.pydata.org/) ，并写了一篇博客 [A Guide to the Power of `hue` in Seaborn Visualizations](https://www.byteli.com/post/datascience/hue-in-seaborn/)。

这周还做了 DataCamp 上 Visualizing the History of Nobel Prize Winners 的项目，我惊讶于自己遗忘速度之快，很多基础的切片操作学完不用就忘记了，之后每日的代码练习还是需要继续。

## Weekly Gems

### Awesome DataScience

- [QuantEcon](https://python-programming.quantecon.org/about_py.html) 是一份完整的关于用 Python 进行量化的教程，符合我未来 Financial Risk Management 的方向。

- [Colly](https://github.com/gocolly/colly) 是一个使用 Go 语言编写的爬虫库，我完全没有 Go 相关的知识，但是对于将 Elegant 放在 About 描述中的项目，读一读代码也应该是愉悦的。

- [Neet Code](https://neetcode.io/) 是我在 Reddit 上发现的一个类 leetcode 网站，作者精选了 150 道题目，并附上了详细的讲解，可以增进对程序设计的理解。

### web dev

- [google-indexing-script](https://github.com/goenning/google-indexing-script) 通过`Google Search Console API` 和 `Web Search Indexing API` ，读取网站 sitemap 并自动向 Google 推送尚未被收录的网址。作者在项目介绍中说 <br/> <blockquote> Use this script to get your entire site indexed on Google in less than 48 hours.</blockquote> <br/>我虽然严格按照作者的教程进行设置，但仍然发现作者漏掉了一些说明，之后准备写一篇博客补充下。

- 在 [上一篇博客](https://www.byteli.com/post/life/weekly-reflection-week-3/) 中，当我尝试引用豆瓣读书的图片封面 url 时，发现豆瓣有防盗链设置，因此无法在我的网站上显示，经过简单的 Google， 发现可以使用 [weserv.nl](https://images.weserv.nl/) 的服务进行中转，绕开图片引用的限制。
