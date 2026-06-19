import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Audio } from '../../hostComponents';

describe('Audio', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Audio src="https://example.com/audio.mp3" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
