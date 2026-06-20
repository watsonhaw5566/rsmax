import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StoreGift } from '../../hostComponents';

describe('StoreGift', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<StoreGift className="class" presentOrderId={'123'} openId={'456'}/>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
