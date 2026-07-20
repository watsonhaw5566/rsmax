import { View, Text, Image } from '@rsmax/wechat';
import styles from './index.module.css';
import logo from '../../../public/icon.png';

export default () => {
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <Image src={logo} className={styles.logo} alt="logo" />
        <View className={styles.text}>
          编辑 <Text>src/pages/index/index.js</Text> 开始 321
        </View>
      </View>
    </View>
  );
};
