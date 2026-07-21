import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StoreCoupon } from '../../../hostComponents/wechat';

describe('StoreCoupon', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<StoreCoupon className="class"  appid={'123'} couponId={'456'}/>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
