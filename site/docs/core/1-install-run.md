import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 安装和运行

由于 `ts` 代码不能直接运行，通常需要将其转换为 `js` 代码再运行。而将 `ts` 代码转换为 `js` 代码的工具叫做 `tsc`

`tsc` 全称是 `TypeScript Compiler`, 即 `TypeScript` 编译器

## 安装

全局安装

<Tabs>
<TabItem value="npm" label="npm" default>

```shell
npm install -g typescript
```

</TabItem>
<TabItem value="yarn" label="yarn">

```shell
yarn global add typescript
```

</TabItem>
<TabItem value="pnpm" label="pnpm (recommend)">

```shell
pnpm add --global typescript
```

</TabItem>
</Tabs>

安装完成后，全局会有 `tsc` 命令, `tsc -h` 可查看命令详情

接下来创建文件 `main.ts` 写入下面的内容

```ts
const str: string = 'Hello, TypeScript!'
console.log(str)
```

通过命令 `tsc main.ts` 编译文件, 生成编译后的文件 `main.js`

在编译 `ts` 文件时的编译配置则是通过项目下的 `tsconfig.json` 文件进行配置的，了解配置详情见 [这里](./tsconfig)

可通过命令 `tsc --init` 生成默认的 `tsconfig.json` 文件

## ts-node

`ts-node` 是一个可以直接运行 `ts` 文件的命令。

安装

```shell
pnpm add --golbal ts-node
```

以上面的 `main.ts` 为例，终端输入

```shell
ts-node main.ts  // 打印: Hello, TypeScript!
```

尽管 `ts-node` 可直接运行 `ts` 文件，但对于浏览器环境仍需要编译的过程。

## 脚手架

这里提供一个脚手架工具 [ts-pure](https://github.com/lybenson/ts-pure)，可以避免安装上面提到的库，同时可以帮助我们快速创建纯 `ts` 项目
