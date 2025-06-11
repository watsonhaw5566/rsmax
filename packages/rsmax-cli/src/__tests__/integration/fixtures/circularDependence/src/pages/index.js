import { View } from 'rsmax';
import { A } from './circularDependency1';
import { C } from './circularDependency2';

export default () => {
  return (
    <View>
      {A}
      {C}
    </View>
  );
};
