import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { VerticalDragGestureHandler } from '../../hostComponents';

describe('VerticalDragGestureHandler', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<VerticalDragGestureHandler className="class">text</VerticalDragGestureHandler>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
