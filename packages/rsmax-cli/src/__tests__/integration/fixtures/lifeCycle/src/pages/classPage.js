import React from 'react';
import { View } from 'rsmax';
import hoc from './hoc';

class ClassPage extends React.Component {
  onShow() {}

  onHide = () => {};

  onShareAppMessage() {}

  onPageScroll() {}

  render() {
    return <View>class page</View>;
  }
}

export default hoc(ClassPage);
