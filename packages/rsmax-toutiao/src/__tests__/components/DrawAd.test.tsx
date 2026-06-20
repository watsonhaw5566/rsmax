import React from 'react';
import TestRenderer from 'react-test-renderer';
import { DrawAd } from '../../hostComponents';

describe('DrawAd', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<DrawAd unitId={'123'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
