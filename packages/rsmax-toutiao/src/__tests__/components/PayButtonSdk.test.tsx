import React from 'react';
import TestRenderer from 'react-test-renderer';
import { PayButtonSdk } from '../../hostComponents';

describe('PayButtonSdk', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<PayButtonSdk />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
