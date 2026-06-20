import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ConsumeCard } from '../../hostComponents';

describe('ConsumeCard', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ConsumeCard orderId={'123'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
