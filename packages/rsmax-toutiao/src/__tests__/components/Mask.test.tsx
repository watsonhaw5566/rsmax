import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Mask } from '../../hostComponents';

describe('Mask', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Mask>text</Mask>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
