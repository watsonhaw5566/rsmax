import { buildApp, JEST_BUILD_TIMEOUT, buildMiniPlugin, buildMiniComponent } from './build';
import type { Platform } from '@rsmax/types';
import Store from '@rsmax/build-store';

export function testBuildApp(
  app: string,
  target: Platform = 'ali',
  options?: any,
  extraRemaxOptions?: any
) {
  it(
    `build ${app} on target ${target}`,
    async () => {
      Store.reset();
      const result = await buildApp(app, target, options, extraRemaxOptions);
      // 修改为使用快照测试匹配器
      expect(result).toMatchSnapshotOutput();
    },
    JEST_BUILD_TIMEOUT
  );
}

export function testBuildMiniPlugin(app: string, target: Platform = 'ali', options?: any) {
  it(
    `build ${app} on target ${target}`,
    async () => {
      Store.reset();
      const result = await buildMiniPlugin(app, target, options);
      // 修改为使用快照测试匹配器
      expect(result).toMatchSnapshotOutput();
    },
    JEST_BUILD_TIMEOUT
  );
}

type Inputs = { [k: string]: string };

export function testBuildMiniComponent(
  app: string,
  inputs: Inputs,
  targets: Platform[] = ['ali'],
  options: any = {}
) {
  targets.forEach(target => {
    it(
      `build ${app} on target ${target}`,
      async () => {
        Store.reset();
        const result = await buildMiniComponent(app, inputs, target, options);
        // 修改为使用快照测试匹配器
        expect(result).toMatchSnapshotOutput();
      },
      JEST_BUILD_TIMEOUT
    );
  });
}
