import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Snapshot } from '../../hostComponents';

describe('Snapshot', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Snapshot mode={'view'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
