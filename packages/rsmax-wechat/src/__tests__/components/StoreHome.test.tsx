import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { StoreHome } from '../../hostComponents';

describe('StoreHome', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<StoreHome className="class" appid={'123'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
