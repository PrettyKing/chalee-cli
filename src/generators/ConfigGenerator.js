const path = require('path');
const { writeFile } = require('../utils/fileUtils');

class ConfigGenerator {
  constructor(projectPath, projectName, framework) {
    this.projectPath = projectPath;
    this.projectName = projectName;
    this.framework = framework;
  }

  generateAll() {
    this.generatePackageJson();
    this.generateWebpackConfig();
    this.generateTailwindConfig();
    this.generatePostCSSConfig();
    this.generateHTMLTemplate();
    this.generateMainCSS();
  }

  generatePackageJson() {
    const packageJson = {
      name: this.projectName,
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        "dev": "webpack serve --mode development",
        "build": "webpack --mode production",
        "build:dev": "webpack --mode development"
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        "webpack": "^5.88.0",
        "webpack-cli": "^5.1.4",
        "webpack-dev-server": "^4.15.1",
        "html-webpack-plugin": "^5.5.3",
        "css-loader": "^6.8.1",
        "style-loader": "^3.3.3",
        "postcss": "^8.4.24",
        "postcss-loader": "^7.3.3",
        "tailwindcss": "^3.3.0",
        "autoprefixer": "^10.4.14"
      },
      dependencies: {}
    };

    if (this.framework === 'vue') {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        "vue-loader": "^17.2.2",
        "@vue/compiler-sfc": "^3.3.4",
        "vue-template-compiler": "^2.7.14"
      };
      packageJson.dependencies.vue = "^3.3.4";
    } else if (this.framework === 'react') {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        "babel-loader": "^9.1.2",
        "@babel/core": "^7.22.5",
        "@babel/preset-env": "^7.22.5",
        "@babel/preset-react": "^7.22.5"
      };
      packageJson.dependencies = {
        ...packageJson.dependencies,
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      };
    }

    writeFile(
      path.join(this.projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
  }

  generateWebpackConfig() {
    const webpackConfig = `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
${this.framework === 'vue' ? "const { VueLoaderPlugin } = require('vue-loader');" : ''}

module.exports = {
  entry: './src/index.js',
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
      },${this.framework === 'vue' ? `
      {
        test: /\\.vue$/,
        loader: 'vue-loader',
      },` : ''}${this.framework === 'react' ? `
      {
        test: /\\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },` : ''}
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),${this.framework === 'vue' ? `
    new VueLoaderPlugin(),` : ''}
  ],
  resolve: {
    extensions: ['.js', '.jsx'${this.framework === 'vue' ? ', \'.vue\'' : ''}],
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