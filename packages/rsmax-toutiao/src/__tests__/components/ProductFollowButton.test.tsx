import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ProductFollowButton } from '../../hostComponents';

describe('ProductFollowButton', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ProductFollowButton shopId={'1'} productId={'1'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
