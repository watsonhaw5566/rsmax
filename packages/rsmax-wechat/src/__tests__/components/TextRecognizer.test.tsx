import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { TextRecognizer } from '../../hostComponents';

describe('TextRecognizer', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<TextRecognizer />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
