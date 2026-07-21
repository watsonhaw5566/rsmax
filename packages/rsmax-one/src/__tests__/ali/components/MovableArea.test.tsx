import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { MovableArea } from '../../../hostComponents/ali';

describe('MovableArea', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<MovableArea width={10} height={10} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
