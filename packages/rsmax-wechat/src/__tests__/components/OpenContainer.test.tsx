import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { OpenContainer } from '../../hostComponents';

describe('OpenContainer', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<OpenContainer className="class">text</OpenContainer>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
