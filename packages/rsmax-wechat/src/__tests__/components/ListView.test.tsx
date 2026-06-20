import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ListView } from '../../hostComponents';

describe('ListView', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ListView className="class">text</ListView>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
