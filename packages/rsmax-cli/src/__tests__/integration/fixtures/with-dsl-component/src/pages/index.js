import React from 'react';
import { View, Image } from 'rsmax';
import Empty from 'empty';
import { Empty2 } from './empty';

export default function Index() {
  return (
    <View>
      <Image src={cat} />
      <Empty />
      <Empty2 />
    </View>
  );
}
