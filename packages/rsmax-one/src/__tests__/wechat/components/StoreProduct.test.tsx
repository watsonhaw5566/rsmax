import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StoreProduct } from '../../../hostComponents/wechat';

describe('StoreProduct', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<StoreProduct className="class" appid={'123'} productId={'456'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
