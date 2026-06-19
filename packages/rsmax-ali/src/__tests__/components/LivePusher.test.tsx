import React from 'react';
import TestRenderer from 'react-test-renderer';
import { LivePusher } from '../../hostComponents';

describe('LivePusher', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<LivePusher url="test" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
