import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { DragTarget } from '../../hostComponents';

describe('DragTarget', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<DragTarget tag="test" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
