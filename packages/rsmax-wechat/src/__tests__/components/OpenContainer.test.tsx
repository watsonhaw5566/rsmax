import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { OpenContainer } from '../../hostComponents';

describe('OpenContainer', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(
      <OpenContainer closedColor="white" openColor="white" transitionDuration={300} transitionType="fade" />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});