import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StickySection } from '../../hostComponents';

describe('StickySection', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<StickySection />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});