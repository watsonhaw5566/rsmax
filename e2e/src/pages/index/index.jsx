import { useState } from '@rsmax/runtime';

export default function Index() {
  const [motto] = useState('Hello JSX for WeChat Mini Program!');
  const [count, setCount] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [features] = useState(['JSX Syntax', 'Native Tags', 'Event Binding', 'List Rendering', 'Hooks API']);

  const handleTap = () => {
    setCount(count + 1);
  };

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const goToTodos = () => {
    wx.navigateTo({
      url: '/pages/todos/todos'
    });
  };

  const goToHooks = () => {
    wx.navigateTo({
      url: '/pages/hooks/hooks'
    });
  };

    const goToUIDemo = () => {
        wx.navigateTo({
            url: '/pages/ui-demo/ui-demo'
        });
    };

    const goToStoreDemo = () => {
        wx.navigateTo({
            url: '/pages/store-demo/index'
        });
    };

  return (
    <view class="container">
      <view class="header">
        <text class="title">Welcome to Rsmax JSX</text>
        <text class="subtitle">{motto}</text>
      </view>

      <view class="card" onClick={handleTap}>
        <text class="count-text">Count: {count}</text>
        <text class="hint">Click me to increment!</text>
      </view>

      <view class="section">
        <button onClick={toggleDetail}>
          {showDetail ? 'Hide Detail' : 'Show Detail'}
        </button>

        {showDetail ? (
          <view class="detail">
            <text>This is a demo showing JSX compilation to WXML.</text>
            <text>Features: event binding, data binding, conditional rendering.</text>
          </view>
        ) : null}
      </view>

        <view className="section">
            <view className="nav-link" onClick={goToTodos}>
                <text>Go to Todo List →</text>
            </view>
            <view className="nav-link" onClick={goToHooks}>
                <text>Hooks Demo (Functional Component) →</text>
            </view>
            <view className="nav-link" onClick={goToUIDemo}>
                <text>Go to UI Demo →</text>
            </view>
            <view className="nav-link" onClick={goToStoreDemo}>
                <text>rsmax-store 状态管理 Demo →</text>
            </view>
        </view>

        <view class="list-section">
            <text class="list-title">Features:</text>
            {features.map((item, idx) => (
                <view className="list-item" key={idx}>
                    <text>• {item}</text>
                </view>
            ))}
        </view>
    </view>
  );
}
