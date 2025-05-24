const fs = require('fs');
const path = require('path');

function createDirectories(projectPath, useTypeScript = false) {
  const dirs = [
    'src',
    'src/components',
    'src/styles',
    'public',
    'dist'
  ];

  // 如果使用 TypeScript，添加类型目录
  if (useTypeScript) {
    dirs.push('src/types');
  }

  dirs.forEach(dir => {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

module.exports = {
  createDirectories,
  writeFile
};