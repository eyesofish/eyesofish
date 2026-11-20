# README 横幅展示约定

## 仓库里的两个发布文件

根目录的 `README.md` 在姓名标题与第一段自我介绍之间单独插入下列图片段落，上下各留一行空行。图片地址和文件名的大小写须一致。绘图脚本是维护用源文件，发布后的个人主页只需能读取 README 和 GIF。

```markdown
<span title="Clouds drift over a wooden cabin on stepped grass blocks as its windows light up at night.">![Clouds drift over a wooden cabin on stepped grass blocks as its windows light up at night.](assets/block-world.gif)</span>
```

外层 `span` 的 `title` 和图片替代文本使用同一句话。GitHub 播放器遇到加载错误时会隐藏内部图片，外层仍可向无障碍树提供这句说明。

`assets/block-world.gif` 必须是可解码的多帧 GIF，画幅为 960 × 240，循环标记为 0，全部帧时长之和为 16 秒。绘图源、README 引用和图片在同一次功能改动中交付。

## 访客能观察到的行为

| 条件 | 页面表现 | 对应需求 |
| --- | --- | --- |
| GitHub 允许自动播放 | 载入横幅后，3 秒内可看出云在移动。一轮中能看到入夜亮灯和天亮熄灯。 | FR-001、FR-002 |
| 在 GitHub 禁用自动播放后重新加载 | 5 秒内场景保持静止，草地与木屋可辨。 | FR-004 |
| 使用屏幕阅读器 | 阅读顺序依次为姓名标题、英文场景描述、原有简介。GitHub 自带的图片控件可随访客设置出现。 | FR-004 |
| 图片请求失败 | 场景描述仍可获取，介绍能独立阅读，正文中的 `software_reco` 链接仍可打开。 | FR-005 |
| 375 / 1280 像素宽，浅色 / 深色主题 | 横幅等比显示，木屋与窗户完整可见。横幅不会引入横向滚动，访客可照常浏览项目和联系方式。 | FR-003 |

逐项核对原正文链接的顺序与目标地址。图片沿用 GitHub 对 Markdown 的原生排版，个人介绍和联系信息仍用可选取、可朗读的文字呈现。
