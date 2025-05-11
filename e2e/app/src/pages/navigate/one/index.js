import { View, Text, navigateTo } from 'rsmax/one';

export default () => {
  return (
    <View id="btn" onTap={() => navigateTo({ url: '/pages/navigate/two/index' })}>
      page one
    </View>
  );
};
