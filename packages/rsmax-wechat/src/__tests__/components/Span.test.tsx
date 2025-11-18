import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Span } from '../../hostComponents';

describe('Span', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Span />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});