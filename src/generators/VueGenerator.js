const path = require('path');
const { writeFile } = require('../utils/fileUtils');

class VueGenerator {
  constructor(projectPath, projectName) {
    this.projectPath = projectPath;
    this.projectName = projectName;
  }

  generateAll() {
    this.generateEntryFile();
    this.generateApp();
    this.generateHeader();
    this.generateWelcome();
  }

  generateEntryFile() {
    const indexJs = `import { createApp } from 'vue';
import App from './App.vue';
import './styles/main.css';

createApp(App).mount('#app');`;

    writeFile(
      path.join(this.projectPath, 'src/index.js'),
      indexJs
    );
  }

  generateApp() {
    const appVue = `<template>
  <div id="app">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <Welcome />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Welcome from './components/Welcome.vue';

export default {
  name: 'App',
  components: {
    Header,
    Welcome,
  },
};
</script>`;

    writeFile(
      path.join(this.projectPath, 'src/App.vue'),
      appVue
    );
  }

  generateHeader() {
    const headerVue = `<template>
  <header class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      title: '${this.projectName}',
    };
  },
};
</script>`;

    writeFile(
      path.join(this.projectPath, 'src/components/Header.vue'),
      headerVue
    );
  }

  generateWelcome() {
    const welcomeVue = `<template>
  <div class="text-center">
    <h2 class="text-4xl font-bold text-gray-800 mb-4">
      欢迎使用 Vue + Tailwind CSS！
    </h2>
    <p class="text-lg text-gray-600 mb-8">
      这是一个使用 Webpack 构建的 Vue 项目模板
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Vue 3</h3>
        <p class="text-gray-600">现代化的 Vue.js 框架</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Tailwind CSS</h3>
        <p class="text-gray-600">实用优先的 CSS 框架</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Webpack</h3>
        <p class="text-gray-600">强大的模块打包工具</p>
      </div>
    </div>
    <button 
      @click="handleClick"
      class="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
    >
      点击测试
    </button>
    <p v-if="clicked" class="mt-4 text-green-600 font-semibold">
      🎉 Vue 组件工作正常！
    </p>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    handleClick() {
      this.clicked = !this.clicked;
    },
  },
};
</script>`;

    writeFile(
      path.join(this.projectPath, 'src/components/Welcome.vue'),
      welcomeVue
    );
  }
}

module.exports = VueGenerator;