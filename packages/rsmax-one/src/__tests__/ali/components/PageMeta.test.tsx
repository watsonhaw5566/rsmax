import React from 'react';
import TestRenderer from 'react-test-renderer';
import { PageMeta } from '../../../hostComponents/ali';

describe('PageMeta', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<PageMeta>text</PageMeta>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
