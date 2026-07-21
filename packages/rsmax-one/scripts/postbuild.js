const path = require('node:path');
const fs = require('node:fs');

function copyAssetsInDir(outputRoot, fsPath) {
  fs.readdirSync(fsPath).forEach(fileName => {
    const filePath = path.join(fsPath, fileName);

    if (fs.statSync(filePath).isDirectory()) {
      const outputDir = path.join(outputRoot, fileName);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      copyAssetsInDir(outputDir, filePath);
    } else if (fileName.endsWith('.css')) {
      const outputDir = path.dirname(outputRoot);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      fs.createReadStream(filePath).pipe(fs.createWriteStream(path.join(outputRoot, fileName)));
    }
  });
}

copyAssetsInDir(path.resolve(__dirname, '../esm/'), path.resolve(__dirname, '../src'));
copyAssetsInDir(path.resolve(__dirname, '../cjs/'), path.resolve(__dirname, '../src'));
