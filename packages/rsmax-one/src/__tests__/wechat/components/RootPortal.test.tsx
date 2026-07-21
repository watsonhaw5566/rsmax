import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { RootPortal } from '../../../hostComponents/wechat';

describe('RootPortal', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<RootPortal enable={true} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
