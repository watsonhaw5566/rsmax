import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { NestedScrollBody } from '../../../hostComponents/wechat';

describe('NestedScrollBody', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<NestedScrollBody className="class">text</NestedScrollBody>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
