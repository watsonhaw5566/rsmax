import React from 'react';
import TestRenderer from 'react-test-renderer';
import { JoinGroupChat } from '../../hostComponents';

describe('JoinGroupChat', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<JoinGroupChat templateId={'123'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
