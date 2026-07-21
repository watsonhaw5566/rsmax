import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { VoipRoom } from '../../../hostComponents/wechat';

describe('VoipRoom', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<VoipRoom openId="openId" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
