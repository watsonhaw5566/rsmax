import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ShopFollowCard } from '../../hostComponents';

describe('ShopFollowCard', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ShopFollowCard shopId={'1'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
