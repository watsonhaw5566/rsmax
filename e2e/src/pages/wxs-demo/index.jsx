import { useState } from '@rsmax/runtime';
import math from './math.wxs';
import str from './str.wxs';

export default function WxsDemo() {
  const [num, setNum] = useState(5);
  const [price] = useState(99.9);

  const increment = () => {
    setNum(num + 1);
  };

  const decrement = () => {
    setNum(num - 1);
  };

  return (
    <view class="container">
      <view class="header">
        <text class="title">WXS 模块支持</text>
        <text class="subtitle">通过 import 引用外部 WXS 文件</text>
      </view>

      <view class="card">
        <text class="section-title">数学计算 (math.wxs)</text>
        <view class="counter">
          <button class="btn-sub" onClick={decrement}>-</button>
          <text class="count-text">{num}</text>
          <button class="btn-add" onClick={increment}>+</button>
        </view>
        <view class="result-box">
          <text>双倍值: {math.double(num)}</text>
          <text>加 10: {math.add(num, 10)}</text>
          <text>乘 3: {math.multiply(num, 3)}</text>
        </view>
      </view>

      <view class="card">
        <text class="section-title">价格格式化</text>
        <view class="price-display">
          <text class="price">{math.formatPrice(price)}</text>
        </view>
      </view>

      <view class="card">
        <text class="section-title">字符串处理 (str.wxs)</text>
        <view class="result-box">
          <text>大写: {str.toUpperCase('hello wxs')}</text>
          <text>截断: {str.truncate('This is a very long text for demo', 15)}</text>
        </view>
      </view>

      <view class="card info-card">
        <text class="info-title">使用方式</text>
        <text class="info-text">import moduleName from './path.wxs'</text>
        <text class="info-text">编译器自动在 WXML 头部注入 wxs 标签引用</text>
        <text class="info-text">WXS 文件与页面 JSX 放在同一目录即可</text>
      </view>
    </view>
  );
}
