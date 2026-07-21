import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Span } from '../../../hostComponents/wechat';

describe('Span', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Span className="class">text</Span>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
