import { useStore } from '@rsmax/runtime';
import { counterStore } from '../../stores/counter';
import './store-demo.wxss';

export default function StoreDemo() {
  const count = useStore(counterStore, (s) => s.count);

  const increment = () => counterStore.getState().increment();
  const decrement = () => counterStore.getState().decrement();
  const reset = () => counterStore.getState().reset();
  const add5 = () => counterStore.getState().incrementBy(5);
  const add10 = () => counterStore.getState().incrementBy(10);

  return (
    <view class="container">
      <view class="card">
        <text class="title">rsmax-store 状态管理</text>
        <text class="subtitle">类 Zustand API · 持久化存储</text>
      </view>

      <view class="card">
        <text class="counter-label">当前计数</text>
        <text class="counter-value">{count}</text>
      </view>

      <view class="card">
        <view class="btn-row">
          <button class="btn btn-primary" onTap={increment}>+1</button>
          <button class="btn btn-danger" onTap={decrement}>-1</button>
        </view>
        <view class="btn-row">
          <button class="btn btn-secondary" onTap={reset}>重置</button>
          <button class="btn btn-primary" onTap={add5}>+5</button>
          <button class="btn btn-primary" onTap={add10}>+10</button>
        </view>
      </view>

      <view class="card tip-card">
        <text class="tip-title">💡 持久化说明</text>
        <text class="tip-text">计数器的值通过 persist 中间件自动保存到 wx.setStorageSync。退出小程序后重新打开，数值会自动恢复。</text>
      </view>
    </view>
  );
}
