# Yang Yu · 余洋

**M.S. Computer Science @ UC Davis** · Backend & Distributed Systems · SWE Intern @ Microsoft (Suzhou, Jun–Sep 2026)

`devilsrocbuddhasgildedimage@gmail.com` · Davis, CA

I build small, honest systems end-to-end: distributed consensus, recommendation, and agentic LLM tooling. I prefer reading code over reading slides, and I write down what didn't work next to what did.

中文一句话：在 UC Davis 读 CS 硕士，方向是后端/分布式系统，2026 夏天在 Microsoft（苏州）做 SWE 实习。日常练手围绕共识协议、推荐系统、和 LLM agent，喜欢把一个想法跑通到端到端再写下来。

---

## What I'm currently shipping

### 🛰 [`incubator-resilientdb`](https://github.com/eyesofish/incubator-resilientdb) — Raft consensus layer
Added a Raft consensus path to Apache ResilientDB as an alternative to the existing PBFT pipeline. Scope: consensus-protocol switching infra, `ConsensusManagerRaft` skeleton, leader election + heartbeat + log replication + commit flow, `RaftLog` / `PersistentState` / `SnapshotManager` for crash recovery. C++ / Bazel / Protobuf, Sep–Nov 2025.

### 📚 [`ecs273_final_report`](https://github.com/eyesofish/ecs273_final_report) — ZhihuRec V1.5
End-to-end search↔recommendation closed-loop on the THUIR ZhihuRec 1M dataset. FastAPI + MySQL backend, React 18 + D3.js product frontend. **Search Carryover Gain@10 = +0.1000** on 121 replay events. UC Davis ECS273 Team 11 final project.

### 🧠 [`software_reco`](https://github.com/eyesofish/software_reco) — Agentic software-recommendation system
Multi-service: FastAPI RAG agent + Spring Boot orchestration + React chat UI. Streaming SSE responses, LangGraph-style workflow with skill routing, vector + keyword + web retrieval, layered memory, human-in-the-loop confirmation. Active since Jan 2026.

---

## Other public work

- [`tcp_multi_proto`](https://github.com/eyesofish/tcp_multi_proto) — Dual-protocol TCP chat server (JSON ↔ protobuf with Lamport ACK tracking).
- [`baicizhan`](https://github.com/eyesofish/baicizhan) — Concurrent Spring Boot word-learning app prototype.
- [`neetcode-submissions`](https://github.com/eyesofish/neetcode-submissions) — NeetCode.io interview-prep submissions (C++).

---

## Stack I reach for

`C++` · `Python` · `Java / Spring Boot` · `TypeScript / React` · `FastAPI` · `MySQL` · `Bazel` · `Docker` · `LangChain / LangGraph` · `Protobuf` · `Raft / PBFT`

---

## Contact

- Email: devilsrocbuddhasgildedimage@gmail.com
- GitHub: [@eyesofish](https://github.com/eyesofish)
