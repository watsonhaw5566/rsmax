import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { OfficialAccountPublish } from '../../hostComponents';

describe('OfficialAccountPublish', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<OfficialAccountPublish />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});