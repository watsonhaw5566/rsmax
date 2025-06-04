import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Ad } from '../../hostComponents';

describe('Ad', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Ad unitId={'123'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
