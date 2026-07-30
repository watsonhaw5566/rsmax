import { useState, useEffect } from '@rsmax/runtime';

export default function PackageDetail() {
  const [loaded, setLoaded] = useState(false);
  const [pageTitle] = useState('Sub-package Detail');

  useEffect(() => {
    setLoaded(true);
    console.log('[SubPackage] Detail page mounted');
  }, []);

  const goBack = () => {
    wx.navigateBack();
  };

  return (
    <view class="container">
      <view class="header">
        <text class="title">{pageTitle}</text>
        <text class="subtitle">This page is loaded from a sub-package</text>
      </view>

      <view class="card">
        <text class="section-title">Sub-package Info</text>
        <view class="info-row">
          <text class="label">Status:</text>
          <text class="value">{loaded ? '✅ Loaded' : '⏳ Loading...'}</text>
        </view>
        <view class="info-row">
          <text class="label">Package:</text>
          <text class="value">packageA</text>
        </view>
        <view class="info-row">
          <text class="label">Path:</text>
          <text class="value">packageA/pages/detail/index</text>
        </view>
      </view>

      <view class="card">
        <text class="section-title">Features Working:</text>
        <view class="feature-item">
          <text>✓ JSX compilation in sub-package</text>
        </view>
        <view class="feature-item">
          <text>✓ useState / useEffect Hooks</text>
        </view>
        <view class="feature-item">
          <text>✓ Runtime path resolution (../../rsmax-runtime.js)</text>
        </view>
        <view class="feature-item">
          <text>✓ Style compilation & wxss output</text>
        </view>
      </view>

      <view class="btn-area">
        <button class="back-btn" onClick={goBack}>← Go Back</button>
      </view>
    </view>
  );
}
