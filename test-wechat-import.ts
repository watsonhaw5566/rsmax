import { Form, Input, Label, Text, View } from './packages/rsmax/wechat';

function test() {
  const form: typeof Form = Form;
  const input: typeof Input = Input;
  const label: typeof Label = Label;
  const text: typeof Text = Text;
  const view: typeof View = View;
  console.log('所有组件导入成功:', !!form, !!input, !!label, !!text, !!view);
}

test;
