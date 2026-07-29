import styles from './index.module.less';

export default function DemoHeader({ title, subtitle }) {
  return (
    <view class={styles.header}>
      <text class={styles.title}>{title}</text>
      {subtitle ? <text class={styles.subtitle}>{subtitle}</text> : null}
    </view>
  );
}
