import { join } from 'path';
import pluginTester from 'babel-plugin-tester';
// @ts-ignore
import plugin from 'babel-plugin-macros';

pluginTester({
  pluginName: '@rsmax/macro',
  plugin,
  fixtures: join(__dirname, 'fixtures'),
  snapshot: true,
  endOfLine: 'preserve',
});
