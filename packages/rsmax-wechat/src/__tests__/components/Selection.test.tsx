import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Selection } from '../../hostComponents';

describe('Selection', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Selection className="class">text</Selection>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
