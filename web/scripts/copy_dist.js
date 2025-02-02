const fs = require('fs');
const path = require('path');

// 定义源目录和目标目录
const srcDir = path.resolve(__dirname, '../dist'); // 源目录为 dist
const destDir = path.resolve(__dirname, '../..'); // 目标目录为上一层目录

// 复制文件夹的函数
function copyDirectory(src, dest) {
  // 确保目标目录存在
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // 获取源目录中的所有文件和文件夹
  const items = fs.readdirSync(src, { withFileTypes: true });

  items.forEach((item) => {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);

    if (item.isDirectory()) {
      // 如果是文件夹，递归复制
      copyDirectory(srcPath, destPath);
    } else {
      // 如果是文件，直接复制
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// 调用函数进行复制
copyDirectory(srcDir, destDir);
console.log('All files and directories copied successfully!');