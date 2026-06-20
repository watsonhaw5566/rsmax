import React from 'react';
import TestRenderer from 'react-test-renderer';
import { CouponCard } from '../../hostComponents';

describe('CouponCard', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<CouponCard shopId={'1'} couponId={'1'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
