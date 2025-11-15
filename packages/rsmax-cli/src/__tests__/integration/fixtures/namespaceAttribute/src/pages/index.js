import { View } from 'rsmax';
import NativeComponent from '@/components/native-component';
import './index.module.css';

export default function Index() {
  const props = {};
  return (
    <>
      <View />
      <NativeComponent ns:prop="ns:value" {...props} />
    </>
  );
}
