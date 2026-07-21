import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { GridView } from '../../../hostComponents/wechat';

describe('GridView', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<GridView className="class">text</GridView>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
