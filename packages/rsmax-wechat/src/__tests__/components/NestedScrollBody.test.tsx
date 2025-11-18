import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { NestedScrollBody } from '../../hostComponents';

describe('NestedScrollBody', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<NestedScrollBody offsetTop={10} />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});