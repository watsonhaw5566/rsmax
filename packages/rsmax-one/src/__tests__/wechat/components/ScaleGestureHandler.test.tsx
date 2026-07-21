import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ScaleGestureHandler } from '../../../hostComponents/wechat';

describe('ScaleGestureHandler', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ScaleGestureHandler className="class">text</ScaleGestureHandler>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
