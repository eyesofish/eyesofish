# Yang Yu · 俞洋

**Backend & Distributed Systems · AI Agents & LLM Applications**

M.S. Computer Science @ UC Davis (expected May 2027) · SWE Intern @ Microsoft (Suzhou, Jun–Sep 2026)

`devilsrocbuddhasgildedimage@gmail.com` · [LinkedIn](https://linkedin.com/in/yy030305) · Davis, CA

---

I build small systems end to end, then measure them and write down what didn't work.

**Three things I can defend in detail.**

**GitHub Copilot CLI — long-session recovery.** A session had outgrown the request limit, and the
compaction command that was supposed to rescue it failed the same way — it shared the failing
request path, so recovery was blocked by the very failure it existed to fix. I traced both call
paths, designed bounded chunked recovery so the original session could continue without starting
over, and landed the fix in a merged PR. The lesson generalizes: recovery must not depend on the
path that already failed.

**Apache Incubator ResilientDB — Raft consensus.** Added a Raft layer in C++ alongside the existing
PBFT path: consensus-protocol switching, leader election and heartbeats, log replication, commit
flow, plus `RaftLog` / `PersistentState` / `SnapshotManager` for crash recovery and snapshotting.
→ [`incubator-resilientdb`](https://github.com/eyesofish/incubator-resilientdb)

**NewsIntentRec — recommendation and hybrid search.** LightGBM ranker at **Recall@10 = 0.5969**
versus **0.4831** for a popularity baseline on a chronological holdout. BM25 + sentence-transformer/
FAISS hybrid search raised held-out **NDCG@10 from 0.2854 to 0.8131**; an MMR arm cut intra-list
similarity by 20.5% under a 0.005 Recall@10 guardrail.
→ [`news-intent-rec`](https://github.com/eyesofish/news-intent-rec)

I keep the negative results. ALS lost to LightGBM. A longer online reward-optimization run regressed
against DPO. They're still in the repos, next to what worked.

中文一句话：在 UC Davis 读 CS 硕士，方向是后端/分布式系统与 AI Agent。2026 年夏天在 Microsoft
（苏州）做 SWE 实习。习惯把一个想法跑通到端到端，再把失败的那部分也写下来。

---

## Currently building

**[`ads-agent-post-training-lab`](https://github.com/eyesofish/ads-agent-post-training-lab)** — `Python · PyTorch · Transformers · LoRA · DPO · FastAPI`
Typed-tool Ads Agent lab with a deterministic synthetic ads-diagnosis environment: 2,500 split-safe
scenarios, 11 typed tools, constrained actions, tracing, transient-failure recovery,
checkpoint/resume, and explicit human-approval boundaries. LoRA post-trained SmolLM2-135M on Apple
MPS, lifting frozen model-policy task success **20% → 63%**; candidate-aligned DPO reached **74%**.

**CareerOps** — `Node.js · Playwright · LaTeX · AI Agents` *(private repo)*
Extended the open-source CareerOps platform into a personalized agentic job-application workflow:
job discovery → JD-to-profile matching → source-grounded resume tailoring → PDF validation →
browser submission → lifecycle tracking. Reconnectable persistent Playwright layer with session
reuse, liveness checks, bounded retries, and explicit human handoff for auth, CAPTCHA, and
unsupported answers. Submission requires a form-fingerprint preflight that invalidates approval on
any field change; tracker sync happens only after a verified official success.

**[`software_reco`](https://github.com/eyesofish/software_reco)** — `LangGraph · FastAPI · Spring Boot · Chroma · CLIP · React`
Multi-service agentic recommendation system. Bounded LLM tool-calling loop over vector,
image-vector, keyword, web, and memory retrieval, with step/tool budgets, duplicate-call prevention,
and deterministic static fallback. Streaming SSE, layered memory, human-in-the-loop confirmation.
CLIP-based text-image retrieval with reciprocal-rank fusion and evidence-quality gating.

---

## Open source

Focused, verified fixes upstream. Accepted work is kept separate from work still in review.

| Project | Contribution | Status |
| --- | --- | --- |
| [`QwenLM/FlashQLA`](https://github.com/QwenLM/FlashQLA) | Fixed the low-level forward/backward example to return, enable, and pass the CP cache, preventing a runtime unpacking error. | [Merged #37](https://github.com/QwenLM/FlashQLA/pull/37) |
| [`Netflix/atlas`](https://github.com/Netflix/atlas) | Removed obsolete wiki build and publishing targets; pointed contributors at the maintained docs repo. | [Merged #1975](https://github.com/Netflix/atlas/pull/1975) |
| [`Netflix/dgs-framework`](https://github.com/Netflix/dgs-framework) | Updated the contributor guide's Java toolchain requirement to match the current build. | [Merged #2341](https://github.com/Netflix/dgs-framework/pull/2341) |
| [`amazon-braket-sdk-python`](https://github.com/amazon-braket/amazon-braket-sdk-python) | Fixed a hybrid-job example reference in the documentation. | [Merged #1344](https://github.com/amazon-braket/amazon-braket-sdk-python/pull/1344) |
| [`alibaba/MNN`](https://github.com/alibaba/MNN) | Fixed the Web LLM demo source path in the docs. | [Merged #4807](https://github.com/alibaba/MNN/pull/4807) |

**In review:** [Velox #18689](https://github.com/facebookincubator/velox/pull/18689) (document `SpatialJoinNode`) · [JAX #40187](https://github.com/jax-ml/jax/pull/40187) (stale `DeviceArray` references in type-promotion docs) · [AWS Chalice #2188](https://github.com/aws/chalice/pull/2188) (obsolete Python 2 type-hint guidance)

[View all pull requests →](https://github.com/search?q=author%3Aeyesofish+is%3Apr&type=pullrequests)

---

## Other public work

- [`terminal-image-paste`](https://github.com/eyesofish/terminal-image-paste) — VS Code extension that saves clipboard images and injects absolute paths into terminal TUIs.
- [`ecs273_final_report`](https://github.com/eyesofish/ecs273_final_report) — End-to-end search↔recommendation closed loop on the THUIR ZhihuRec 1M dataset.
- [`tcp_multi_proto`](https://github.com/eyesofish/tcp_multi_proto) — Dual-protocol TCP chat server (JSON ↔ protobuf with Lamport ACK tracking).
- [`baicizhan`](https://github.com/eyesofish/baicizhan) — Concurrent Spring Boot word-learning app prototype.

---

## Stack I reach for

**Languages** `C++` · `Python` · `Java` · `TypeScript` · `SQL`
**Backend** `FastAPI` · `Spring Boot` · `REST` · async API design · `JWT` · microservices
**Infra** `Docker` · `Kubernetes` · `MySQL` · `Redis` · `Bazel`
**AI / Agents** `LangGraph` · `RAG` · tool calling · `MCP` · `Chroma` · `CLIP` · `FAISS` · `BM25`
**ML** `PyTorch` · `Transformers` · `LoRA` · `DPO` · `vLLM` · offline evaluation
**Distributed** `Raft` / `PBFT` · `Protobuf`
**Frontend** `React`

---

## Contact

- Email: devilsrocbuddhasgildedimage@gmail.com
- LinkedIn: [linkedin.com/in/yy030305](https://linkedin.com/in/yy030305)
