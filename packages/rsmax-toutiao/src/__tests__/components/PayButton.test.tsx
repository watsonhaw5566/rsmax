import React from 'react';
import TestRenderer from 'react-test-renderer';
import { PayButton } from '../../hostComponents';

describe('PayButton', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<PayButton />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
