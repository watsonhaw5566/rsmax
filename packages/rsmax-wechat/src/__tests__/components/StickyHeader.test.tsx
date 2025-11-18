import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StickyHeader } from '../../hostComponents';

describe('StickyHeader', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(
      <StickyHeader offsetTop={0} allowOverlapping={false} padding={[0, 0, 0, 0]} />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});