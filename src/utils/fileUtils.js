const fs = require('fs');
const path = require('path');

function createDirectories(projectPath) {
  const dirs = [
    'src',
    'src/components',
    'src/styles',
    'public',
    'dist'
  ];

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