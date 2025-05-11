import * as React from 'react';
import { View } from 'rsmax/one';
import Badge from 'antd-mini/es/badge';

console.log('greeting2');
export default ({ name }) => {
  return (
    <View id="greeting">
      <View>Hello {name}</View>
      <Badge>
        <View slot="inner">Rsmax</View>
      </Badge>
    </View>
  );
};
