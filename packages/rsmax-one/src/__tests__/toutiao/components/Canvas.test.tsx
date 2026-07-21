import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Canvas } from '../../../hostComponents/toutiao';

describe('Canvas', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Canvas canvasId="id" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
