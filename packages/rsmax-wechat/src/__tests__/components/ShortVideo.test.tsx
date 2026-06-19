import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { ShortVideo } from '../../hostComponents';

describe('ShortVideo', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<ShortVideo feedId="id" finderUserName="xxx" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
