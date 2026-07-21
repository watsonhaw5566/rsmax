import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { FunctionalPageNavigator } from '../../../hostComponents/wechat';

describe('FunctionalPageNavigator', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<FunctionalPageNavigator />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
