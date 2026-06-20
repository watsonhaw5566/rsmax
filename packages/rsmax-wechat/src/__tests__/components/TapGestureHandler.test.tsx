import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { TapGestureHandler } from '../../hostComponents';

describe('TapGestureHandler', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<TapGestureHandler className="class">text</TapGestureHandler>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
