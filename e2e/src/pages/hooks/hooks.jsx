import { useState, useEffect, usePageEvent } from '@rsmax/runtime';
import dayjs from 'dayjs';

export default function HooksDemo() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('Hooks Demo');

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(c => c - 1);
  };

  const goBack = () => {
    wx.navigateBack();
  };

  useEffect(() => {
    console.log('HooksDemo mounted, count:', count);
    return () => {
      console.log('HooksDemo cleanup');
    };
  }, [count]);

  usePageEvent('onShow', () => {
    console.log('HooksDemo page show');
    console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  });

  return (
    <view class="container">
      <view class="header">
        <text class="title">{title}</text>
      </view>

      <view class="counter">
        <button onClick={decrement}>-</button>
        <text class="count-text">{count}</text>
        <button onClick={increment}>+</button>
      </view>

      <view class="nav-section">
        <view class="nav-link" onClick={goBack}>
          <text>← Back to Home</text>
        </view>
      </view>
    </view>
  );
}
