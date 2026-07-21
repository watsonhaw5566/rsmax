import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ContactButton } from '../../../hostComponents/ali';

describe('ContactButton', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ContactButton tntInstId="" scene="" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
