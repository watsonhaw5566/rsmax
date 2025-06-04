import { promisify } from '@rsmax/framework-shared';

// 基础
export const canIUse = tt.canIUse;
export const canIPutStuffOverComponent = tt.canIPutStuffOverComponent;
export const base64ToArrayBuffer = tt.base64ToArrayBuffer;
export const arrayBufferToBase64 = tt.arrayBufferToBase64;
// @ts-expect-error
export const setPageInfo = promisify(tt.setPageInfo);
// 基础 - 性能
export const performance = tt.performance;
// 基础 - 线程
export const createWorker = tt.createWorker;
// 基础 - 窗口尺寸变化
export const offWindowResize = tt.offWindowResize;
export const onWindowResize = tt.onWindowResize;
// 基础 - 声明周期
// @ts-expect-error
export const getEnterOptionsSync = tt.getEnterOptionsSync;
export const getLaunchOptionsSync = tt.getLaunchOptionsSync;
export const exitMiniProgram = tt.exitMiniProgram;
// 基础 - 版本更新
export const getUpdateManager = tt.getUpdateManager;
// 基础 - 应用级事件
export const onAppShow = tt.onAppShow;
export const offAppShow = tt.offAppShow;
export const onAppHide = tt.onAppHide;
export const offAppHide = tt.offAppHide;
export const offUnhandledRejection = tt.offUnhandledRejection;
export const onError = tt.onError;
export const offError = tt.offError;
export const onLazyLoadError = tt.onLazyLoadError;
export const offLazyLoadError = tt.offLazyLoadError;
export const onUnhandledRejection = tt.onUnhandledRejection;
// @ts-expect-error
export const onAppLaunch = tt.onAppLaunch;
// @ts-expect-error
export const offAppLaunch = tt.offAppLaunch;
// 环境变量
export const env = tt.env;
export const getEnvInfoSync = tt.getEnvInfoSync;
// TTML
export const createSelectorQuery = tt.createSelectorQuery;
export const createIntersectionObserver = tt.createIntersectionObserver;
// @ts-expect-error
export const matchMedia = tt.matchMedia;
// 网络 - HTTP
export const request = promisify(tt.request);
export const downloadFile = promisify(tt.downloadFile);
export const uploadFile = promisify(tt.uploadFile);
// 网络 - WebSocket
export const connectSocket = tt.connectSocket;
// 网络 - EventSource
// @ts-expect-error
export const createEventSource = tt.createEventSource;
// 媒体 - 图片
export const chooseImage = promisify(tt.chooseImage);
export const saveImageToPhotosAlbum = promisify(tt.saveImageToPhotosAlbum);
export const previewImage = promisify(tt.previewImage);
export const getImageInfo = promisify(tt.getImageInfo);
export const compressImage = promisify(tt.compressImage);
// 媒体 - 录音
export const getRecorderManager = tt.getRecorderManager;
// 媒体 - 音频
export const getBackgroundAudioManager = tt.getBackgroundAudioManager;
export const createInnerAudioContext = tt.createInnerAudioContext;
// 媒体 - 视频
// @ts-expect-error
export const chooseVideo = promisify(tt.chooseVideo);
// @ts-expect-error
export const saveVideoToPhotosAlbum = promisify(tt.saveVideoToPhotosAlbum);
// @ts-expect-error
export const canIUseVideoFormat = promisify(tt.canIUseVideoFormat);
export const prerenderVideo = promisify(tt.prerenderVideo);
// @ts-expect-error
export const preloadVideo = promisify(tt.preloadVideo);
export const chooseMedia = promisify(tt.chooseMedia);
export const createVideoContext = tt.createVideoContext;
export const createLivePlayerContext = tt.createLivePlayerContext;
// 媒体 - 相机
// @ts-expect-error
export const createCameraContext = tt.createCameraContext;
// 媒体 - 特效相机
// @ts-expect-error
export const createEffectCameraStream = tt.createEffectCameraStream;
// 媒体 - Canvas 录制
// @ts-expect-error
export const createMediaRecorder = tt.createMediaRecorder;
// 媒体 -  rtc-room 实时通信
// @ts-expect-error
export const createRtcRoomContext = tt.createRtcRoomContext;
// 地图
export const createMapContext = tt.createMapContext;
// 文件
export const saveFile = promisify(tt.saveFile);
export const getFileInfo = tt.getFileInfo;
// @ts-expect-error
export const openDocument = promisify(tt.openDocument);
export const getSavedFileList = tt.getSavedFileList;
export const removeSavedFile = promisify(tt.removeSavedFile);
export const getFileSystemManager = tt.getFileSystemManager;
// 文件缓存
export const getStorage = promisify(tt.getStorage);
export const getStorageSync = tt.getStorageSync;
export const setStorage = promisify(tt.setStorage);
export const setStorageSync = tt.setStorageSync;
export const removeStorage = promisify(tt.removeStorage);
export const removeStorageSync = tt.removeStorageSync;
export const clearStorage = promisify(tt.clearStorage);
export const clearStorageSync = tt.clearStorageSync;
export const getStorageInfo = promisify(tt.getStorageInfo);
export const getStorageInfoSync = tt.getStorageInfoSync;
// 地理位置
export const getLocation = promisify(tt.getLocation);
export const chooseLocation = promisify(tt.chooseLocation);
export const openLocation = promisify(tt.openLocation);
// @ts-expect-error
export const startLocationUpdate = promisify(tt.startLocationUpdate);
// @ts-expect-error
export const stopLocationUpdate = promisify(tt.stopLocationUpdate);
// @ts-expect-error
export const onLocationChange = tt.onLocationChange;
// @ts-expect-error
export const offLocationChange = tt.offLocationChange;
// @ts-expect-error
export const onLocationChangeError = tt.onLocationChangeError;
// @ts-expect-error
export const offLocationChangeError = tt.offLocationChangeError;
// 设备 - 网络状态
// @ts-expect-error
export const getNetworkType = promisify(tt.getNetworkType);
export const onNetworkStatusChange = tt.onNetworkStatusChange;
export const offNetworkStatusChange = tt.offNetworkStatusChange;
export const getWifiList = promisify(tt.getWifiList);
export const onGetWifiList = tt.onGetWifiList;
// @ts-expect-error
export const onNetworkWeakChange = tt.onNetworkWeakChange;
// 设备 - 系统信息
export const getSystemInfo = promisify(tt.getSystemInfo);
// @ts-expect-error
export const getDeviceInfoSync = tt.getDeviceInfoSync;
export const getSystemInfoSync = tt.getSystemInfoSync;
// 设备 - WIFI
export const getConnectedWifi = promisify(tt.getConnectedWifi);
// 设备 - 加速度计
export const startAccelerometer = promisify(tt.startAccelerometer);
export const stopAccelerometer = promisify(tt.stopAccelerometer);
export const onAccelerometerChange = tt.onAccelerometerChange;
// @ts-expect-error
export const offAccelerometerChange = tt.offAccelerometerChange;
// 设备 - 罗盘
export const startCompass = promisify(tt.startCompass);
export const stopCompass = promisify(tt.stopCompass);
export const onCompassChange = tt.onCompassChange;
export const offCompassChange = tt.offCompassChange;
// 设备 - 拨打电话
export const makePhoneCall = promisify(tt.makePhoneCall);
// 设备 - 扫码
export const scanCode = promisify(tt.scanCode);
// 设备 - 剪切板
export const getClipboardData = promisify(tt.getClipboardData);
export const setClipboardData = promisify(tt.setClipboardData);
// 设备 - 屏幕
export const setKeepScreenOn = promisify(tt.setKeepScreenOn);
export const onUserCaptureScreen = tt.onUserCaptureScreen;
export const offUserCaptureScreen = tt.offUserCaptureScreen;
export const getScreenBrightness = tt.getScreenBrightness;
export const setScreenBrightness = promisify(tt.setScreenBrightness);
export const onUserScreenRecord = tt.onUserCaptureScreen;
// @ts-expect-error
export const offUserScreenRecord = tt.offUserScreenRecord;
// @ts-expect-error
export const enableUserScreenRecord = promisify(tt.enableUserScreenRecord);
// @ts-expect-error
export const disableUserScreenRecord = promisify(tt.disableUserScreenRecord);
// 设备 - 陀螺仪
// @ts-expect-error
export const startGyroscope = promisify(tt.startGyroscope);
// @ts-expect-error
export const stopGyroscope = promisify(tt.stopGyroscope);
// @ts-expect-error
export const onGyroscopeChange = tt.onGyroscopeChange;
// @ts-expect-error
export const offGyroscopeChange = tt.offGyroscopeChange;
// 设备 - 加密
// @ts-expect-error
export const getRandomValues = promisify(tt.getRandomValues);
// 设备 - 短信
// @ts-expect-error
export const sendSms = promisify(tt.sendSms);
// 设备 - 日历
// @ts-expect-error
export const deleteCalendarEvent = promisify(tt.deleteCalendarEvent);
// 设备 - 振动
export const vibrateShort = promisify(tt.vibrateShort);
export const vibrateLong = promisify(tt.vibrateLong);
// 设备 - 性能
export const onMemoryWarning = tt.onMemoryWarning;
// 画布 v1
export const createCanvasContext = tt.createCanvasContext;
export const canvasToTempFilePath = tt.canvasToTempFilePath;
// 画布 v2
export const createOffscreenCanvas = tt.createOffscreenCanvas;
// 界面 - 交互反馈
// @ts-expect-error
export const enableAlertBeforeUnload = promisify(tt.enableAlertBeforeUnload);
export const showToast = promisify(tt.showToast);
export const showLoading = promisify(tt.showLoading);
export const hideToast = promisify(tt.hideToast);
export const hideLoading = promisify(tt.hideLoading);
export const showModal = promisify(tt.showModal);
// @ts-expect-error
export const showActionSheet = promisify(tt.showActionSheet);
export const showFavoriteGuide = promisify(tt.showFavoriteGuide);
export const showInteractionBar = promisify(tt.showInteractionBar);
export const hideInteractionBar = promisify(tt.hideInteractionBar);
// @ts-expect-error
export const disableAlertBeforeUnload = promisify(tt.disableAlertBeforeUnload);
// 界面 - 导航栏
export const showNavigationBarLoading = promisify(tt.showNavigationBarLoading);
export const hideNavigationBarLoading = promisify(tt.hideNavigationBarLoading);
export const hideHomeButton = promisify(tt.hideHomeButton);
export const setNavigationBarTitle = promisify(tt.setNavigationBarTitle);
export const setNavigationBarColor = promisify(tt.setNavigationBarColor);
// 界面 - 菜单
// @ts-expect-error
export const getCustomButtonBoundingClientRect = tt.getCustomButtonBoundingClientRect;
export const getMenuButtonBoundingClientRect = tt.getMenuButtonBoundingClientRect;
// 界面 - 动画
export const createAnimation = tt.createAnimation;
// 界面 - 页面位置
export const pageScrollTo = promisify(tt.pageScrollTo);
// 界面 - 滑动返回
// @ts-expect-error
export const setSwipeBackMode = tt.setSwipeBackMode;
// 界面 - 下拉刷新
export const startPullDownRefresh = tt.startPullDownRefresh;
export const stopPullDownRefresh = tt.stopPullDownRefresh;
// 界面 - 键盘
export const hideKeyboard = promisify(tt.hideKeyboard);
// 界面  - tab bar
export const showTabBarRedDot = promisify(tt.showTabBarRedDot);
export const showTabBar = promisify(tt.showTabBar);
export const setTabBarStyle = promisify(tt.setTabBarStyle);
export const setTabBarItem = promisify(tt.setTabBarItem);
export const setTabBarBadge = promisify(tt.setTabBarBadge);
export const removeTabBarBadge = promisify(tt.removeTabBarBadge);
export const hideTabBarRedDot = promisify(tt.hideTabBarRedDot);
export const hideTabBar = promisify(tt.hideTabBar);
// 页面导航
export const navigateTo = promisify(tt.navigateTo);
export const redirectTo = promisify(tt.redirectTo);
export const switchTab = promisify(tt.switchTab);
export const navigateBack = promisify(tt.navigateBack);
export const reLaunch = promisify(tt.reLaunch);
// 开放接口 - 登录
export const login = promisify(tt.login);
export const checkSession = tt.checkSession;
// 开放接口 - 用户信息
export const getUserInfo = promisify(tt.getUserInfo);
export const getUserProfile = promisify(tt.getUserProfile);
// 开放接口 - 广告
// @ts-expect-error
export const createRewardedVideoAd = tt.createRewardedVideoAd;
export const createInterstitialAd = tt.createInterstitialAd;
// @ts-expect-error
export const preloadDrawAd = promisify(tt.preloadDrawAd);
// 开放接口 - 支付
export const pay = promisify(tt.pay);
// 开放接口 - 小程序跳转
export const navigateToMiniProgram = promisify(tt.navigateToMiniProgram);
export const navigateBackMiniProgram = promisify(tt.navigateBackMiniProgram);
// 开放接口 - 收货地址
export const chooseAddress = promisify(tt.chooseAddress);
// 开放接口 - 设置
export const getSetting = promisify(tt.getSetting);
export const openSetting = promisify(tt.openSetting);
// 开放接口 - 授权
export const authorize = promisify(tt.authorize);
export const showDouyinOpenAuth = promisify(tt.showDouyinOpenAuth);
// 开放接口 - 评价能力
// @ts-expect-error
export const rateAwemeOrder = tt.rateAwemeOrder;
// @ts-expect-error
export const canRateAwemeOrders = promisify(tt.canRateAwemeOrders);
// 开放接口 - 数据分析
export const reportAnalytics = tt.reportAnalytics;
// 开放接口 - 引导关注
export const followOfficialAccount = promisify(tt.followOfficialAccount);
export const openAwemeUserProfile = promisify(tt.openAwemeUserProfile);
export const checkFollowState = promisify(tt.checkFollowState);
export const followAwemeUser = promisify(tt.followAwemeUser);
// @ts-expect-error
export const checkFollowAwemeState = promisify(tt.checkFollowAwemeState);
// 开放接口 - 订阅消息
export const requestSubscribeMessage = promisify(tt.requestSubscribeMessage);
// 开放接口 - 流量来源识别
export const getAnalysisInfo = promisify(tt.getAnalysisInfo);
// 开放接口 - 隐私信息授权
// @ts-expect-error
export const requirePrivacyAuthorize = promisify(tt.requirePrivacyAuthorize);
// @ts-expect-error
export const openPrivacyContract = promisify(tt.openPrivacyContract);
// @ts-expect-error
export const onNeedPrivacyAuthorization = tt.onNeedPrivacyAuthorization;
// @ts-expect-error
export const getPrivacySetting = promisify(tt.getPrivacySetting);
// 开放接口 - web 化
// 开放接口 -  转发和挂载
export const showShareMenu = promisify(tt.showShareMenu);
export const hideShareMenu = promisify(tt.hideShareMenu);
export const navigateToVideoView = promisify(tt.navigateToVideoView);
// 开放接口 -  侧边栏能力
export const getSidebarActivity = promisify(tt.getSidebarActivity);
export const navigateToScene = promisify(tt.navigateToScene);
export const updateSidebarActivity = promisify(tt.updateSidebarActivity);
// @ts-expect-error
export const createSceneActivityContext = tt.createSceneActivityContext;
// 开发接口 - AI/AR能力
// @ts-expect-error
export const getAlgorithmManager = promisify(tt.getAlgorithmManager);
// @ts-expect-error
export const createBytennEngineContext = tt.createBytennEngineContext;
// @ts-expect-error
export const createStickerManager = tt.createStickerManager;
// 开发接口 - 安全能力
// @ts-expect-error
export const getLatestUserCryptoKey = promisify(tt.getLatestUserCryptoKey);
// 行业开放 - 通用交易系统
// @ts-expect-error
export const requestOrder = promisify(tt.requestOrder);
// @ts-expect-error
export const getOrderPayment = promisify(tt.getOrderPayment);
// @ts-expect-error
export const confirmFulfillment = tt.confirmFulfillment;
// 行业开放 - 交易工具
// @ts-expect-error
export const createSignOrder = tt.createSignOrder;
// @ts-expect-error
export const sign = tt.sign;
// 第三方平台
export const getExtConfig = promisify(tt.getExtConfig);
export const getExtConfigSync = tt.getExtConfigSync;
