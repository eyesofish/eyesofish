# 横幅制作与验收

从仓库根目录运行以下 PowerShell 命令。开始验收前，需要完成生成器、动画文件和 README 图片引用。场景阶段和 README 引用规则分别见[画面模型](data-model.md)与[横幅展示约定](contracts/readme-banner.md)。

## 1. 在本地生成和解码

使用 Python 3.13 和 Pillow 13.0.0。先确认版本，再生成横幅。

```powershell
python -c "import sys, PIL; print(sys.version.split()[0], PIL.__version__)"
python scripts/render_banner.py
```

若系统 Python 缺少对应依赖，可用 `uv run --python 3.13 --with pillow==13.0.0 python scripts/render_banner.py`。运行下面的解码检查时也可将最后一行的 `python -` 换为 `uv run --python 3.13 --with pillow==13.0.0 python -`。

```powershell
@'
from pathlib import Path
from PIL import Image, ImageSequence

path = Path("assets/block-world.gif")
with Image.open(path) as image:
    assert image.format == "GIF" and image.size == (960, 240)
    assert image.info.get("loop") == 0 and image.n_frames > 1
    durations = []
    for frame in ImageSequence.Iterator(image):
        rgb = frame.convert("RGB")
        assert any(lo != hi for lo, hi in rgb.getextrema()), "Single-color frame"
        durations.append(frame.info["duration"])
    assert all(ms > 0 for ms in durations) and sum(durations) == 16000
    print(f"{len(durations)} encoded frames, {sum(durations)} ms, {path.stat().st_size:,} bytes")
'@ | python -
```

生成器以 64 帧、每帧 250 毫秒作画。相邻相同画面可以在编码时合并，验收以解码后的总时长为准。文件体积目标为 2 MiB 以内。将 GIF 拖入浏览器，观看 32 秒。首帧应能辨认草地和小屋，3 秒内看到云相对屋顶移动。每轮入夜亮灯、天亮熄灯，循环处小屋位置稳定，画面连续。

在编辑器中打开 README 的 Markdown 预览，再检查相对基线的改动。

```powershell
git diff 97cde68 -- README.md
```

差异应只有标题下新增的一行图片引用和分段空行。核对英文替代文本及图片相对路径，确认原项目和联系链接逐字保留。

## 2. 在 GitHub 分支上验收

待包含 README 和 GIF 的分支可在 GitHub 访问后，打开该分支的仓库首页，查看渲染好的 README。分别在 375 和 1280 像素视口检查浅色、深色主题，共四种组合。小屋应完整可见，正文无需横向滚动，能打开 `software_reco`，文末能找到邮箱和 LinkedIn。

- **播放与静止。** 登录 GitHub，在 Settings → Accessibility → Motion 中分别测试 Enabled 和 Disabled。允许播放时复核两轮日夜交替。关闭自动播放后刷新，观察 5 秒，草地和小屋应保持静止。测试结束恢复原设置。[GitHub 动效设置说明](https://docs.github.com/en/account-and-profile/how-tos/account-settings/managing-accessibility-settings#managing-motion)
- **屏幕阅读器。** 从姓名标题起向后读，依次应听到标题、英文场景描述和第一段个人介绍。
- **图片加载失败。** 在浏览器开发者工具中阻止横幅图片请求，刷新。检查标题和介绍可读，`software_reco` 链接仍能打开。检查完成后解除阻止。

## 3. 发布后复核

待主页维护者将改动发布到默认分支，再从访客使用的个人资料页重复分支验收，记录实际访问地址、主题、视口、播放设置和结果。在线结果以 GitHub 对该页面的实际渲染为准。[eyesofish 的 GitHub 主页](https://github.com/eyesofish)
