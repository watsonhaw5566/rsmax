import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Checkbox } from '../../../hostComponents/toutiao';

describe('Checkbox', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Checkbox />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
