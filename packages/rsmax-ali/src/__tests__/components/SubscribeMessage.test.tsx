import React from 'react';
import TestRenderer from 'react-test-renderer';
import { SubscribeMessage } from '../../hostComponents';

describe('SubscribeMessage', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<SubscribeMessage templateId={'123'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
