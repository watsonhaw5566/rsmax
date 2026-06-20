import React from 'react';
import TestRenderer from 'react-test-renderer';
import { AwemeData } from '../../hostComponents';

describe('AwemeData', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<AwemeData type="liveStatus" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
