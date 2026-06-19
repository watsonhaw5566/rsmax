import React from 'react';
import TestRenderer from 'react-test-renderer';
import { AwemeData } from '../../hostComponents';

describe('AwemeData', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<AwemeData awemeId="test-aweme-id" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
