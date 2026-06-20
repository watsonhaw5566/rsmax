import React from 'react';
import TestRenderer from 'react-test-renderer';
import { PaymentChannelSelect } from '../../hostComponents';

describe('PaymentChannelSelect', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(
      <PaymentChannelSelect
        skuList={[{ skuId: '1', price: 100, title: 'test', type: 1, tagGroupId: '1' }]}
      />,
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
