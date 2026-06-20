import React from 'react';
import TestRenderer from 'react-test-renderer';
import { IndustryMemberButton } from '../../hostComponents';

describe('IndustryMemberButton', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<IndustryMemberButton shopId={'1'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
