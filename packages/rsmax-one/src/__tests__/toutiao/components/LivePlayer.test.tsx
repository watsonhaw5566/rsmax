import React from 'react';
import TestRenderer from 'react-test-renderer';
import { LivePlayer } from '../../../hostComponents/toutiao';

describe('LivePlayer', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<LivePlayer src={'www.123.com'}>text</LivePlayer>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
