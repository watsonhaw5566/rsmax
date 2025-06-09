import { promisify } from '@rsmax/framework-shared';

/**
 * 基础 API
 */
// 基础
export const canIUse = my.canIUse;
export const env = my.env;
export const isIDE = my.isIDE;
export const getLaunchOptionsSync = my.getLaunchOptionsSync;
export const getEnterOptionsSync = my.getEnterOptionsSync;
export const SDKVersion = my.SDKVersion;
export const getAccountInfoSync = my.getAccountInfoSync;
export const getAppIdSync = my.getAppIdSync;
export const getRunScene = promisify(my.getRunScene);
export const base64ToArrayBuffer = my.base64ToArrayBuffer;
export const arrayBufferToBase64 = my.arrayBufferToBase64;
// 性能
// @ts-ignore
export const getPerformance = my.getPerformance;
// 调试
// @ts-ignore
export const setEnableDebug = promisify(my.setEnableDebug);
// 应用级事件
export const onAppShow = my.onAppShow;
export const offAppShow = my.offAppShow;
export const onAppHide = my.onAppHide;
export const offAppHide = my.offAppHide;
export const onPageNotFound = my.onPageNotFound;
export const offPageNotFound = my.offPageNotFound;
export const onUnhandledRejection = my.onUnhandledRejection;
export const offUnhandledRejection = my.offUnhandledRejection;
export const onError = my.onError;
export const offError = my.offError;
export const onComponentError = my.onComponentError;
export const offComponentError = my.offComponentError;
// @ts-ignore
export const onLazyLoadError = my.onLazyLoadError;
// @ts-ignore
export const offLazyLoadError = my.offLazyLoadError;
// 界面
export const setNavigationBar = promisify(my.setNavigationBar);
export const setNavigationBarTitle = promisify(my.setNavigationBarTitle);
export const setNavigationBarColor = promisify(my.setNavigationBarColor);
export const setNavigationBarBottomLineColor = promisify(my.setNavigationBarBottomLineColor);
export const hideBackHome = promisify(my.hideBackHome);
export const getTitleColor = promisify(my.getTitleColor);
export const getMenuButtonBoundingClientRect = my.getMenuButtonBoundingClientRect;
export const getLeftButtonsBoundingClientRect = my.getLeftButtonsBoundingClientRect;
export const showNavigationBarLoading = promisify(my.showNavigationBarLoading);
export const hideNavigationBarLoading = promisify(my.hideNavigationBarLoading);
// 界面 - tabbar
export const showTabBar = promisify(my.showTabBar);
export const hideTabBar = promisify(my.hideTabBar);
export const setTabBarBadge = promisify(my.setTabBarBadge);
export const setTabBarItem = promisify(my.setTabBarItem);
export const setTabBarStyle = promisify(my.setTabBarStyle);
export const removeTabBarBadge = promisify(my.removeTabBarBadge);
export const showTabBarRedDot = promisify(my.showTabBarRedDot);
export const hideTabBarRedDot = my.hideTabBarRedDot;
// 界面 - 路由
export const switchTab = promisify(my.switchTab);
export const navigateTo = promisify(my.navigateTo);
export const navigateBack = promisify(my.navigateBack);
export const redirectTo = promisify(my.redirectTo);
export const reLaunch = promisify(my.reLaunch);
// 界面 - 交互反馈
export const showLoading = promisify(my.showLoading);
export const hideLoading = promisify(my.hideLoading);
export const showModal = promisify(my.showModal);
export const alert = promisify(my.alert);
export const showToast = promisify(my.showToast);
export const hideToast = promisify(my.hideToast);
export const showActionSheet = promisify(my.showActionSheet);
export const confirm = promisify(my.confirm);
export const prompt = promisify(my.prompt);
export const enableAlertBeforeUnload = promisify(my.enableAlertBeforeUnload);
export const disableAlertBeforeUnload = promisify(my.disableAlertBeforeUnload);
// @ts-ignore
export const showAppModal = promisify(my.showAppModal);
// 界面 - 下拉刷新
export const startPullDownRefresh = promisify(my.startPullDownRefresh);
export const stopPullDownRefresh = promisify(my.stopPullDownRefresh);
// 界面 - 联系人
export const choosePhoneContact = promisify(my.choosePhoneContact);
export const chooseAlipayContact = promisify(my.chooseAlipayContact);
export const chooseContact = promisify(my.chooseContact);
// 界面 - 选择城市
export const chooseCity = promisify(my.chooseCity);
export const chooseDistrict = promisify(my.chooseDistrict);
export const regionPicker = promisify(my.regionPicker);
// 界面 - 选择日期
export const datePicker = promisify(my.datePicker);
// 界面 - 动画
export const createAnimation = promisify(my.createAnimation);
// 界面 - 地图
export const getMapInfo = promisify(my.getMapInfo);
export const createMapContext = my.createMapContext;
// 界面 - 计算路径
export const calculateRoute = promisify(my.calculateRoute);
// 界面 - 键盘
export const hideKeyboard = my.hideKeyboard;
// @ts-ignore
export const getSelectedTextRange = promisify(my.getSelectedTextRange);
// 界面 - 滚动
export const pageScrollTo = promisify(my.pageScrollTo);
// @ts-ignore
export const setPageScrollable = promisify(my.setPageScrollable);
// 界面 - 节点查询
export const createSelectorQuery = my.createSelectorQuery;
export const createIntersectionObserver = my.createIntersectionObserver;
// 界面 - 选项选择器
export const optionsSelect = promisify(my.optionsSelect);
export const multiLevelSelect = promisify(my.multiLevelSelect);
export const setBackgroundColor = promisify(my.setBackgroundColor);
export const setBackgroundTextStyle = promisify(my.setBackgroundTextStyle);
export const setCanPullDown = promisify(my.setCanPullDown);
export const loadFontFace = promisify(my.loadFontFace);
// 界面 - 跳转 - 小程序相互跳转
export const navigateToMiniProgram = promisify(my.navigateToMiniProgram);
export const navigateBackMiniProgram = promisify(my.navigateBackMiniProgram);
// 界面 - 跳转  - 跳转支付宝应用或者页面
// @ts-ignore
export const openEmbeddedMiniProgram = promisify(my.openEmbeddedMiniProgram);
// @ts-ignore
export const openAlipayApp = promisify(my.app.openAlipayApp);
// @ts-ignore
export const openURL = promisify(my.app.openURL);
// 界面 - 重启/退出小程序
// @ts-ignore
export const restartMiniProgram = promisify(my.restartMiniProgram);
export const exitMiniProgram = promisify(my.exitMiniProgram);
// 多媒体 -图片
export const chooseImage = promisify(my.chooseImage);
export const previewImage = promisify(my.previewImage);
export const getImageInfo = promisify(my.getImageInfo);
export const saveImageToPhotosAlbum = promisify(my.saveImageToPhotosAlbum);
export const compressImage = promisify(my.compressImage);
export const generateImageFromCode = promisify(my.generateImageFromCode);
// 多媒体 - 视频
export const chooseVideo = promisify(my.chooseVideo);
export const getVideoInfo = my.getVideoInfo;
export const saveVideoToPhotosAlbum = promisify(my.saveVideoToPhotosAlbum);
export const createVideoContext = my.createVideoContext;
// 多媒体 - 音频
export const createInnerAudioContext = my.createInnerAudioContext;
export const onAudioInterruptionBegin = my.onAudioInterruptionBegin;
export const offAudioInterruptionBegin = my.offAudioInterruptionBegin;
export const onAudioInterruptionEnd = my.onAudioInterruptionEnd;
export const offAudioInterruptionEnd = my.offAudioInterruptionEnd;
// 多媒体 - 录音
export const getRecorderManager = my.getRecorderManager;
export const getAvailableAudioSources = promisify(my.getAvailableAudioSources);
// 多媒体 - lottie 动画
export const createLottieContext = my.createLottieContext;
// 多媒体 - 相机
// @ts-ignore
export const createCameraContext = my.createCameraContext;
// 缓存
export const setStorage = promisify(my.setStorage);
export const setStorageSync = my.setStorageSync;
export const getStorage = promisify(my.getStorage);
export const getStorageSync = my.getStorageSync;
export const getStorageInfo = promisify(my.getStorageInfo);
export const getStorageInfoSync = my.getStorageInfoSync;
export const removeStorage = promisify(my.removeStorage);
export const removeStorageSync = my.removeStorageSync;
export const clearStorage = promisify(my.clearStorage);
export const clearStorageSync = my.clearStorageSync;
// 缓存 - 预拉取
export const getBackgroundFetchData = promisify(my.getBackgroundFetchData);
// 文件
export const openDocument = promisify(my.openDocument);
export const saveFileToDisk = promisify(my.saveFileToDisk);
export const detectFileType = promisify(my.detectFileType);
export const getFileSystemManager = my.getFileSystemManager;
// @ts-ignore
export const chooseFileFromDisk = promisify(my.chooseFileFromDisk);
// 位置
export const getLocation = promisify(my.getLocation);
export const getMainSelectedCity = promisify(my.ap.getMainSelectedCity);
export const chooseLocation = promisify(my.chooseLocation);
export const openLocation = promisify(my.openLocation);
// 网络
export const request = promisify(my.request);
// 网络 - 上传
export const uploadFile = promisify(my.uploadFile);
// 网络 - 下载
export const downloadFile = promisify(my.downloadFile);
// 网络 - websocket
export const connectSocket = promisify(my.connectSocket);
export const closeSocket = promisify(my.closeSocket);
export const sendSocketMessage = promisify(my.sendSocketMessage);
export const onSocketOpen = my.onSocketOpen;
export const offSocketOpen = my.offSocketOpen;
export const onSocketMessage = my.onSocketMessage;
export const offSocketMessage = my.offSocketMessage;
export const onSocketError = my.onSocketError;
export const offSocketError = my.offSocketError;
export const onSocketClose = my.onSocketClose;
export const offSocketClose = my.offSocketClose;
// 设备 - 系统信息
export const getSystemInfo = promisify(my.getSystemInfo);
export const getSystemInfoSync = my.getSystemInfoSync;
// @ts-ignore
export const getDeviceBaseInfo = my.getDeviceBaseInfo;
export const getSystemSetting = my.getSystemSetting;
export const getWindowInfo = my.getWindowInfo;
export const getAppBaseInfo = my.getAppBaseInfo;
export const getAppAuthorizeSetting = my.getAppAuthorizeSetting;
// 设备 - 网络状态
export const getNetworkType = promisify(my.getNetworkType);
export const onNetworkStatusChange = promisify(my.onNetworkStatusChange);
export const offNetworkStatusChange = promisify(my.offNetworkStatusChange);
// 设备 - 截屏
export const setVisualEffectOnCapture = promisify(my.setVisualEffectOnCapture);
// 设备 - 剪贴板
export const getClipboard = promisify(my.getClipboard);
export const setClipboard = promisify(my.setClipboard);
// 设备 - 摇一摇
export const watchShake = promisify(my.watchShake);
// 设备 - 振动
export const vibrate = promisify(my.vibrate);
export const vibrateLong = promisify(my.vibrateLong);
export const vibrateShort = promisify(my.vibrateShort);
// 设备 - 加速度计
export const startAccelerometer = promisify(my.startAccelerometer);
export const stopAccelerometer = promisify(my.stopAccelerometer);
export const onAccelerometerChange = my.onAccelerometerChange;
export const offAccelerometerChange = my.offAccelerometerChange;
// 设备 - 陀螺仪
export const startGyroscope = promisify(my.startGyroscope);
export const stopGyroscope = promisify(my.stopGyroscope);
export const onGyroscopeChange = my.onGyroscopeChange;
export const offGyroscopeChange = my.offGyroscopeChange;
// 设备 - 罗盘
export const startCompass = promisify(my.startCompass);
export const stopCompass = promisify(my.stopCompass);
export const onCompassChange = my.onCompassChange;
export const offCompassChange = my.offCompassChange;
// 设备 - 设备方向
// @ts-ignore
export const startDeviceMotionListening = promisify(my.startDeviceMotionListening);
// @ts-ignore
export const stopDeviceMotionListening = promisify(my.stopDeviceMotionListening);
export const onDeviceMotionChange = my.onDeviceMotionChange;
export const offDeviceMotionChange = my.offDeviceMotionChange;
// 设备 - 拨打电话
export const makePhoneCall = promisify(my.makePhoneCall);
// 设备 - 获取服务器时间
export const getServerTime = promisify(my.getServerTime);
// 设备 - 用户截屏事件
export const onUserCaptureScreen = my.onUserCaptureScreen;
export const offUserCaptureScreen = my.offUserCaptureScreen;
// 设备 - 屏幕亮度
export const getScreenBrightness = promisify(my.getScreenBrightness);
export const setScreenBrightness = promisify(my.setScreenBrightness);
export const setKeepScreenOn = promisify(my.setKeepScreenOn);
// 设备 - 设置
export const getSetting = promisify(my.getSetting);
export const openSetting = promisify(my.openSetting);
// 设备 - 添加手机联系人
export const addPhoneContact = promisify(my.addPhoneContact);
// 设备 - 无障碍
export const isScreenReaderEnabled = promisify(my.isScreenReaderEnabled);
// 设备 - 权限引导
export const showAuthGuide = promisify(my.showAuthGuide);
// 设备 - 扫码
export const scan = promisify(my.scan);
// 设备 - 内存不足警告
export const onMemoryWarning = my.onMemoryWarning;
export const offMemoryWarning = my.offMemoryWarning;
// 设备 - 获取手机电量
export const getBatteryInfo = promisify(my.getBatteryInfo);
export const getBatteryInfoSync = my.getBatteryInfoSync;
// 设备 - 蓝牙 - 低功耗蓝牙
export const onBLEConnectionStateChanged = my.onBLEConnectionStateChanged;
export const offBLEConnectionStateChanged = my.offBLEConnectionStateChanged;
export const getBLEDeviceServices = promisify(my.getBLEDeviceServices);
export const connectBLEDevice = promisify(my.connectBLEDevice);
export const disconnectBLEDevice = promisify(my.disconnectBLEDevice);
export const getBLEDeviceCharacteristics = promisify(my.getBLEDeviceCharacteristics);
export const setBLEMTU = promisify(my.setBLEMTU);
export const getBLEMTU = promisify(my.getBLEMTU);
export const notifyBLECharacteristicValueChange = promisify(my.notifyBLECharacteristicValueChange);
export const onBLECharacteristicValueChange = my.onBLECharacteristicValueChange;
export const offBLECharacteristicValueChange = my.offBLECharacteristicValueChange;
export const writeBLECharacteristicValue = promisify(my.writeBLECharacteristicValue);
export const readBLECharacteristicValue = promisify(my.readBLECharacteristicValue);
export const getBLEDeviceRSSI = promisify(my.getBLEDeviceRSSI);
export const getBLEDeviceStatus = promisify(my.getBLEDeviceStatus);
// 设备 - 蓝牙 - 传统蓝牙
export const openBluetoothAdapter = promisify(my.openBluetoothAdapter);
export const closeBluetoothAdapter = promisify(my.closeBluetoothAdapter);
export const getBluetoothAdapterState = promisify(my.getBluetoothAdapterState);
export const onBluetoothAdapterStateChange = my.onBluetoothAdapterStateChange;
export const offBluetoothAdapterStateChange = my.offBluetoothAdapterStateChange;
export const onBluetoothDeviceFound = my.onBluetoothDeviceFound;
export const offBluetoothDeviceFound = my.offBluetoothDeviceFound;
export const startBluetoothDevicesDiscovery = promisify(my.startBluetoothDevicesDiscovery);
export const stopBluetoothDevicesDiscovery = promisify(my.stopBluetoothDevicesDiscovery);
export const getBluetoothDevices = promisify(my.getBluetoothDevices);
export const getConnectedBluetoothDevices = promisify(my.getConnectedBluetoothDevices);
export const makeBluetoothPair = promisify(my.makeBluetoothPair);
export const getBluetoothPairs = promisify(my.getBluetoothPairs);
export const cancelBluetoothPair = promisify(my.cancelBluetoothPair);
// 设备 - 蓝牙 - iBeacon(近场定位技术)
export const getBeacons = promisify(my.getBeacons);
export const startBeaconDiscovery = promisify(my.startBeaconDiscovery);
export const stopBeaconDiscovery = promisify(my.stopBeaconDiscovery);
export const onBeaconUpdate = my.onBeaconUpdate;
export const offBeaconUpdate = my.offBeaconUpdate;
export const onBeaconServiceChange = my.onBeaconServiceChange;
export const offBeaconServiceChange = my.offBeaconServiceChange;
// 设备 - Wi-Fi
export const startWifi = promisify(my.startWifi);
export const stopWifi = promisify(my.stopWifi);
export const connectWifi = promisify(my.connectWifi);
export const getWifiList = promisify(my.getWifiList);
export const onWifiConnected = my.onWifiConnected;
export const offWifiConnected = my.offWifiConnected;
export const onGetWifiList = my.onGetWifiList;
export const offGetWifiList = my.offGetWifiList;
export const getConnectedWifi = promisify(my.getConnectedWifi);
// 设备 - 短信
// @ts-ignore
export const sendSms = promisify(my.sendSms);
// Worker
export const createWorker = my.createWorker;
// 数据安全
export const rsa = promisify(my.rsa);
// 分享
export const showSharePanel = my.showSharePanel;
export const hideShareMenu = promisify(my.hideShareMenu);
export const showShareMenu = promisify(my.showShareMenu);
// 收藏
// @ts-ignore
export const isCollected = promisify(my.isCollected);
// 自定义通用菜单
export const hideAddToDesktopMenu = promisify(my.hideAddToDesktopMenu);
export const hideAllAddToDesktopMenu = promisify(my.hideAllAddToDesktopMenu);
// 更新管理
export const getUpdateManager = my.getUpdateManager;
// web-view 组件控制
export const createWebViewContext = my.createWebViewContext;
// 升级支付宝最新版本
export const updateAlipayClient = promisify(my.ap.updateAlipayClient);
// 隐私信息授权
// @ts-ignore
export const requirePrivacyAuthorize = promisify(my.requirePrivacyAuthorize);
// @ts-ignore
export const openPrivacyContract = promisify(my.openPrivacyContract);
// @ts-ignore
export const onNeedPrivacyAuthorization = my.onNeedPrivacyAuthorization;
// @ts-ignore
export const getPrivacySetting = promisify(my.getPrivacySetting);
// 小程序广告
export const createRewardedAd = promisify(my.createRewardedAd);
// @ts-ignore
export const createInterstitialAd = promisify(my.createInterstitialAd);
/**
 * 开放能力 API
 */
// 支付
export const tradePay = promisify(my.tradePay);
// 用户授权
export const getAuthCode = promisify(my.getAuthCode);
// 会员
export const getOpenUserInfo = promisify(my.getOpenUserInfo);
export const getAddress = promisify(my.getAddress);
export const getPhoneNumber = promisify(my.getPhoneNumber);
// 周期扣款
export const paySignCenter = promisify(my.paySignCenter);
// 商家会员卡
// @ts-ignore
export const openCardList = promisify(my.openCardList);
// @ts-ignore
export const openCardDetail = promisify(my.openCardDetail);
// @ts-ignore
export const openMerchantCardList = promisify(my.openMerchantCardList);
// @ts-ignore
export const openMerchantCard = promisify(my.openMerchantCard);
// 消息
export const requestSubscribeMessage = promisify(my.requestSubscribeMessage);
export const unsubscribeMessage = promisify(my.unsubscribeMessage);
// 模板配置
export const getExtConfigSync = my.getExtConfigSync;
export const getExtConfig = promisify(my.getExtConfig);
// 支付宝卡包 - 劵
export const openVoucherList = promisify(my.openVoucherList);
export const openMerchantVoucherList = promisify(my.openMerchantVoucherList);
export const openVoucherDetail = promisify(my.openVoucherDetail);
export const openKBVoucherDetail = promisify(my.openKBVoucherDetail);
// 支付宝卡包 - 票
export const openTicketList = promisify(my.openTicketList);
export const openMerchantTicketList = promisify(my.openMerchantTicketList);
export const openTicketDetail = promisify(my.openTicketDetail);
// 交易组件
export const checkBeforeAddOrder = promisify(my.checkBeforeAddOrder);
// 小程序商品
export const prepareUseCertificate = promisify(my.ap.prepareUseCertificate);
