import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { GridView } from '../../hostComponents';

describe('GridView', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<GridView type="masonry" crossAxisCount={2} mainAxisGap={8} crossAxisGap={8} />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});