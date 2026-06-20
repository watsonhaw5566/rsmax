import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ListBuilder } from '../../hostComponents';

describe('ListBuilder', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ListBuilder className="class">text</ListBuilder>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
