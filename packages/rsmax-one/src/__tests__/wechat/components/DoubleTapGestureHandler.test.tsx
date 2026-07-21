import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { DoubleTapGestureHandler } from '../../../hostComponents/wechat';

describe('DoubleTapGestureHandler', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<DoubleTapGestureHandler className="class">text</DoubleTapGestureHandler>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
