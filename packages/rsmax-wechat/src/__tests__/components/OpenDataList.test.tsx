import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { OpenDataList } from '../../hostComponents';

describe('OpenDataList', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<OpenDataList type="groupMembers" members={["id1", "id2"]} />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});