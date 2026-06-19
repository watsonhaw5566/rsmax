import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { VoipChat } from '../../hostComponents';

describe('VoipChat', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<VoipChat roomId="id" />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
