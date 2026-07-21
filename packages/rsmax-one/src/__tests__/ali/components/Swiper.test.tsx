import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Swiper } from '../../../hostComponents/ali';

describe('Swiper', () => {
  it('render correctly', () => {
    const testRenderer = TestRenderer.create(<Swiper />);

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
