import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { LongPressGestureHandler } from '../../hostComponents';

describe('LongPressGestureHandler', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<LongPressGestureHandler className="class">text</LongPressGestureHandler>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
