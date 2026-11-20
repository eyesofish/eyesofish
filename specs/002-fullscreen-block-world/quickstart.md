# 预览与验收

运行 `node --test tests/test_visit_state.mjs` 检查滚动位置到场景的映射以及手动播放偏好。已有横幅的回归用例用 `python -m unittest discover -s tests` 执行。

在仓库根目录运行 `python -m http.server 8000 --directory docs`，访问 `http://localhost:8000/`。在手机和桌面分别滚到三个章节，检查全屏尺寸、场景差异、播放、暂停、刷新后偏好与键盘导航。禁用脚本并检查项目、邮箱和 LinkedIn 链接。

发布后从公开 GitHub Profile 的 README 进入 Pages 站点，检查 HTML、样式、字体、场景模块均能从项目子路径加载。
