# Yang Yu · 余洋

**M.S. Computer Science @ UC Davis** · Backend & Distributed Systems · SWE Intern @ Microsoft (Suzhou, Jun–Sep 2026)

`devilsrocbuddhasgildedimage@gmail.com` · Davis, CA

I build small, honest systems end-to-end: distributed consensus, recommendation, and agentic LLM tooling. I prefer reading code over reading slides, and I write down what didn't work next to what did.

中文一句话：在 UC Davis 读 CS 硕士，方向是后端/分布式系统，2026 夏天在 Microsoft（苏州）做 SWE 实习。日常练手围绕共识协议、推荐系统、和 LLM agent，喜欢把一个想法跑通到端到端再写下来。

---

## Open-source contributions

I contribute focused, verified fixes to upstream projects and keep accepted work separate from work still in review.

| Project | Accepted contribution | Status |
| --- | --- | --- |
| [`QwenLM/FlashQLA`](https://github.com/QwenLM/FlashQLA) | Fixed the low-level forward/backward example to return, enable, and pass the CP cache, preventing a runtime unpacking error. | [Merged #37](https://github.com/QwenLM/FlashQLA/pull/37) |
| [`Netflix/atlas`](https://github.com/Netflix/atlas) | Removed obsolete wiki build and publishing targets and pointed contributors to the maintained documentation repository. | [Merged #1975](https://github.com/Netflix/atlas/pull/1975) |
| [`Netflix/dgs-framework`](https://github.com/Netflix/dgs-framework) | Updated the contributor guide's Java toolchain requirement to match the current build. | [Merged #2341](https://github.com/Netflix/dgs-framework/pull/2341) |

Selected upstream submissions currently open: [Velox #18689](https://github.com/facebookincubator/velox/pull/18689), [Amazon Braket #1344](https://github.com/amazon-braket/amazon-braket-sdk-python/pull/1344), [JAX #40187](https://github.com/jax-ml/jax/pull/40187), [AWS Chalice #2188](https://github.com/aws/chalice/pull/2188), [AWS SDK for C++ #3899](https://github.com/aws/aws-sdk-cpp/pull/3899), and [MNN #4807](https://github.com/alibaba/MNN/pull/4807). [View all pull requests](https://github.com/search?q=author%3Aeyesofish+is%3Apr&type=pullrequests).

---

## What I'm currently shipping

### 🛰 [`incubator-resilientdb`](https://github.com/eyesofish/incubator-resilientdb) — Raft consensus layer
Added a Raft consensus path to Apache ResilientDB as an alternative to the existing PBFT pipeline. Scope: consensus-protocol switching infra, `ConsensusManagerRaft` skeleton, leader election + heartbeat + log replication + commit flow, `RaftLog` / `PersistentState` / `SnapshotManager` for crash recovery. C++ / Bazel / Protobuf, Sep–Nov 2025.

### 📰 [`news-intent-rec`](https://github.com/eyesofish/news-intent-rec) — News recommendation and hybrid search
Independent personal project built on the public Microsoft MIND dataset. LightGBM ranking reached **Recall@10 = 0.5969** versus **0.4831** for the popularity baseline on a chronological holdout. The system combines FAISS recall, hybrid search, FastAPI + MySQL serving, Outbox/Kafka delivery, and a React product frontend.

### 🧠 [`software_reco`](https://github.com/eyesofish/software_reco) — Agentic software-recommendation system
Multi-service: FastAPI RAG agent + Spring Boot orchestration + React chat UI. Streaming SSE responses, LangGraph-style workflow with skill routing, vector + keyword + web retrieval, layered memory, human-in-the-loop confirmation. Active since Jan 2026.

---

## Other public work

- [`terminal-image-paste`](https://github.com/eyesofish/terminal-image-paste) — VS Code extension that saves clipboard images and injects absolute paths into terminal TUIs.
- [`ecs273_final_report`](https://github.com/eyesofish/ecs273_final_report) — End-to-end search↔recommendation closed loop on the THUIR ZhihuRec 1M dataset.
- [`tcp_multi_proto`](https://github.com/eyesofish/tcp_multi_proto) — Dual-protocol TCP chat server (JSON ↔ protobuf with Lamport ACK tracking).
- [`baicizhan`](https://github.com/eyesofish/baicizhan) — Concurrent Spring Boot word-learning app prototype.

---

## Stack I reach for

`C++` · `Python` · `Java / Spring Boot` · `TypeScript / React` · `FastAPI` · `MySQL` · `Bazel` · `Docker` · `LangChain / LangGraph` · `Protobuf` · `Raft / PBFT`

---

## Contact

- Email: devilsrocbuddhasgildedimage@gmail.com
- GitHub: [@eyesofish](https://github.com/eyesofish)
