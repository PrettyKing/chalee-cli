const path = require('path');
const { writeFile } = require('../utils/fileUtils');

class ReactGenerator {
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
    const indexJs = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`;

    writeFile(
      path.join(this.projectPath, 'src/index.js'),
      indexJs
    );
  }

  generateApp() {
    const appJs = `import React from 'react';
import Header from './components/Header';
import Welcome from './components/Welcome';

function App() {
  return (
    <div id="app">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Welcome />
      </main>
    </div>
  );
}

export default App;`;

    writeFile(
      path.join(this.projectPath, 'src/App.js'),
      appJs
    );
  }

  generateHeader() {
    const headerJsx = `import React from 'react';

function Header() {
  const title = '${this.projectName}';

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </header>
  );
}

export default Header;`;

    writeFile(
      path.join(this.projectPath, 'src/components/Header.jsx'),
      headerJsx
    );
  }

  generateWelcome() {
    const welcomeJsx = `import React, { useState } from 'react';

function Welcome() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        欢迎使用 React + Tailwind CSS！
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        这是一个使用 Webpack 构建的 React 项目模板
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">React 18</h3>
          <p className="text-gray-600">现代化的 React.js 库</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Tailwind CSS</h3>
          <p className="text-gray-600">实用优先的 CSS 框架</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Webpack</h3>
          <p className="text-gray-600">强大的模块打包工具</p>
        </div>
      </div>
      <button 
        onClick={handleClick}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        点击测试
      </button>
      {clicked && (
        <p className="mt-4 text-green-600 font-semibold">
          🎉 React 组件工作正常！
        </p>
      )}
    </div>
  );
}

export default Welcome;`;

    writeFile(
      path.join(this.projectPath, 'src/components/Welcome.jsx'),
      welcomeJsx
    );
  }
}

module.exports = ReactGenerator;