import { useAppEvent } from '@rsmax/runtime';
useAppEvent('onShow', () => {});
useAppEvent('onHide', function onHide() {});
useAppEvent('onUnload', () => {});
