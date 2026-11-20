# 实现计划 · 整屏方块世界

**输入**　[功能规格](spec.md) · **分支** `002-fullscreen-block-world`

## 实现与结构

- 在 `docs/` 提供独立静态站点。HTML 组织 Surface、Projects、Contact 三个可定位的阅读区域。CSS 负责布局、文字对比、窄屏和动画暂停状态。
- 固定在视口的 Canvas 2D 绘制原创方块景观，按章节起始位置插值切换深度。Web 模块连接滚动、暂停按钮与系统动效偏好。页面不可见时停止更新画布。
- 在 README 姓名下方加入可点击的英文入口。本仓库的 Pages 发布源设为 `main:/docs`，核对 GitHub 返回的公开 URL。

## 项目约定核查

技术介绍、实习和求职方向来自现有 README。项目链接直达代码仓库。背景图从无障碍树中排除，所有重要文字都是普通 DOM 文本与锚点。发布前后核对入口、布局和链接。

## 交付依据

[技术选择](research.md) · [状态与章节](data-model.md) · [界面约定](contracts/page.md) · [验收](quickstart.md)
