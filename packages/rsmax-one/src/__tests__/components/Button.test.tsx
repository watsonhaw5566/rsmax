import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Button } from '../../hostComponents';

describe('Button', () => {
  it('render correctly in wechat', () => {
    process.env.RSMAX_PLATFORM = 'wechat';
    const testRenderer = TestRenderer.create(<Button className="class">Button</Button>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('render correctly in ali', () => {
    process.env.RSMAX_PLATFORM = 'ali';
    const testRenderer = TestRenderer.create(<Button className="class">Button</Button>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('render correctly in toutiao', () => {
    process.env.RSMAX_PLATFORM = 'toutiao';
    const testRenderer = TestRenderer.create(<Button className="class">Button</Button>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('render correctly in web', () => {
    process.env.RSMAX_PLATFORM = 'web';
    const testRenderer = TestRenderer.create(<Button className="class">Button</Button>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
