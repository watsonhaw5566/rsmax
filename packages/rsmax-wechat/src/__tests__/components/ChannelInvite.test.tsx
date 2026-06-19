import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ChannelInvite } from '../../hostComponents';

describe('ChannelInvite', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ChannelInvite buttonText="邀请好友" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
