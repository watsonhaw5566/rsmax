import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { LivePreview } from '../../hostComponents';

describe('LivePreview', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<LivePreview awemeId={'123'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
