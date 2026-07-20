import { RuntimeOptions } from '@rsmax/framework-shared';

const platform = RuntimeOptions.get('platform');

let stopPullDownRefresh: () => void;

switch (platform) {
  case 'ali':
    stopPullDownRefresh = (my as any).stopPullDownRefresh;
    break;
  case 'toutiao':
    stopPullDownRefresh = (tt as any).stopPullDownRefresh;
    break;
  case 'wechat':
    stopPullDownRefresh = (wx as any).stopPullDownRefresh;
    break;
  default:
    stopPullDownRefresh = () => {};
}

export default stopPullDownRefresh;
