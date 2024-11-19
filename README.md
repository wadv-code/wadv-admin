# wadv-admin

::: danger 注意

注意存放代码的目录及所有父级目录不能存在中文、韩文、日文以及空格，否则安装依赖后启动会出错。

:::

### 安装依赖

在你的代码目录内打开终端，并执行以下命令:

```bash
# 进入项目目录
cd wadv-admin

# 使用项目指定的pnpm版本进行依赖安装
corepack enable

# 安装依赖
pnpm install
```

- 项目只支持使用 `pnpm` 进行依赖安装，默认会使用 `corepack` 来安装指定版本的 `pnpm`。:
- 如果你的网络环境无法访问npm源，你可以设置系统的环境变量`COREPACK_REGISTRY=https://registry.npmmirror.com`，然后再执行`pnpm install`。
- 如果你不想使用`corepack`，你需要禁用`corepack`，然后使用你自己的`pnpm`进行安装。

:::

### 运行项目

#### 选择项目

执行以下命令运行项目:

```bash
# 启动项目
pnpm dev
```

此时，你会看到类似如下的输出，选择你需要运行的项目：

```bash
│
◆  Select the app you need to run [dev]:
│  ● @wadv/admin
│  ○ @wadv/web
│  ○ @wadv/docs
└
```

现在，你可以在浏览器访问 `http://localhost:5173` 查看项目。

#### 运行指定项目

如果你不想选择项目，可以直接运行以下命令运行你需要的应用：

```bash
pnpm run dev:admin
pnpm run dev:web
pnpm run dev:docs
```
