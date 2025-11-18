import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ListBuilder } from '../../hostComponents';

describe('ListBuilder', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(
      <ListBuilder type="static" list={[1, 2, 3]} childCount={3} childHeight={[100, 100, 100]} initialChildCount={1} />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});