const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
const ConfigGenerator = require('./generators/ConfigGenerator');
const VueGenerator = require('./generators/VueGenerator');
const ReactGenerator = require('./generators/ReactGenerator');
const { createDirectories } = require('./utils/fileUtils');

class CLI {
  constructor() {
    this.projectName = '';
    this.framework = '';
    this.useTypeScript = false;
    this.projectPath = '';
  }

  async run() {
    console.log('🚀 欢迎使用 Chalee CLI 工具');
    console.log('');

    await this.getProjectInfo();
    await this.createProject();
    this.installDependencies();
    this.showCompletionMessage();
  }

  async getProjectInfo() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => {
      return new Promise((resolve) => {
        rl.question(prompt, resolve);
      });
    };

    try {
      this.projectName = await question('📁 项目名称: ');
      
      console.log('🎯 选择框架:');
      console.log('1. Vue');
      console.log('2. React');
      
      const frameworkChoice = await question('请选择 (1/2): ');
      this.framework = frameworkChoice === '1' ? 'vue' : 'react';
      
      console.log('');
      console.log('📝 是否使用 TypeScript?');
      console.log('1. 是');
      console.log('2. 否');
      
      const tsChoice = await question('请选择 (1/2): ');
      this.useTypeScript = tsChoice === '1';
      
      console.log(`✅ 创建 ${this.framework.toUpperCase()} 项目: ${this.projectName}`);
      console.log(`📝 TypeScript: ${this.useTypeScript ? '是' : '否'}`);
      
    } finally {
      rl.close();
    }

    this.projectPath = path.join(process.cwd(), this.projectName);
  }

  async createProject() {
    // 创建项目目录
    if (!fs.existsSync(this.projectPath)) {
      fs.mkdirSync(this.projectPath, { recursive: true });
    }

    // 创建目录结构
    createDirectories(this.projectPath, this.useTypeScript);
    
    // 生成配置文件
    const configGen = new ConfigGenerator(this.projectPath, this.projectName, this.framework, this.useTypeScript);
    configGen.generateAll();
    
    // 生成框架相关文件
    if (this.framework === 'vue') {
      const vueGen = new VueGenerator(this.projectPath, this.projectName, this.useTypeScript);
      vueGen.generateAll();
    } else {
      const reactGen = new ReactGenerator(this.projectPath, this.projectName, this.useTypeScript);
      reactGen.generateAll();
    }
  }

  installDependencies() {
    console.log('📦 正在安装依赖...');
    
    try {
      process.chdir(this.projectPath);
      execSync('npm install', { stdio: 'inherit' });
      console.log('✅ 依赖安装完成');
    } catch (error) {
      console.error('❌ 依赖安装失败:', error.message);
      console.log('请手动运行: cd', this.projectName, '&& npm install');
    }
  }

  showCompletionMessage() {
    console.log('');
    console.log('🎉 项目创建成功！');
    console.log('');
    console.log('📂 项目目录:', this.projectName);
    console.log('🛠  框架:', this.framework.toUpperCase());
    console.log('📝 TypeScript:', this.useTypeScript ? '是' : '否');
    console.log('🎨 样式:', 'Tailwind CSS');
    console.log('');
    console.log('🚀 开始开发:');
    console.log(`   cd ${this.projectName}`);
    console.log('   npm run dev');
    console.log('');
    console.log('📦 构建生产版本:');
    console.log('   npm run build');
    console.log('');
    
    if (this.useTypeScript) {
      console.log('💡 TypeScript 提示:');
      console.log('   - 类型检查: npm run type-check');
      console.log('   - 配置文件: tsconfig.json');
      console.log('');
    }
  }
}

module.exports = CLI;