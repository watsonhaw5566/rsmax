import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { View } from '../../hostComponents';

describe('View', () => {
  it('render correctly in ali', () => {
    process.env.RSMAX_PLATFORM = 'ali';
    const testRenderer = TestRenderer.create(
      <View
        className="class"
        onTap={() => {
          // ignore
        }}
        onLongTap={() => {
          // ignore
        }}
        onTouchStart={() => {
          // ignore
        }}
        onTouchMove={() => {
          // ignore
        }}
        onTouchEnd={() => {
          // ignore
        }}
        onTouchCancel={() => {
          // ignore
        }}
      >
        view
      </View>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('render correctly in wechat', () => {
    process.env.RSMAX_PLATFORM = 'wechat';
    const testRenderer = TestRenderer.create(
      <View
        className="class"
        onTap={() => {
          // ignore
        }}
        onLongTap={() => {
          // ignore
        }}
        onTouchStart={() => {
          // ignore
        }}
        onTouchMove={() => {
          // ignore
        }}
        onTouchEnd={() => {
          // ignore
        }}
        onTouchCancel={() => {
          // ignore
        }}
      >
        view
      </View>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('render correctly in toutiao', () => {
    process.env.RSMAX_PLATFORM = 'toutiao';
    const testRenderer = TestRenderer.create(
      <View
        className="class"
        onTap={() => {
          // ignore
        }}
        onLongTap={() => {
          // ignore
        }}
        onTouchStart={() => {
          // ignore
        }}
        onTouchMove={() => {
          // ignore
        }}
        onTouchEnd={() => {
          // ignore
        }}
        onTouchCancel={() => {
          // ignore
        }}
      >
        view
      </View>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('render correctly in web', () => {
    process.env.RSMAX_PLATFORM = 'web';
    const testRenderer = TestRenderer.create(
      <View
        className="class"
        onTap={() => {
          // ignore
        }}
        onLongTap={() => {
          // ignore
        }}
        onTouchStart={() => {
          // ignore
        }}
        onTouchMove={() => {
          // ignore
        }}
        onTouchEnd={() => {
          // ignore
        }}
        onTouchCancel={() => {
          // ignore
        }}
      >
        view
      </View>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
