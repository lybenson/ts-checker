# tsconfig

在项目根目录下运行 `tsc --init` 可以快速创建 `tsconfig.json` 文件，该文件指定了编译项目所需的根目录下的文件以及编译选项。如:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "ts-node": {
    "esm": true,
    "experimentalSpecifierResolution": "node"
  },
  "include": ["src"]
}
```

## 字段详解

|     属性名      |                                                                 说明                                                                 |
| :-------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
|      files      |                                                指明需要 tsc 编译的一个或多个 ts 文件                                                 |
|     include     |                                                指明需要被 tsc 编译的文件或文件夹列表                                                 |
|     exclude     |                          排除不需要 tsc 编译的文件或文件夹列表(仅排除 include 包含的文件，对 files 无影响)                           |
|  compileOnSave  |                                                 是否需要在保存时候自动触发 tsc 编译                                                  |
|     extends     | **继承**已有的 `tsconfig` 配置规则文件，例如官方推荐的包[@tsconfig/recommended](https://www.npmjs.com/package/@tsconfig/recommended) |
| compilerOptions |                                                 编译选项，其值为一个对象，详细见下文                                                 |

## compilerOptions

|         属性名         | 说明                                                                                                                                                                                                                                                                                     |
| :--------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         target         | 经过 TSC 编译后的 **ECMAScript** 代码语法版本, 可设置为`ESNext` 或 `Es2015` 或 `Es2016` 或 `Es3` 等                                                                                                                                                                                      |
|          lib           | 需要支持的 **ECMAScript** 语法或环境对应的类型声明文件，例如浏览器中的对象 `window`、`document`等，这些全局对象对于 `tsc` 默认是不能识别的，因此需要手动添加                                                                                                                             |
|         module         | 编译后的代码应该符合何种模块化方案, 可选值有 `none`, `commonjs`, `amd`, `system`, `umd`, `es2015`, `es2020`, 或 `ESNext`等                                                                                                                                                               |
|    esModuleInterop     | 是否支持合成导入，假设存在 `commonjs` 模块，当使用 `esm` 代码引入该模块时，由于 `commonjs` 模块没有默认导出内容，因此需要自动化合成该模块的导出。具体内容可以查看这篇文章 [esModuleInterop 到底做了什么？](https://zhuanlan.zhihu.com/p/148081795)                                       |
|    moduleResolution    | 声明如何处理模块，即指定模块的解析策略:可设置的值有：<br />- `classic`(不建议使用)<br />- `node16` or `nodenext`: 兼容`require` 导入 <br />- `bundler`: 同`node16` 和 `nodenext`，但不需要文件拓展名<br />- `node10`: 之前称为`node`）适用于早于v10的Node.js版本，这些版本仅支持 require |
|        baseUrl         | 设置基本目录以解析非绝对模块名称                                                                                                                                                                                                                                                         |
|         paths          | 用于设置模块名或路径映射列表，这样就可以简写项目中自定义模块的文件路径。                                                                                                                                                                                                                 |
|        rootDir         | 指定 `TypeScript` 识别读取的根目录，用于所有非声明输入文件的最长公共路径                                                                                                                                                                                                                 |
|         outDir         | 输出目录，即 `tsc` 编译后的文件输出的文件夹路径                                                                                                                                                                                                                                          |
|          jsx           | 如果是有 `jsx` 语法需要支持的项目，可以设置值 `preserve`、`react` 等                                                                                                                                                                                                                     |
|     importHelpers      | 是否启用从 `tslib` 库引入语法降级辅助函数，以避免重复冗余的辅助函数声明                                                                                                                                                                                                                  |
| experimentalDecorators | 是否使用实验性用装饰器模式。                                                                                                                                                                                                                                                             |
|         noEmit         | 是否输出 `js` 文件，一般是设置为 `false`，将打包等工作交给 `Webpack` 等工具                                                                                                                                                                                                              |
