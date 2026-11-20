# GitHub 主页动效的实现依据

## 展示入口

**决定**　在同名公开仓库的根 README 用 Markdown 图片语法引用同分支的 `assets/block-world.gif`。GitHub 在个人资料页顶部展示这份 README。相对路径还可以用来在开发分支对照查看同一版横幅和正文。[Profile README](https://docs.github.com/en/account-and-profile/concepts/personal-profile#your-profile-readme) · [相对图片路径](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#images)

**选择依据**　GIF 在访客端播放文件内的画面序列。GitHub 渲染仓库文档时会过滤脚本标签和内联样式，因此舍弃在 README 里写 JavaScript 或 CSS 动画的做法。GitHub Pages 可以承载独立网页，但本次的验收位置是个人资料页本身。场景按固定节奏播放，本地生成一次即可供所有访客观看。[GitHub Markup 渲染流程](https://github.com/github/markup#github-markup) · [GitHub 支持的图片格式](https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files#rendering-and-diffing-images)

## 自动播放与静止画面

**决定**　使用一张有完整白天首帧的 GIF。所有帧都保留木屋和完整地形。GitHub 给访客提供自动播放、禁用和跟随系统三种选择。静止时具体显示哪帧、控件是否遮住窗户，留到 GitHub 渲染页实测。[GitHub 动效设置](https://docs.github.com/en/account-and-profile/how-tos/account-settings/managing-accessibility-settings#managing-motion)

**考虑过的办法**　额外提供静态图片并依据系统偏好切换，会引入第二套资源选择逻辑。现有规格只需要一幅可辨认的静景，直接验收 GitHub 的原生播放行为即可。图片加载失败和用户关闭播放是两项独立测试。

## 图像制作与循环

**决定**　用本机可用的 Python 3.13 和 Pillow 13.0.0 绘制原创像素图。选 320 × 80 的逻辑画布，最近邻放大 3 倍导出。共绘制 64 个时刻，每个时刻停留 250 毫秒，每轮 16 秒。云用周期图案横向移动，地形和屋子固定。窗灯的开关随昼夜相位变化。

**选择依据**　少色块适合方块轮廓，共享调色板有助于维持纹理的一致性。全幅不透明源帧可逐帧独立查看。Pillow 支持写入帧序列、帧时长及无限循环，也能重新读取成品检验这些参数。内存小样已验证这组尺寸、循环标记和时长能往返编码，最终体积和画质在成品上测量。[Pillow GIF 编解码](https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html#gif)

**考虑过的办法**　手绘每一帧也能完成这幅横幅。用同一份绘图源重建画面，后续调整窗户亮起的时刻或云速时，只需改一处。把单轮设为 16 秒，为规格的 20 秒上限留出余量。
