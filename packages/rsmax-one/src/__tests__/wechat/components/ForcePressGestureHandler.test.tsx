import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ForcePressGestureHandler } from '../../../hostComponents/wechat';

describe('ForcePressGestureHandler', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ForcePressGestureHandler className="class">text</ForcePressGestureHandler>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
