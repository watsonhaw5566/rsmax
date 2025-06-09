import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ErrorView } from '../../hostComponents';

describe('ErrorView', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ErrorView>text</ErrorView>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
