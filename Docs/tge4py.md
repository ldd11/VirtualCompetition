## TGE支持Python

### demo体验

https://git.woa.com/FutureEdu/VirtualCompetition/blob/wynne/python_v1/Docs/demo.md

### 方案设计

https://git.woa.com/FutureEdu/VirtualCompetition/blob/wynne/python_v1/Docs/python.md

### 分工说明

| 功能     |  描述 | 开发| 技术/语言     | 涉及到的库| 代码地址 |
| ----------- | -------- | ------- | --- | -- | -- |
| Python代码编辑器<img width=200/>     | 代码编辑、智能提示、点击积木插入代码       |wynne<img width=50/>| 前端js| react、monaco-editor、monaco-languageclient|[tge-python-editor](https://git.woa.com/wynnechen/tge-python-editor)
| Python运行时实现   | 和tge的websocket通讯、同步机制       | wynne| Python | websockets、asyncio、nest_asyncio|[tge_py](https://git.woa.com/wynnechen/tge_py/)
| codingtge.py | 提供给用户调用的Python库 |  wynne | Python | |[codingtge.py](https://git.woa.com/wynnechen/tge_py/blob/master/codingtge.py)
| python运行环境 | python3.6环境安装到用户机器，默认安装好python运行时需要的库(websocket、nest_asyncio、pythoh-language-server）安装 | sivan | 打包脚本（需要支持win/mac） | -- | -- |
| TGE侧对接Python的通讯 | 运行时对接Python侧传过来的命令控制机器狗(就是原来的积木转成的c#代码)，原有的运行时RobotRuntime迁移，对接原有的加速、事件、数据同步、结果判定等功能 | sivan | Unity、C# | websocket-sharp | [TGEWebAdapter](https://git.woa.com/FutureEdu/VirtualCompetition/tree/wynne/python_v1/Assets/Scripts/Runtime/v2) |
| 整个业务的界面交互和流程串联 | 切换积木、代码模式，点击运行、获取编辑器页面代码、拉起Python运行进程、作品保存等业务逻辑 | wynne、sivan | Unity、C# | -- | -- |



### 代码结构

本次新增的代码结构如下：
<img width="" src="/uploads/A0C3A0587C6E4A0EA9002D935FC4BDD3/image.png" alt="image.png" />


