import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { RtcRoom } from '../../hostComponents';

describe('RtcRoom', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<RtcRoom userId={'123'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
