import React from 'react';
import TestRenderer from 'react-test-renderer';
import { SafeArea } from '../../hostComponents';

describe('SafeArea', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<SafeArea />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
