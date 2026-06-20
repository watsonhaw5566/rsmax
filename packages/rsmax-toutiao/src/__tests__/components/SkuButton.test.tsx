import React from 'react';
import TestRenderer from 'react-test-renderer';
import { SkuButton } from '../../hostComponents';

describe('SkuButton', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<SkuButton shopId={'1'} productId={'1'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
