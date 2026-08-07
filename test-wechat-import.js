const { Form, Input, Label, Text, View } = require('./packages/rsmax/wechat.js');
console.log('导入的组件:');
console.log('  Form:', typeof Form);
console.log('  Input:', typeof Input);
console.log('  Label:', typeof Label);
console.log('  Text:', typeof Text);
console.log('  View:', typeof View);

if (Form && Input && Label && Text && View) {
  console.log('\n✅ 所有组件导入成功！');
} else {
  console.log('\n❌ 部分组件导入失败！');
  process.exit(1);
}
