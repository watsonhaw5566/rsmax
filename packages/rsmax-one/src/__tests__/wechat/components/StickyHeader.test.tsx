import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StickyHeader } from '../../../hostComponents/wechat';

describe('StickyHeader', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<StickyHeader className="class">text</StickyHeader>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
