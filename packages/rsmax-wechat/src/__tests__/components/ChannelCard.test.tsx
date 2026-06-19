import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ChannelCard } from '../../hostComponents';

describe('ChannelCard', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ChannelCard feedId="id" finderUserName="xxx" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
