import { View, Text } from 'rsmax';
import { use } from '../shared/util';
import '../shared/common.css';
export default () => (
  <View>
    <Text>{use()}</Text>
  </View>
);
