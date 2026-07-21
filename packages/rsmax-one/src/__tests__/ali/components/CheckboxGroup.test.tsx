import React from 'react';
import TestRenderer from 'react-test-renderer';
import { CheckboxGroup } from '../../../hostComponents/ali';

describe('CheckboxGroup', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<CheckboxGroup />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
