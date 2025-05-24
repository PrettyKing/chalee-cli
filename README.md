# Chalee CLI

🚀 一个快速创建基于 Webpack 的前端项目脚手架工具，支持 Vue 3 和 React 18，预配置 TailwindCSS，现已支持 TypeScript！

## ✨ 特性

- 🎯 **多框架支持** - 支持 Vue 3 和 React 18
- 📝 **TypeScript 支持** - 可选的 TypeScript 配置
- 🎨 **预配置 TailwindCSS** - 开箱即用的实用优先 CSS 框架
- ⚡ **Webpack 5** - 现代化的模块打包工具
- 🔥 **热重载** - 开发时自动刷新
- 📦 **代码分割** - 自动优化打包体积
- 🛠 **开发友好** - 完整的开发环境配置

## 🚀 快速开始

### 全局安装

```bash
npm install -g chalee-cli
```

### 创建项目

```bash
chalee-cli
# 或者
chalee
```

按照提示：
1. 输入项目名称
2. 选择框架（Vue 或 React）
3. 选择是否使用 TypeScript

### 本地使用

如果不想全局安装，也可以直接克隆仓库使用：

```bash
git clone https://github.com/PrettyKing/chalee-cli.git
cd chalee-cli
node index.js
```

## 📂 生成的项目结构

### JavaScript 项目
```
project-name/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── components/         # 组件目录
│   │   ├── Header.vue/jsx  # 头部组件
│   │   └── Welcome.vue/jsx # 欢迎页组件
│   ├── styles/
│   │   └── main.css        # 主样式文件
│   ├── App.vue/js          # 根组件
│   └── index.js            # 入口文件
├── dist/                   # 构建输出目录
├── package.json
├── webpack.config.js       # Webpack 配置
├── tailwind.config.js      # Tailwind 配置
└── postcss.config.js       # PostCSS 配置
```

### TypeScript 项目
```
project-name/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── components/         # 组件目录
│   │   ├── Header.vue/tsx  # 头部组件
│   │   └── Welcome.vue/tsx # 欢迎页组件
│   ├── styles/
│   │   └── main.css        # 主样式文件
│   ├── types/
│   │   └── index.d.ts      # 类型声明文件
│   ├── App.vue/tsx         # 根组件
│   └── index.ts/tsx        # 入口文件
├── dist/                   # 构建输出目录
├── package.json
├── webpack.config.js       # Webpack 配置
├── tailwind.config.js      # Tailwind 配置
├── postcss.config.js       # PostCSS 配置
└── tsconfig.json           # TypeScript 配置
```

## 📜 可用脚本

创建项目后，在项目目录中可以运行：

### `npm run dev`
启动开发服务器，默认在 http://localhost:3000

### `npm run build`
构建生产版本到 `dist` 目录

### `npm run build:dev`
构建开发版本（未压缩）

### `npm run type-check` (仅 TypeScript 项目)
运行 TypeScript 类型检查

## 🎨 TailwindCSS 使用

项目已预配置 Tailwind CSS，你可以直接使用所有 Tailwind 类：

```html
<!-- Vue 模板 -->
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Hello Tailwind!
</div>

<!-- React JSX -->
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Hello Tailwind!
</div>
```

## 📝 TypeScript 支持

### Vue + TypeScript
- 使用 Vue 3 Composition API 和 `<script setup lang="ts">`
- 完整的类型推导和检查
- Vue 组件类型声明

### React + TypeScript
- 使用 React 18 和 TypeScript 接口
- 完整的 Props 类型定义
- 事件处理类型安全

### TypeScript 配置
- 预配置的 `tsconfig.json`
- 路径别名支持 (`@/` 指向 `src/`)
- 严格模式启用
- 完整的类型声明文件

## ⚙️ 自定义配置

### 修改 Tailwind 配置

编辑 `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      },
    },
  },
  plugins: [],
}
```

### 修改 TypeScript 配置

编辑 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 修改 Webpack 配置

编辑 `webpack.config.js` 来添加更多功能，如：

- 额外的 TypeScript 配置
- 图片资源处理
- 字体加载
- 环境变量

## 🛠 系统要求

- Node.js >= 14.0.0
- npm >= 6.0.0

## 🆕 更新日志

### v1.1.0
- ✨ 新增 TypeScript 支持
- 🎨 改进 Vue 和 React 代码生成
- 📝 完善类型声明和配置
- 🔧 优化 Webpack 配置

### v1.0.0
- 🎉 初始版本发布
- 🚀 支持 Vue 3 和 React 18
- 🎨 集成 TailwindCSS
- ⚡ Webpack 5 构建系统

## 🐛 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **开发服务器启动失败**
   检查端口 3000 是否被占用，或修改 `webpack.config.js` 中的端口配置

3. **样式不生效**
   确保 Tailwind CSS 类名在 `tailwind.config.js` 的 `content` 配置中匹配

4. **TypeScript 编译错误**
   检查 `tsconfig.json` 配置和类型声明文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [Vue.js](https://vuejs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Webpack](https://webpack.js.org/)

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！