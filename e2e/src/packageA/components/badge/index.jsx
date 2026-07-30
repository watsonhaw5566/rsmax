import { useState } from '@rsmax/runtime';

export default function PackageBadge({ text, type = 'success' }) {
  const [hovered, setHovered] = useState(false);

  return (
    <view class={`badge badge-${type}`}>
      <text class="badge-text">{text}</text>
    </view>
  );
}
