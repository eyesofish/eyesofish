# 技术选择

GitHub Profile 的 README 支持嵌入图片。独立 Pages 站点可以从同一仓库的 `main` 分支 `/docs` 目录发布 HTML、CSS 与 JavaScript，适合需要控制整个视口的作品集。资源使用相对路径以支持项目子路径。[GitHub Pages 发布源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

选择浏览器内绘制像素场景，便于依据滚动位置切换构图，并让读者随时暂停。延长现有 GIF 会把地形和时间轴锁在同一个图片矩形里，难以独立控制内容位置和运动。将交互与文字放在 HTML 层，背景画布仅负责图像。
