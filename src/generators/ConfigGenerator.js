const path = require('path');
const { writeFile } = require('../utils/fileUtils');

class ConfigGenerator {
  constructor(projectPath, projectName, framework, useTypeScript = false) {
    this.projectPath = projectPath;
    this.projectName = projectName;
    this.framework = framework;
    this.useTypeScript = useTypeScript;
  }

  generateAll() {
    this.generatePackageJson();
    this.generateWebpackConfig();
    this.generateTailwindConfig();
    this.generatePostCSSConfig();
    this.generateHTMLTemplate();
    this.generateMainCSS();
    
    if (this.useTypeScript) {
      this.generateTSConfig();
      this.generateTypeDeclarations();
    }
  }

  generatePackageJson() {
    const packageJson = {
      name: this.projectName,
      version: "1.0.0",
      description: "",
      main: this.useTypeScript ? "index.ts" : "index.js",
      scripts: {
        dev: "webpack serve --mode development",
        build: "webpack --mode production",
        "build:dev": "webpack --mode development"
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        webpack: "^5.88.0",
        "webpack-cli": "^5.1.4",
        "webpack-dev-server": "^4.15.1",
        "html-webpack-plugin": "^5.5.3",
        "css-loader": "^6.8.1",
        "style-loader": "^3.3.3",
        postcss: "^8.4.24",
        "postcss-loader": "^7.3.3",
        tailwindcss: "^3.3.0",
        autoprefixer: "^10.4.14"
      },
      dependencies: {}
    };

    // TypeScript 依赖
    if (this.useTypeScript) {
      packageJson.scripts["type-check"] = "tsc --noEmit";
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        typescript: "^5.1.6",
        "ts-loader": "^9.4.4",
        "@types/node": "^20.4.2"
      };
    }

    // Vue 相关依赖
    if (this.framework === 'vue') {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        "vue-loader": "^17.2.2",
        "@vue/compiler-sfc": "^3.3.4"
      };
      
      if (this.useTypeScript) {
        packageJson.devDependencies["@vue/typescript-loader"] = "^2.0.0";
        packageJson.devDependencies["vue-tsc"] = "^1.8.8";
        packageJson.scripts["type-check"] = "vue-tsc --noEmit";
      }
      
      packageJson.dependencies.vue = "^3.3.4";
    }

    // React 相关依赖
    if (this.framework === 'react') {
      if (this.useTypeScript) {
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          "@types/react": "^18.2.15",
          "@types/react-dom": "^18.2.7"
        };
      } else {
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          "babel-loader": "^9.1.2",
          "@babel/core": "^7.22.5",
          "@babel/preset-env": "^7.22.5",
          "@babel/preset-react": "^7.22.5"
        };
      }
      
      packageJson.dependencies = {
        ...packageJson.dependencies,
        react: "^18.2.0",
        "react-dom": "^18.2.0"
      };
    }

    writeFile(
      path.join(this.projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
  }

  generateWebpackConfig() {
    const fileExtensions = this.useTypeScript ? '.ts,.tsx' : '.js,.jsx';
    const entryFile = this.useTypeScript ? './src/index.ts' : './src/index.js';
    
    let webpackConfig = `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
${this.framework === 'vue' ? "const { VueLoaderPlugin } = require('vue-loader');" : ''}

module.exports = {
  entry: '${entryFile}',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },`;

    // Vue 规则
    if (this.framework === 'vue') {
      webpackConfig += `
      {
        test: /\\.vue$/,
        loader: 'vue-loader',
      },`;
    }

    // TypeScript 规则
    if (this.useTypeScript) {
      webpackConfig += `
      {
        test: /\\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },`;
    }

    // React Babel 规则（仅当不使用 TypeScript 时）
    if (this.framework === 'react' && !this.useTypeScript) {
      webpackConfig += `
      {
        test: /\\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },`;
    }

    webpackConfig += `
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),${this.framework === 'vue' ? `
    new VueLoaderPlugin(),` : ''}
  ],
  resolve: {
    extensions: [${fileExtensions}${this.framework === 'vue' ? ', \'.vue\'' : ''}],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
  mode: process.env.NODE_ENV || 'development',
};`;

    writeFile(
      path.join(this.projectPath, 'webpack.config.js'),
      webpackConfig
    );
  }

  generateTSConfig() {
    if (!this.useTypeScript) return;

    const tsConfig = {
      compilerOptions: {
        target: "ES2020",
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        allowJs: false,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: "ESNext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        baseUrl: ".",
        paths: {
          "@/*": ["src/*"]
        }
      },
      include: [
        "src/**/*"
      ],
      exclude: [
        "node_modules",
        "dist"
      ]
    };

    // Vue 特定配置
    if (this.framework === 'vue') {
      tsConfig.compilerOptions.jsx = "preserve";
      tsConfig.compilerOptions.jsxImportSource = "vue";
    }

    // React 特定配置
    if (this.framework === 'react') {
      tsConfig.compilerOptions.jsx = "react-jsx";
    }

    writeFile(
      path.join(this.projectPath, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );
  }

  generateTypeDeclarations() {
    if (!this.useTypeScript) return;

    // 创建基础类型声明
    const indexDTs = `// 全局类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.scss' {
  const content: string
  export default content
}`;

    writeFile(
      path.join(this.projectPath, 'src/types/index.d.ts'),
      indexDTs
    );
  }

  generateTailwindConfig() {
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

    writeFile(
      path.join(this.projectPath, 'tailwind.config.js'),
      tailwindConfig
    );
  }

  generatePostCSSConfig() {
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    writeFile(
      path.join(this.projectPath, 'postcss.config.js'),
      postcssConfig
    );
  }

  generateHTMLTemplate() {
    const htmlTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.projectName}</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>`;

    writeFile(
      path.join(this.projectPath, 'public/index.html'),
      htmlTemplate
    );
  }

  generateMainCSS() {
    const mainCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

#app {
  @apply min-h-screen;
}`;

    writeFile(
      path.join(this.projectPath, 'src/styles/main.css'),
      mainCss
    );
  }
}

module.exports = ConfigGenerator;