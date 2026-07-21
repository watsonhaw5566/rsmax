import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { DraggableSheet } from '../../../hostComponents/wechat';

describe('DraggableSheet', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<DraggableSheet className="class">text</DraggableSheet>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
