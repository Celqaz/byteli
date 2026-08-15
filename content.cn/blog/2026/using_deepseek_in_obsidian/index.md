---
title: '在 Obsidian 中使用 DeepSeek'
tags: ['Obsidian']
pubDate: '2026-08-15T17:05:27+02:00'
cover: 'img/cover.png'
description: '通过 Claudian 插件，在 Obsidian 中使用 DeepSeek 来方便笔记管理。'
---

早上起床看到少数派的这篇文章：[为什么我认为 Obsidian 是当前最好用的知识管理笔记软件？](https://sspai.com/post/109850)，对其中所描写的 DeepSeek V4 的性价比很感兴趣。正好最近在用 Claude 学习荷兰语，考虑用 Obisdian + AI 做笔记，就想着起来折腾下，而过程也挺顺利的。

## 准备

### 1. Claude Code CLI

下载并安装 [Claude Code CLI](https://code.claude.com/docs/en/overview)。我是在 mac 上使用命令行安装，直接在终端运行：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

然后等待就行。

{{< figure src="img/Claude_Code_CLI.png" caption="" class="hugo-figure">}}

之后在命令行中使用 

```bash
which claude
```

会得到 claude CLI 在本地的安装位置 —— 类似 `/Users/USERNAME/.local/bin/claude`，这个位置之后需要用。

### 2. DeepSeek API

#### 2.1 创建 API key

创建 DeepSeek 账号后，在 [API 管理页面](https://platform.deepseek.com/api_keys)， 新建一个 API key。新生成的 API key 只会在 DeepSeek 中明文显示一次，所以需要将新的 API key 暂存到一个文本文件中（或暂时贴在 Obsidian 中），以备之后使用。

2.2 充值

我在配置的最后，发现在 Obsidian 中完全跑不起来，提示的信息也是无用的 `Error: Unknown` 。后来，我用在终端中跑了个测试，才发现是余额不足导致的。

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
        "model": "deepseek-v4-pro",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "thinking": {"type": "enabled"},
        "reasoning_effort": "high",
        "stream": false
      }'
      
# {"error":{"message":"Insufficient Balance","type":"unknown_error","param":null,"code":"invalid_request_error"}}
```

之后，我到 [API 充值](https://platform.deepseek.com/top_up) 的页面充了 10 元人民币，然后就正常了。

这里还是想夸一下 DeepSeek 的支付，一是付款可以选择人民币，二是可以用微信或支付宝支付，不像 Claude 或 Kimi ，需要提供信用卡信息。

### 3. Claudian

在最后一步前，应有以下的信息：

1. 在步骤 1 中的 Claude CLI 安装路径信息；
2. 在步骤 2.1 中，DeepSeek 的 API key。

之后，打开 Obsidian，在 Community Plugins 中搜索并安装 [Claudian](https://community.obsidian.md/plugins/realclaudian) （作者：[Yishen Tu](https://github.com/yishentu)），启用后打开插件设置页面。

- General：我没有进行改动，但这里可以设置语言和 AI 聊天框在 Obsidian 中的相对位置

- Claude: 虽然 Claudian 没有原生支持 DeepSeek，但因为 DeepSeek 使用了和 OpenAI/Anthropic 兼容的 API 格式，所以可以直接在 Calude 的设置界面进行配置。

  - Enable Claude: 确保开启

  - Claude CLI Path: 粘贴入 步骤 1 中的路径信息

  - Environment - Custom Variables: 参考 [DeepSeek API 文档](https://api-docs.deepseek.com/) 填入以下信息：

    - ```yam
      ANTHROPIC_API_KEY={DEEPSEEK_API_KEP}
      ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
      ANTHROPIC_MODEL= deepseek-v4-flash
      ```

    - ANTHROPIC_API_KEY 即步骤 2.1 中获取的 API key

    - ANTHROPIC_BASE_URL: DeepSeek API 文档中提供的链接，无需更改

    - ANTHROPIC_MODEL：目前可以选 `deepseek-v4-flash` 或 `deepseek-v4-pro`，前者要便宜 67% (¥2 或 $0.28 / 1M token)，后者适合更复杂的工作。我感觉自己目前还算是比较轻量化的使用场景，所以选择了 `deepseek-v4-flash`。

## 运行

之后退出插件界面设置，在 Obsidian 主页面中打开 Claudian，就会出现一个聊天框，然后就可以使用了 🎉

{{< figure src="img/DeepSeek_in_Obsidian.png" caption="" width="500" class="hugo-figure">}}
