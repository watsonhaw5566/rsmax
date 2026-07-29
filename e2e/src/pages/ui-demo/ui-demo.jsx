import {useEffect, useState} from '@rsmax/runtime';
import dayjs from 'dayjs';
import styles from './ui-demo.module.less';

export default function UiDemo() {
    const [count, setCount] = useState(0);
    const [switchOn, setSwitchOn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm:ss'));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs().format('HH:mm:ss'));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClick = () => {
        setCount(count + 1);
    };

    const handleLoadingClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const handleSwitchChange = (e) => {
        setSwitchOn(e.detail);
    };

    return (
        <view class={styles.page}>
            <demo-header title="Rsmax JSX" subtitle="rsmax.config.js 自定义组件映射演示"/>
            <van-cell-group inset>
                <van-cell title="Vant Weapp Demo" label="使用 npm 构建的 UI 组件库"/>
            </van-cell-group>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>按钮 Button</text>
                <view class={styles.row}>
                    <van-button type="primary" onClick={handleClick}>点击 {count}</van-button>
                </view>
                <view class={styles.row}>
                    <van-button type="default">默认</van-button>
                    <van-button type="primary">主要</van-button>
                    <van-button type="info">信息</van-button>
                    <van-button type="warning">警告</van-button>
                    <van-button type="danger">危险</van-button>
                </view>
                <view class={styles.row}>
                    <van-button type="primary" loading={loading} loadingText="加载中..." onClick={handleLoadingClick}>
                        点我加载
                    </van-button>
                    <van-button type="primary" disabled>禁用</van-button>
                    <van-button plain type="primary">朴素按钮</van-button>
                </view>
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>标签 Tag</text>
                <view class={styles.row}>
                    <van-tag type="primary">标签</van-tag>
                    <van-tag type="success">成功</van-tag>
                    <van-tag type="danger">危险</van-tag>
                    <van-tag type="warning">警告</van-tag>
                    <van-tag plain type="primary">朴素</van-tag>
                </view>
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>原生组件 Badge</text>
                <view class={styles.row}>
                    <demo-badge value="3"/>
                    <demo-badge value="99+"/>
                    <demo-badge value="NEW"/>
                    <demo-badge type="dot"/>
                </view>
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>单元格 Cell</text>
                <van-cell-group inset>
                    <van-cell title="单元格" value="内容"/>
                    <van-cell title="单元格" value="内容" label="描述信息" border={false}/>
                </van-cell-group>
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>开关 Switch（dayjs 实时时间）</text>
                <van-cell-group inset>
                    <van-cell title="开关状态" value={switchOn ? '开' : '关'}/>
                    <van-cell title="当前时间" value={currentTime}/>
                </van-cell-group>
                <view class={styles.row}>
                    <van-switch checked={switchOn} onChange={handleSwitchChange}/>
                </view>
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>进度条 Progress</text>
                <view class={styles.progressWrap}>
                    <van-progress percentage={count * 10 > 100 ? 100 : count * 10} color="#1989fa"/>
                </view>
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>通知栏 NoticeBar</text>
                <van-notice-bar text="欢迎使用 Rsmax JSX + Vant Weapp！" left-icon="volume-o"/>
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>卡片 Card</text>
                <van-card
                    num="2"
                    price="2.00"
                    desc="示例商品描述"
                    title="商品名称"
                    thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                />
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>分割线 Divider</text>
                <van-divider/>
                <van-divider contentPosition="center">分割线文字</van-divider>
                <van-divider contentPosition="left" hairline={false}>没有 hairline</van-divider>
            </view>

            <view class={styles.section}>
                <text class={styles.sectionTitle}>空状态 Empty</text>
                <van-empty description="描述文字"/>
            </view>
        </view>
    );
}
