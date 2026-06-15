import React from 'react';
import { View, Text } from 'rsmax';
import styles from './index.module.css';
import './index.css';

export default () => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>CSS Modules Test</Text>
      <View className="normal-css">Normal CSS</View>
    </View>
  );
};
