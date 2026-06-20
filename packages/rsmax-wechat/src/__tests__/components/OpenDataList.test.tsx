import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { OpenDataList } from '../../hostComponents';

describe('OpenDataList', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<OpenDataList className="class" type={'groupMembers'}  members={[]}>text</OpenDataList>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
