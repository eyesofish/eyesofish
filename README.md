# Hi, I'm Yang / 俞洋

[Explore my full-screen block world →](https://eyesofish.github.io/eyesofish/)

<span title="Clouds drift over a wooden cabin on stepped grass blocks as its windows light up at night.">![Clouds drift over a wooden cabin on stepped grass blocks as its windows light up at night.](assets/block-world.gif)</span>

I'm a CS master's student at UC Davis, graduating in May 2027. I spent summer 2026
as a software engineering intern at Microsoft in Suzhou.

Lately, I've been building AI agents and working on the backend systems around
them. A lot of that work happens around the model: keeping search indexes in sync,
putting limits on tool calls, and recovering from failed steps.

At Microsoft, I worked on long-session recovery in GitHub Copilot CLI. A
conversation could grow too large to send, and the command meant to shorten it
could hit the same limit. I helped fix the recovery path so the existing session
could continue.

## A few projects

[`software_reco`](https://github.com/eyesofish/software_reco) is a software
recommendation app that works with text and images, with a React chat UI backed by
Spring Boot and FastAPI. Recent work includes moving keyword search to
Elasticsearch and keeping it in sync with the vector index. A slow search source
can time out while the other results still make it into the answer. The agent has
tool-call limits and can pause for human confirmation.

[`ads-agent-post-training-lab`](https://github.com/eyesofish/ads-agent-post-training-lab)
is a small lab for training and testing an agent in a synthetic advertising
environment. It brings together tool execution, recovery, and experiments with
LoRA and DPO. Some training runs made things worse; those results are still in the
report alongside the improvements.

My [`ResilientDB work`](https://github.com/eyesofish/incubator-resilientdb) adds a
Raft implementation alongside the existing PBFT path. My work covers leader election,
log replication, persistence, and snapshots. It's a C++ project in my own
repository, separate from the upstream Apache project.

[`NewsIntentRec`](https://github.com/eyesofish/news-intent-rec) is a news
recommendation and search app built on the public MIND dataset. In the offline
ranking experiments, LightGBM beat the popularity baseline, while adding ALS
didn't improve Recall@10. The repo includes both results and the evaluation setup.

## Small tools and open source

I also built
[`terminal-image-paste`](https://github.com/eyesofish/terminal-image-paste), a VS Code
extension for pasting clipboard images into terminal coding tools. It saves the
image and inserts its file path. There's an installable VSIX in the releases.

My upstream contributions include a
[merged fix to a FlashQLA example](https://github.com/QwenLM/FlashQLA/pull/37).
I also have an
[open PR in Google's ADK for Java](https://github.com/google/adk-java/pull/1448)
to preserve complete MCP tool results.
[Other pull requests are here.](https://github.com/search?q=author%3Aeyesofish+is%3Apr&type=pullrequests)

## What's next

A bit of news from this recruiting season: I've received a letter of intent from
Meituan for a 2027 graduate role.

I'm open to 2027 new-grad opportunities in AI applications and backend engineering,
in the US or China.

也欢迎用中文交流。我在 UC Davis 读 CS 硕士，最近主要做 AI Agent 和后端。
这里有项目代码，也有一些没跑赢 baseline 的实验。

You can reach me by
[email](mailto:devilsrocbuddhasgildedimage@gmail.com) or on
[LinkedIn](https://linkedin.com/in/yy030305).
