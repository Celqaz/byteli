---
title: 'Using DeepSeek in Obsidian'
tags: ['Obsidian']
pubDate: '2026-08-15T17:05:27+02:00'
cover: 'img/cover.png'
description: 'Using DeepSeek in Obsidian via Claudian for notes management.'
---

I came across [this article](https://sspai.com/post/109850) this morning, and was intrigued by the inexpensive yet powerful AI capabilities offered by Deepseek. Recently, I've been learning Dutch with Claude and have been considering using Obsidian + AI for note-taking, so I decided to give it a try — and it went quite smoothly.

## Steps

### 1. Claude Code CLI

Install [Claude Code CLI](https://code.claude.com/docs/en/overview). On mac, I just ran the following in Terminal:


```bash
curl -fsSL https://claude.ai/install.sh | bash
```

and wait for a bit:

{{< figure src="img/Claude_Code_CLI.png" caption="" class="hugo-figure">}}

then enter:

```bash
which claude
```

you'll get the path to Claude CLI - something like `/Users/USERNAME/.local/bin/claude`. Save the path somewhere (maybe Obsidian), because we'll use this path soon.


### 2. DeepSeek API

#### 2.1 Create API key

After creating a new DeepSeek account, you'll be able to create a new API key under [this page](https://platform.deepseek.com/api_keys). Save the API key in a temporary place (maybe Obsidian again), as you won't be able to view it again through your account.


2.2 Top up

The configuration failed in my first few tries, and the error message `Error: Unknown` didn't help. I then ran the following test in Terminal and found out that was caused by the insufficient balance. 

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


After topping up [here](https://platform.deepseek.com/top_up) , it backed to work. 


### 3. Claudian

Before the final step, the following should have been ready:

1. The Claude CLI path in Step 1；
2. The DeepSeek API key in Step 2.1.

Then, opening Obsidian, searching for the  [Claudian](https://community.obsidian.md/plugins/realclaudian) （by: [Yishen Tu](https://github.com/yishentu)） in Community Plugins. Install and enable the plugin, then open the plugin options page.

- General：You can change the language and the relative position of the AI chatbox in Obsidian. I just left them as default.

- Claude: Though Claudian doesn't have native support for DeepSeek, DeepSeek's API is compatible with OpenAI/Anthropic. So you can configure them under the Claude tab anyway.

  - Enable Claude: Make sure it's enabled.

  - Claude CLI Path: Paste the path gained in Step 1.

  - Environment - Custom Variables: Fill in the following info based on [DeepSeek API doc](https://api-docs.deepseek.com/):

    - ```yam
      ANTHROPIC_API_KEY={DEEPSEEK_API_KEP}
      ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
      ANTHROPIC_MODEL= deepseek-v4-flash
      ```

    - ANTHROPIC_API_KEY: The API key gained in Step 2.1.

    - ANTHROPIC_BASE_URL: The `base_url (Anthropic)` from DeepSeek API doc, no need to change.

    - ANTHROPIC_MODEL： `deepseek-v4-flash` or `deepseek-v4-pro`. `deepseek-v4-flash` is 67% cheaper ($0.28 / 1M token), while `deepseek-v4-pro` is more suitable for complex tasks. As my use cases is fairly straightforward, I choose `deepseek-v4-flash`.

## Start Chatting

Exit the plug-in setting page and launch Claudian from the home page. A chatbox will appear in the top-right corner (by default), and you AI journey begins 🎉

{{< figure src="img/DeepSeek_in_Obsidian.png" caption="" width="500" class="hugo-figure">}}
