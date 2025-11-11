import React from 'react';
import { View, Text } from 'rsmax';

export default () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('bazinga!');
  }

  return (
    <View>
      <Text>{process.env.NODE_ENV}</Text>
      <Text>{process.env.RSMAX_APP_HELLO}</Text>
      <Text>{process.env.RSMAX_APP_MESSAGE}</Text>
    </View>
  );
};
