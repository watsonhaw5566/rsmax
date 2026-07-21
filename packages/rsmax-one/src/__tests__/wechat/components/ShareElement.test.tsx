import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ShareElement } from '../../../hostComponents/wechat';

describe('ShareElement', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ShareElement key="key" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
