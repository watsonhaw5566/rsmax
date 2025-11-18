import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { GridBuilder } from '../../hostComponents';

describe('GridBuilder', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(
      <GridBuilder type="aligned" list={[1, 2, 3]} childCount={3} crossAxisCount={2} mainAxisGap={8} crossAxisGap={8} />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});