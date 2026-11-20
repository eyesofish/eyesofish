# 实现计划 · GitHub 主页的方块世界横幅

**Git 分支**　`chore/spec-kit-setup`　　**功能编号**　`001-minecraft-profile-animation`　　**日期**　2026-11-19

**输入**　[已审查的功能规格](spec.md)

## Summary

在姓名标题下面嵌入一张仓库内的动画 GIF。白天，方云越过屋顶。入夜时，小木屋的窗户亮起来。Python 和 Pillow 在维护者的电脑上绘制并导出全部帧，GitHub 向访客展示成品。观看时只需打开个人主页。[GitHub 图片语法](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#images)

## Technical Context

| 项目 | 采用的设计 |
| --- | --- |
| 目标界面 | GitHub.com 上 `eyesofish` 的个人资料页，通过同名仓库的根 README 展示。图片使用仓库相对路径。 |
| 制作环境 | 本机 Python 3.13.5、Pillow 13.0.0。一个可重复执行的离线绘图脚本，唯一发布素材为 `assets/block-world.gif`。 |
| 画面 | 原创像素画，320 × 80 逻辑像素，最近邻放大至 960 × 240。固定机位，云层按周期平移。 |
| 播放 | 64 个采样时刻 × 250 毫秒，16 秒无限循环。首帧提供完整日景，每帧保留可辨认的小屋和草地。 |
| 文件体积 | 优化目标为 2 MiB 以内，属于本项目的下载体积目标。超过时优先简化细碎纹理与调色板，再复核夜间细节和循环接缝。 |
| 验证 | 本地解码核对尺寸、时长和循环标记。在 GitHub 页面核对自动播放、静止画面、屏幕阅读顺序和窄屏布局。 |

## Constitution Check

| 维护约定 | 研究前检查 | 设计复核 |
| --- | --- | --- |
| 经历和成果可核实 | 本功能只增加风景横幅 | 图片段落之外的正文对照现有 README 检查，个人介绍继续由正文承载。 |
| 链接直达对应作品 | 沿用现有项目和联系方式 | 逐项比对原链接，并从页面实际打开 `software_reco`。 |
| 用 GitHub 渲染验收 | 规划包含 GitHub 页面检查 | 展示约定规定英文替代文本、四种主题和宽度组合、关闭自动播放与图片失败两种行为。 |

两次检查均通过。成品的线上表现按验收指南实测。

## Project Structure

实施时涉及三个路径。

| 路径（相对仓库根目录） | 作用 |
| --- | --- |
| `scripts/render_banner.py` | 从场景定义绘制整轮源帧，导出到固定资源路径。变更美术或节奏时重新执行。 |
| `assets/block-world.gif` | 与引用它的 README 一起纳入版本控制，供同一分支的访客直接加载。 |
| `README.md` | 在一级标题后插入一个带英文替代文本的 Markdown 图片段落。 |

## 实施与验收顺序

1. 根据[场景和时间表](data-model.md)绘出完整白天和夜间构图，再生成云层移动、晨昏过渡及窗灯变化。用成品解码和两轮目测检查接缝。
2. 按[README 展示约定](contracts/readme-banner.md)嵌入图片。以实施前的正文为基线，检查只新增了横幅段落。
3. 按[验收指南](quickstart.md)先验证本地产物，再在 GitHub 同分支 README 检查访客体验。发布后在真实个人主页复核。平台设置、媒体方案与取舍记录在[技术调研](research.md)。
