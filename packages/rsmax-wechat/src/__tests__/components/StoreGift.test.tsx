import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StoreGift } from '../../hostComponents';

describe('StoreGift', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<StoreGift />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});