import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { DraggableSheet } from '../../hostComponents';

describe('DraggableSheet', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(
      <DraggableSheet initialChildSize={0.5} minChildSize={0.25} maxChildSize={1} snap={false} />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});