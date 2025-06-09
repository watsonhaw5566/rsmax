import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RootPortal } from '../../hostComponents';

describe('RootPortal', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<RootPortal />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
