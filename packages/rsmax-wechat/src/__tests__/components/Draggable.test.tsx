import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Draggable } from '../../hostComponents';

describe('Draggable', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Draggable tag="test" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
