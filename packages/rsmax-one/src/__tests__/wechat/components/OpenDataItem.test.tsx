import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { OpenDataItem } from '../../../hostComponents/wechat';

describe('OpenDataItem', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<OpenDataItem className="class" index={0}  type="userNickName">text</OpenDataItem>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
