import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ChannelLive } from '../../hostComponents';

describe('ChannelLive', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ChannelLive feedId="id" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
