import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { OpenDataItem } from '../../hostComponents';

describe('OpenDataItem', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<OpenDataItem />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});