import React from 'react';
import TestRenderer from 'react-test-renderer';
import { AwemeUserCard } from '../../hostComponents';

describe('AwemeUserCard', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<AwemeUserCard awemeId="test-aweme-id" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
