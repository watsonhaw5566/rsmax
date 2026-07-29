import { useState, useEffect } from '@rsmax/runtime';
import { useI18n, t, getLocale, getI18n } from '@rsmax/i18n';

export default function I18nDemo() {
  const { t: i18nT, setLocale } = useI18n();
  const i18n = getI18n();
  const userName = 'Rsmax';

  const [currentLang, setCurrentLang] = useState(getLocale());
  const [greetingText, setGreetingText] = useState('');

  useEffect(() => {
    setGreetingText(i18n.t('page.i18n.greetingName', { name: userName }));
  }, []);

  const switchLang = (lang) => {
    setLocale(lang).then(() => {
      setCurrentLang(lang);
      setGreetingText(i18n.t('page.i18n.greetingName', { name: userName }));
      wx.showToast({
        title: i18nT('page.i18n.toastMessage', { lang: lang === 'zh-CN' ? '中文' : 'English' }),
        icon: 'none',
        duration: 1500
      });
    });
  };

  const switchToZh = () => switchLang('zh-CN');
  const switchToEn = () => switchLang('en');

  const goBack = () => {
    wx.navigateBack();
  };

  const showGreeting = () => {
    wx.showToast({
      title: i18nT('page.i18n.greetingName', { name: userName }),
      icon: 'none',
      duration: 2000
    });
  };

  return (
    <view class="container">
      <view class="header">
        <text class="title">{t('page.i18n.title')}</text>
      </view>

      <view class="card">
        <text class="card-title">{t('page.i18n.section.basic')}</text>
        <view class="card-body">
          <text class="text-primary">{t('page.i18n.hello')}</text>
          <text class="text-secondary">{t('page.i18n.welcome')}</text>
        </view>
      </view>

      <view class="card">
        <text class="card-title">{t('page.i18n.section.interpolation')}</text>
        <view class="card-body">
          <text class="text-secondary">{t('page.i18n.tapHint')}</text>
          <text class="text-highlight">{greetingText}</text>
          <button class="action-btn" onClick={showGreeting}>
            {t('page.i18n.showGreetingBtn')}
          </button>
        </view>
      </view>

      <view class="card">
        <text class="card-title">{t('page.i18n.section.nested')}</text>
        <view class="card-body">
          <text class="text-secondary">· {t('page.i18n.feature1')}</text>
          <text class="text-secondary">· {t('page.i18n.feature2')}</text>
          <text class="text-secondary">· {t('page.i18n.feature3')}</text>
          <text class="text-secondary">· {t('page.i18n.feature4')}</text>
        </view>
      </view>

      <view class="card">
        <text class="card-title">{t('page.i18n.section.switch')}</text>
        <view class="card-body">
          <text class="text-secondary">{t('page.i18n.currentLang')}: {currentLang}</text>
          <text class="text-secondary">{t('page.i18n.clickToSwitch')}</text>
          <view class="lang-row">
            <button class={`lang-btn ${currentLang === 'zh-CN' ? 'active' : ''}`} onClick={switchToZh}>
              {t('page.i18n.buttons.zhCN')}
            </button>
            <button class={`lang-btn ${currentLang === 'en' ? 'active' : ''}`} onClick={switchToEn}>
              {t('page.i18n.buttons.en')}
            </button>
          </view>
        </view>
      </view>

      <text class="footer-text">{t('page.i18n.footer')}</text>

      <view class="nav-section">
        <view class="nav-link" onClick={goBack}>
          <text>{t('page.i18n.back')}</text>
        </view>
      </view>
    </view>
  );
}
