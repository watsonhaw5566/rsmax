import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Map } from '../../../hostComponents/ali';

describe('Map', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Map />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
