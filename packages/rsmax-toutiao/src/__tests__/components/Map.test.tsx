import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Map } from '../../hostComponents';

describe('Map', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Map latitude={123} longitude={123} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
