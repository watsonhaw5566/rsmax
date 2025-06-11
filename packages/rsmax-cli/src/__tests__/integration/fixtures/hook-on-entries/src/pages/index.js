import React from 'react';
import { View } from 'rsmax';
import styles from './index.css';

function timesTwo(arr) {
  return arr.map(n => n * 2);
}

export default () => {
  console.log(timesTwo([1, 2, 3]));

  return <View className={styles.hello}>hello</View>;
};
