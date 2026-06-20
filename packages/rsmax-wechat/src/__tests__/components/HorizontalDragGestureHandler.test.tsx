import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { HorizontalDragGestureHandler } from '../../hostComponents';

describe('HorizontalDragGestureHandler', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<HorizontalDragGestureHandler className="class">text</HorizontalDragGestureHandler>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
