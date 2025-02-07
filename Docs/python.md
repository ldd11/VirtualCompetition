## TGE支持Python方案设计
---


### 1. 代码运行

#### 1. 通讯机制
<img width="" src="/uploads/01261D89917744E1A37296B397CAA297/image.png" alt="image.png" />


###  2. 流程控制

> 1. 用户点击运行代码后，TGE会从Python编辑器获取用户写的代码，保存到工作目录/user_code.py，然后通过`python user_code.py`拉起Python进程。

> 2. Python进程执行是，会先初始化Python运行时，然后连接TGE的Websocket服务器。

> 3. Python运行时发送`Start`请求，TGE准备完成后回复`Start`响应，就开始可以执行用户编写的代码。

> 4. 用户编写的代码，使用到codingtge.py的接口，都会转换成一条请求协议，发送给TGE。

#### 3. 同步机制

为了确保Python运行时能和TGE执行同步，设计了**请求同步**和**数据同步**的机制。

> **1. 请求同步**


> 用户编写的代码，使用到codingtge.py的接口，都会转换成协程代码，创建一条请求协议，发送给TGE:

>   * Python运行时发送请求协议会携带**id=x**字段（每次发送协议的时候id都会递增）

>   * TGE收到**id=x**的请求后，根据业务逻辑处理请求：

>   -- 需要等待执行结果的，等待执行结束后发送回复响应，响应中带上**req_id=x**作为标识(例如“等待n秒”功能)

>   -- 不需要等待执行结果的，立即发送回复响应，响应中带上**req_id=x**作为标识（例如“设置速度”功能）

>   * Python运行时发送请求协议后，会通过创建一个[asyncio.Event](https://docs.python.org/3/library/asyncio-sync.html#event)卡住当前协程，进而卡住用户后续代码的执行，需要等待TGE回复同样的req_id才会设置event.set(),恢复原有协程的执行,进而恢复用户后续代码执行。

> **2. 数据同步**

>   TGE定时/按需通过发送'sync_data'协议，同步机器狗和场景相关的数据，给Python运行时保存。

##### 举例说明：

左侧的代码最终的运行过程

<img width="" src="/uploads/0962B9D50BFD4F95B7062ED6A973911C/image.png" alt="image.png" />


#### 4. 协议设计

* 协议的基础字段
```
interface ProtocolMessage {
  id: number; // 消息id
  type: 'request' | 'response' | 'event' | 'sync_data' ; // 消息类型
}
```

* 请求
```
interface Request extends ProtocolMessage {
  type: 'request';
  command: string;   // 请求的命令，例如：PlayAnimation｜SetMotionMode｜SetRateInFoot｜SetRateInWheel
  arguments?: [any]; // 请求的命令参数
}
```

* 响应
```
interface Response extends ProtocolMessage {
  type: 'response';
  req_id: number;   // 对应请求的id
  success: boolean; // 请求的结果
  command: string;  // 请求的命令
  message?: string; // 请求的结果说明
  body?: any;       // TODO:待定
}
```

* 事件
```
interface Event extends ProtocolMessage {
  type: 'event';
  name: string; // 事件名
  args: any;    // TODO:待定
}
```

* 同步数据
```
interface SyncData extends ProtocolMessage {
  type: 'sync_data';
  key: string;   // 数据key
  value: any;    // 数据value
}
```

#### 5. codingtge.py接口设计

TODO!


### 2. 代码编辑

> **1. 基础编辑功能**

> 基于[monaco-editor](https://microsoft.github.io/monaco-editor/index.html)实现。

> **2.智能提示功能**

> 基于[monaco-languageclient](https://github.com/TypeFox/monaco-languageclient/)连接本地的[python-lsp-server](https://github.com/python-lsp/python-lsp-server)实现。
> 底层原理：[Language Server Protocol](https://microsoft.github.io/language-server-protocol/)。
> <img width="" src="/uploads/E38396B098694FC2AB56DA137DB1E7E1/image.png" alt="image.png" />
