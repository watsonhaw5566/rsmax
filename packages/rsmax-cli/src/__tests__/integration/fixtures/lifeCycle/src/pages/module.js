import { View } from 'rsmax';
import { usePageEvent } from '@rsmax/macro';

export default function () {
  usePageEvent('onShareAppMessage', () => {
    console.log('onShareAppMessage');
  });

  return <View>module</View>;
}
