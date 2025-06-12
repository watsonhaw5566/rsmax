import B from '@/components/b';
import G from '@/components/g';
import * as React from 'react';
import { View } from 'rsmax/one';

// 测试存在 common chunk 的情况

export default () => (
  <View>
    <G />
    <B />
  </View>
);
