import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { PanGestureHandler } from '../../../hostComponents/wechat';

describe('PanGestureHandler', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<PanGestureHandler className="class">text</PanGestureHandler>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
