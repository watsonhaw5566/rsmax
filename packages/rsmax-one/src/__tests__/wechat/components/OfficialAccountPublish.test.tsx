import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { OfficialAccountPublish } from '../../../hostComponents/wechat';

describe('OfficialAccountPublish', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<OfficialAccountPublish className="class" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
