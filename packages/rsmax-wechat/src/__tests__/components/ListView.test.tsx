import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ListView } from '../../hostComponents';

describe('ListView', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ListView padding={[0, 0, 0, 0]} />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});