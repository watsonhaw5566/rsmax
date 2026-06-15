const fs = require('node:fs');
const path = require('node:path');

const readDir = fs.readdirSync(path.join(__dirname, '../packages'));

const packages = readDir.map(s => {
  const pkg = require(path.join(__dirname, '../packages', s, 'package.json'));
  return { dir: s, name: pkg.name };
});

async function getPackageVersion(packageName) {
  const url = `https://registry.npmjs.com/${packageName}/latest`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(packageName, '(未发布)');
      return;
    }
    const data = await res.json();
    console.log(packageName, data.version);
  } catch (err) {
    console.log(packageName, `(查询失败: ${err.message})`);
  }
}

(async () => {
  await Promise.all(packages.map(pkg => getPackageVersion(pkg.name)));
})();
