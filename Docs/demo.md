## Demo体验
---

### 1. 代码拉取
```

git clone git@git.woa.com:FutureEdu/VirtualCompetition.git
cd VirtualCompetition
git checkout wynne/python_v1
git submodule update --init --recursive

# 构建webEditor(目前demo依赖于空积木运行的RobotRuntime去驱动python传过来的命令运行，所以需要先构建webEditor)
# 目前是利用了空积木运行的RobotRuntime去驱动python传过来的命令运行，后续需要sivan同步下空积木运行的RobotRuntime的部分实现逻辑到TGEWebRuntime。
cd BrowserAssets/webEditor
npm i
npm run build

```

### 2. 依赖安装
* Python环境安装，要求Python3。https://www.python.org/
* pip安装Python运行时依赖的库：nest_asyncio、websockets
```
pip install nest_asyncio
pip install websockets
```

### 3. 确认配置
* 修改Python环境安装路径配置：

https://git.woa.com/FutureEdu/VirtualCompetition/blob/wynne/python_v1/Assets/Scripts/Runtime/v2/TGEPythonMgr.cs#L14

需要修改这里的pythonMacPath/pythonWinPath为本机的路径

（后续等sivan开发了“python3.6环境安装到用户机器”这个功能就可以固定路径了）

如果不清楚具体安装路径，可以用下面的命令行，参考现有配置修改：

mac
```
which python 或者 which python3
```

window
```
python -c "import os, sys; print(os.path.dirname(sys.executable))"
```

* C#代码中WebSocket服务器监听的端口需要和Python运行时请求的端口保持一致
[C#代码中WebSocket服务器监听的端口](https://git.woa.com/FutureEdu/VirtualCompetition/blob/wynne/python_v1/Assets/Scripts/Runtime/v2/TGEWebAdapter.cs#L12)
[Python运行时请求的端口](https://git.woa.com/wynnechen/tge_py/blob/master/coding_runtime.py#L31)



### 4. 启动运行
* 从Unity工程中的Boostrap场景启动（从游戏场景进入可能会有兼容问题，demo暂时未处理）
* 点击主界面的课程，任选一个课程进入游戏场景
* 切换到左下角的代码编辑Tab，即可看到Python代码编辑器
<img width="" src="/uploads/A9F3EA778A08410F899A1418C6F53AF4/image.png" alt="image.png" />

* 可以修改Python代码后，点击右侧红色的“运行Python代码“按钮。

#### 目前只支持python的内置库和以下接口：
```
# 切换Max机器人足式/轮式形态
max.state(mode)

# 设置Max机器人速度
max.speed(mode, speed)

# 设置Max机器人神态（播动画）
max.action(anim)

# 等待n秒
coding.wait(second)
```

### 5.如果还想体验代码提示，可以按以下步骤操作：

1. 安装依赖python-lsp-server，参考https://github.com/python-lsp/python-lsp-server

```
pip install python-lsp-server
pip install "python-lsp-server[all]"
```


2. 在Assets/Python目录运行pylsp
```
cd Assets/Python
pylsp --ws --port 7788
```
注意这里的port需要和Python编辑器工程代码中保持一致。

[Python编辑器工程代码port的位置](https://git.woa.com/wynnechen/tge-python-editor/blob/master/src/app.tsx#L57)

如果有修改端口的话，需要重新构建Python编辑器工程。

```
cd BrowserAssets/pages/tge-python-editor
npm i
npm run build
```


3. 参考上面的步骤，重新启动TGE工程，进入游戏主场景，切换到代码编辑器，即可体验到代码提示。
##### 内置函数的提示

<img width="" src="/uploads/6B1AB4F6654042B4B1B4775FD8F21D7D/image.png" alt="image.png" />

<img width="" src="/uploads/EDD79D51018C49DBA0206F87FFCC845F/image.png" alt="image.png" />


##### TGE接口的提示

<img width="" src="/uploads/D52C0432FAEF4722A7FA02346E6AFCCF/image.png" alt="image.png" />

<img width="" src="/uploads/D1AE681B74EB4C4CACC36B812494DCE3/image.png" alt="image.png" />

<img width="" src="/uploads/5C9BE4EA38124EC7A1D0985DA4F4FC9F/image.png" alt="image.png" />



### 6. 问题解决

1. 如果进入游戏场景，有报错端口被占用的情况，需要手动关闭占用的进程或者换端口。

window查看端口占用的进程命令：
```
netstat -aof | findstr :7799
```


