import React from 'react';
import { View } from 'rsmax';
import { unstable_batchedUpdates } from 'react-dom';

unstable_batchedUpdates(() => {});

export default () => {
  return <View />;
};
