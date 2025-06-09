import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MatchMedia } from '../../hostComponents';

describe('MatchMedia', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<MatchMedia>text</MatchMedia>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
