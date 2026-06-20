import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemberButton } from '../../hostComponents';

describe('MemberButton', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<MemberButton shopId={'1'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
