import { View } from 'rsmax';
import { usePageEvent } from '@rsmax/macro';
import './module';

export default () => {
  usePageEvent('onShow', () => {
    console.log('on show');
  });

  usePageEvent('onShareTimeline', () => {
    console.log('onShareTimeline');
  });

  return <View>view</View>;
};
