import { View, Image } from 'rsmax';
import cat from '../assets/images/inline.jpg';
import './index.css';

export default function Index() {
  return (
    <View>
      <Image src={cat} />
    </View>
  );
}
