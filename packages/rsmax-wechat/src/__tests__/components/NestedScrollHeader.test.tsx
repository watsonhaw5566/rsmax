import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { NestedScrollHeader } from '../../hostComponents';

describe('NestedScrollHeader', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<NestedScrollHeader />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});