import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { NestedScrollHeader } from '../../../hostComponents/wechat';

describe('NestedScrollHeader', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<NestedScrollHeader className="class">text</NestedScrollHeader>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
