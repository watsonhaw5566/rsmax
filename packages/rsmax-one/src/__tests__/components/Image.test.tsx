import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Image } from '../../hostComponents';

describe('Image', () => {
  it('render correctly in ali', () => {
    process.env.RSMAX_PLATFORM = 'ali';
    const testRenderer = TestRenderer.create(
      <Image
        className="class"
        onError={() => {
          // ignore
        }}
        onLoad={() => {
          // ignore
        }}
      />
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('render correctly in wechat', () => {
    process.env.RSMAX_PLATFORM = 'wechat';
    const testRenderer = TestRenderer.create(
      <Image
        className="class"
        onError={() => {
          // ignore
        }}
        onLoad={() => {
          // ignore
        }}
      />
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('render correctly in toutiao', () => {
    process.env.RSMAX_PLATFORM = 'toutiao';
    const testRenderer = TestRenderer.create(
      <Image
        className="class"
        onError={() => {
          // ignore
        }}
        onLoad={() => {
          // ignore
        }}
      />
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
