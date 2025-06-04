import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { EditorPortal } from '../../hostComponents';

describe('EditorPortal', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<EditorPortal key={'key'} />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
