#!/usr/bin/env node

const cac = require('cac');
const path = require('node:path');
const { compile, watch, clean } = require('@rsmax/compiler');
const {logger} = require('rslog');


const cli = cac('rsmax');

cli
  .command('build <source>', 'Build the mini program project')
  .option('-o, --output <output>', 'Output directory', { default: 'dist' })
  .action(async (source, options) => {
    const sourceDir = path.resolve(process.cwd(), source);
    const outputDir = path.resolve(process.cwd(), options.output);
    try {
      await compile(sourceDir, outputDir);
    } catch (err) {
      logger.error('Build failed:', err);
      process.exit(1);
    }
  });

cli
  .command('dev <source>', 'Development mode with watch')
  .option('-o, --output <output>', 'Output directory', { default: 'dist' })
  .action(async (source, options) => {
    const sourceDir = path.resolve(process.cwd(), source);
    const outputDir = path.resolve(process.cwd(), options.output);
    try {
      await watch(sourceDir, outputDir);
    } catch (err) {
      logger.error('Dev server error:', err);
      process.exit(1);
    }
  });

cli
  .command('clean [output]', 'Clean the output directory')
  .option('-o, --output <output>', 'Output directory', { default: 'dist' })
  .action(async (output, options) => {
    const targetDir = output ? path.resolve(process.cwd(), output) : path.resolve(process.cwd(), options.output);
    try {
      await clean(targetDir);
    } catch (err) {
      logger.error('Clean failed:', err);
      process.exit(1);
    }
  });

cli.help();
cli.version('0.1.0');

cli.parse();
