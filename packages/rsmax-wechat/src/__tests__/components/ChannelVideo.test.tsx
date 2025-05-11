import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ChannelVideo } from '../../hostComponents';

describe('ChannelVideo', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ChannelVideo feedId="id" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
