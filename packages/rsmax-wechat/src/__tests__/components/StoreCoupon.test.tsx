import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StoreCoupon } from '../../hostComponents';

describe('StoreCoupon', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<StoreCoupon />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});