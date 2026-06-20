import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RateButton } from '../../hostComponents';

describe('RateButton', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<RateButton />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
