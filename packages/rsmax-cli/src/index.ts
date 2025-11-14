import type { Options } from '@rsmax/types';
import type { ParseCallback } from 'yargs';
import yargs from 'yargs/yargs';
import API from './API';
import { buildMiniPlugin, internalBuildApp } from './build';
import getConfig from './getConfig';

export * from './legacyExport';

export { buildMiniComponent } from './build';

export default class RsmaxCLI {
  options?: Options;
  api?: API;

  run(args: any, callback?: ParseCallback) {
    const pre = yargs(args)
      .help(false)
      .version(false)
      .parserConfiguration({ 'boolean-negation': true })
      .option('target', { alias: 't', type: 'string', default: 'ali' })
      .option('minimize', { alias: 'm', type: 'boolean', default: false })
      .parse();

    process.env.RSMAX_PLATFORM = pre.target;

    this.options = getConfig();
    this.options.compressTemplate = this.options.compressTemplate ?? pre.minimize;
    this.api = new API();
    const cli = this.initCLI(args);
    this.api.registerPlugins(this.options.plugins);
    this.api.extendCLI(cli);
    if (args.length === 0) {
      cli.showHelp();
    }
    return cli.parse(args, callback);
  }

  initCLI(args: any) {
    return yargs(args)
      .scriptName('rsmax')
      .usage('Usage: $0 <command> [options]')
      .command<any>(
        'build',
        '编译项目',
        y => {
          y.option('watch', {
            describe: '监听文件变化',
            alias: 'w',
            type: 'boolean',
            default: false,
          })
            .option('target', {
              describe: '目标平台',
              alias: 't',
              type: 'string',
              default: 'ali',
            })
            .option('notify', {
              describe: '编译错误提醒',
              alias: 'n',
              type: 'boolean',
              default: false,
            })
            .option('port', {
              describe: '指定端口号',
              alias: 'p',
              type: 'number',
            })
            .option('minimize', {
              describe: '最小化文件',
              alias: 'm',
              type: 'boolean',
              default: false,
            })
            .option('analyze', {
              describe: '编译分析',
              alias: 'a',
              type: 'boolean',
              default: false,
            })
            // .option('devtools', {
            //   describe: '启动 react-devtools 调试',
            //   alias: 'd',
            //   type: 'boolean',
            //   default: true,
            // })
            .option('loglevel', {
              describe: '展示日志级别',
              type: 'string',
              default: 'verbose',
            });
        },
        (argv: any) => {
          internalBuildApp({ ...this.options, ...argv }, this.api!);
        }
      )
      .command<any>('mini-plugin', '插件相关命令', y => {
        y.command(
          'build',
          '编译插件',
          y => {
            y.option('watch', {
              describe: '监听文件变化',
              alias: 'w',
              type: 'boolean',
              default: false,
            }).option('target', {
              describe: '目标平台',
              alias: 't',
              type: 'string',
            });
          },
          (argv: any) => {
            buildMiniPlugin({ ...this.options, ...argv });
          }
        );
      })
      .help();
  }
}
