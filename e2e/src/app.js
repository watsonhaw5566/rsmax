import { initI18n } from '@rsmax/i18n';

initI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN'
});

App({
  onLaunch() {
    console.log('App launched');
  },
  globalData: {
    userInfo: null
  }
});
