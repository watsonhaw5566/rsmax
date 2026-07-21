import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Audio } from '../../../hostComponents/wechat';

describe('Audio', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Audio />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
