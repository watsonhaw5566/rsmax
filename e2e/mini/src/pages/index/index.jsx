import { api, Image, Text, View } from 'rsmax/one';
import styles from './index.module.css';
import logo from '../../../public/icon.png';

export default () => {
  function handleClick() {
    console.log('hello rsmax');
    api
      .showToast({
        title: 'hello rsmax',
      })
      .then();
  }
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <Image src={logo} className={styles.logo} alt="logo" />
        <View className={styles.text}>
          编辑 <Text>src/pages/index/index.js</Text> 开始 123
        </View>
      </View>
      <View onTap={handleClick}>点击我</View>
    </View>
  );
};
