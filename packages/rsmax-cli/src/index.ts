import type { Options } from '@rsmax/types';
import yargs from 'yargs';
import API from './API';
import { buildMiniPlugin, internalBuildApp } from './build';
import getConfig from './getConfig';

export { buildMini, buildMiniComponent } from './build';
export { getDefaultOptions } from './defaultOptions';

export default class RsmaxCLI {
  options?: Options;
  api?: API;

  run(args: any, callback?: yargs.ParseCallback) {
    const argv: any = require('yargs-parser')(args);

    const targetArg = argv.t || argv.target;
    const targets = Array.isArray(targetArg) ? targetArg : [targetArg || 'ali'];
    process.env.RSMAX_PLATFORM = targets[0];

    this.options = getConfig();
    this.options.compressTemplate = this.options.compressTemplate ?? argv.minimize;

    if (targetArg) {
      this.options.target = Array.isArray(targetArg) ? targetArg : targetArg;
    }

    this.api = new API();
    const cli = this.initCLI();
    this.api.registerPlugins(this.options.plugins);
    this.api.extendCLI(cli);
    if (args.length === 0) {
      cli.showHelp();
    }
    return cli.parse(args, callback);
  }

  initCLI() {
    return yargs
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
              describe: '目标平台，支持: wechat, ali, toutiao，可指定多个',
              alias: 't',
              type: 'array',
              string: true,
              default: ['ali'],
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
            });
        },
        (argv: any) => {
          const options = { ...this.options, ...argv };
          if (argv.target && argv.target.length === 1) {
            options.target = argv.target[0];
          }
          internalBuildApp(options, this.api!);
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
              describe: '目标平台，支持: wechat, ali, toutiao，可指定多个',
              alias: 't',
              type: 'array',
              string: true,
              default: ['ali'],
            });
          },
          (argv: any) => {
            const options = { ...this.options, ...argv };
            if (argv.target && argv.target.length === 1) {
              options.target = argv.target[0];
            }
            buildMiniPlugin(options);
          }
        );
      })
      .help();
  }
}
