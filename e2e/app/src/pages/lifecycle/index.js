import * as React from 'react';
import { usePageEvent } from 'remax/macro';
import { View } from 'rsmax/one';
import { GlobalContext } from '../../GlobalContext';

export default () => {
  const [value, setValue] = React.useState('');
  const { name } = React.useContext(GlobalContext);

  usePageEvent('onShow', () => {
    setValue('show');
  });

  return (
    <View>
      <View>{name}</View>
      <View>{value}</View>
    </View>
  );
};
