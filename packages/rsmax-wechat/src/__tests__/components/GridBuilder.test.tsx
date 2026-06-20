import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { GridBuilder } from '../../hostComponents';

describe('GridBuilder', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<GridBuilder className="class">text</GridBuilder>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
