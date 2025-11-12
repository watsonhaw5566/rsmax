import { promisify } from '@rsmax/framework-shared';

// 基础
export const env = wx.env;
export const canIUse = wx.canIUse;
export const base64ToArrayBuffer = wx.base64ToArrayBuffer;
export const arrayBufferToBase64 = wx.arrayBufferToBase64;
export const getLaunchOptionsSync = wx.getLaunchOptionsSync;
export const cloud = wx.cloud;
// 基础 - 系统
export const openSystemBluetoothSetting = promisify(wx.openSystemBluetoothSetting);
export const openAppAuthorizeSetting = promisify(wx.openAppAuthorizeSetting);
export const getWindowInfo = wx.getWindowInfo;
export const getSystemSetting = wx.getSystemSetting;
export const getSystemInfoSync = wx.getSystemInfoSync;
export const getSystemInfoAsync = wx.getSystemInfoAsync;
export const getSystemInfo = promisify(wx.getSystemInfo);
export const getSkylineInfoSync = wx.getSkylineInfoSync;
export const getSkylineInfo = wx.getSkylineInfo;
export const getRendererUserAgent = wx.getRendererUserAgent;
export const getDeviceInfo = wx.getDeviceInfo;
export const getDeviceBenchmarkInfo = wx.getDeviceBenchmarkInfo;
export const getAppBaseInfo = wx.getAppBaseInfo;
export const getAppAuthorizeSetting = wx.getAppAuthorizeSetting;
// 基础 - 更新
export const updateWeChatApp = promisify(wx.updateWeChatApp);
export const getUpdateManager = wx.getUpdateManager;
// 基础 - 小程序 - 生命周期
export const onApiCategoryChange = wx.onApiCategoryChange;
export const offApiCategoryChange = wx.offApiCategoryChange;
export const getEnterOptionsSync = wx.getEnterOptionsSync;
// 基础 - 小程序 - 应用级事件
export const postMessageToReferrerPage = wx.postMessageToReferrerPage;
export const postMessageToReferrerMiniProgram = wx.postMessageToReferrerMiniProgram;
export const onUnhandledRejection = wx.onUnhandledRejection;
export const onThemeChange = wx.onThemeChange;
export const onPageNotFound = wx.onPageNotFound;
export const onLazyLoadError = wx.onLazyLoadError;
export const onError = wx.onError;
export const onAudioInterruptionEnd = wx.onAudioInterruptionEnd;
export const onAudioInterruptionBegin = wx.onAudioInterruptionBegin;
export const onAppShow = wx.onAppShow;
export const onAppHide = wx.onAppHide;
export const offUnhandledRejection = wx.offUnhandledRejection;
export const offThemeChange = wx.offThemeChange;
export const offPageNotFound = wx.offPageNotFound;
export const offLazyLoadError = wx.offLazyLoadError;
export const offError = wx.offError;
export const offAudioInterruptionEnd = wx.offAudioInterruptionEnd;
export const offAudioInterruptionBegin = wx.offAudioInterruptionBegin;
export const offAppShow = wx.offAppShow;
export const offAppHide = wx.offAppHide;
// 基础 - 小程序 - 路由事件
export const onBeforePageUnload = wx.onBeforePageUnload;
export const onBeforePageLoad = wx.onBeforePageLoad;
export const onBeforeAppRoute = wx.onBeforeAppRoute;
export const onAppRouteDone = wx.onAppRouteDone;
export const onAppRoute = wx.onAppRoute;
export const onAfterPageUnload = wx.onAfterPageUnload;
export const onAfterPageLoad = wx.onAfterPageLoad;
export const offBeforePageUnload = wx.offBeforePageUnload;
export const offBeforePageLoad = wx.offBeforePageLoad;
export const offBeforeAppRoute = wx.offBeforeAppRoute;
export const offAppRouteDone = wx.offAppRouteDone;
export const offAppRoute = wx.offAppRoute;
export const offAfterPageUnload = wx.offAfterPageUnload;
export const offAfterPageLoad = wx.offAfterPageLoad;
// 基础 - 调试
export const setEnableDebug = promisify(wx.setEnableDebug);
export const getRealtimeLogManager = wx.getRealtimeLogManager;
export const getLogManager = wx.getLogManager;
// 基础 - 性能
export const reportPerformance = wx.reportPerformance;
export const preloadWebview = wx.preloadWebview;
export const preloadSkylineView = wx.preloadSkylineView;
export const preloadAssets = wx.preloadAssets;
export const getPerformance = wx.getPerformance;
// 基础 - 分包加载
export const preDownloadSubpackage = wx.preDownloadSubpackage;
// 基础 - 加密
export const getUserCryptoManager = wx.getUserCryptoManager;
// 路由
export const switchTab = promisify(wx.switchTab);
export const rewriteRoute = wx.rewriteRoute;
export const reLaunch = promisify(wx.reLaunch);
export const redirectTo = promisify(wx.redirectTo);
export const navigateTo = promisify(wx.navigateTo);
export const navigateBack = promisify(wx.navigateBack);
// 自定义路由
export const router = wx.router;
// 跳转
export const restartMiniProgram = wx.restartMiniProgram;
export const openOfficialAccountProfile = wx.openOfficialAccountProfile;
export const openOfficialAccountArticle = wx.openOfficialAccountArticle;
export const openEmbeddedMiniProgram = promisify(wx.openEmbeddedMiniProgram);
export const onEmbeddedMiniProgramHeightChange = wx.onEmbeddedMiniProgramHeightChange;
export const offEmbeddedMiniProgramHeightChange = wx.offEmbeddedMiniProgramHeightChange;
export const navigateToMiniProgram = promisify(wx.navigateToMiniProgram);
export const navigateBackMiniProgram = promisify(wx.navigateBackMiniProgram);
export const exitMiniProgram = promisify(wx.exitMiniProgram);
// 聊天工具
export const shareVideoToGroup = promisify(wx.shareVideoToGroup);
export const shareImageToGroup = promisify(wx.shareImageToGroup);
export const shareFileToGroup = promisify(wx.shareFileToGroup);
export const shareEmojiToGroup = promisify(wx.shareEmojiToGroup);
export const shareAppMessageToGroup = promisify(wx.shareAppMessageToGroup);
export const selectGroupMembers = promisify(wx.selectGroupMembers);
export const openChatTool = promisify(wx.openChatTool);
export const notifyGroupMembers = promisify(wx.notifyGroupMembers);
export const getChatToolInfo = promisify(wx.getChatToolInfo);
// 转发
export const updateShareMenu = promisify(wx.updateShareMenu);
export const showShareMenu = promisify(wx.showShareMenu);
export const showShareImageMenu = promisify(wx.showShareImageMenu);
export const shareVideoMessage = promisify(wx.shareVideoMessage);
export const shareFileMessage = promisify(wx.shareFileMessage);
export const onCopyUrl = wx.onCopyUrl;
export const offCopyUrl = wx.offCopyUrl;
export const hideShareMenu = promisify(wx.hideShareMenu);
export const getShareInfo = wx.getShareInfo;
export const authPrivateMessage = promisify(wx.authPrivateMessage);
// 界面 - 交互
export const showToast = promisify(wx.showToast);
export const showModal = promisify(wx.showModal);
export const showLoading = promisify(wx.showLoading);
export const showActionSheet = promisify(wx.showActionSheet);
export const hideToast = promisify(wx.hideToast);
export const hideLoading = promisify(wx.hideLoading);
export const enableAlertBeforeUnload = wx.enableAlertBeforeUnload;
export const disableAlertBeforeUnload = wx.disableAlertBeforeUnload;
// 界面 - 导航栏
export const showNavigationBarLoading = promisify(wx.showNavigationBarLoading);
export const setNavigationBarTitle = promisify(wx.setNavigationBarTitle);
export const setNavigationBarColor = promisify(wx.setNavigationBarColor);
export const hideNavigationBarLoading = promisify(wx.hideNavigationBarLoading);
export const hideHomeButton = promisify(wx.hideHomeButton);
// 界面 - 背景
export const setBackgroundTextStyle = promisify(wx.setBackgroundTextStyle);
export const setBackgroundColor = promisify(wx.setBackgroundColor);
// 界面 - tab bar
export const showTabBarRedDot = promisify(wx.showTabBarRedDot);
export const showTabBar = promisify(wx.showTabBar);
export const setTabBarStyle = promisify(wx.setTabBarStyle);
export const setTabBarItem = promisify(wx.setTabBarItem);
export const setTabBarBadge = promisify(wx.setTabBarBadge);
export const removeTabBarBadge = promisify(wx.removeTabBarBadge);
export const hideTabBarRedDot = promisify(wx.hideTabBarRedDot);
export const hideTabBar = promisify(wx.hideTabBar);
// 界面 - 字体
export const loadFontFace = promisify(wx.loadFontFace);
export const loadBuiltInFontFace = wx.loadBuiltInFontFace;
// 界面 - 下拉刷新
export const stopPullDownRefresh = promisify(wx.stopPullDownRefresh);
export const startPullDownRefresh = promisify(wx.startPullDownRefresh);
// 界面 - 滚动
export const pageScrollTo = promisify(wx.pageScrollTo);
// 界面 - 动画
export const createAnimation = wx.createAnimation;
// 界面 - 置顶
// 基础库 1.9.9 开始，本接口停止维护
export const setTopBarText = promisify(wx.setTopBarText);
// 界面 - 自定义组件
export const nextTick = wx.nextTick;
// 界面 - 菜单
export const onOnUserTriggerTranslation = wx.onOnUserTriggerTranslation;
export const onMenuButtonBoundingClientRectWeightChange = wx.onMenuButtonBoundingClientRectWeightChange;
export const offOnUserTriggerTranslation = wx.offOnUserTriggerTranslation;
export const offMenuButtonBoundingClientRectWeightChange = wx.offMenuButtonBoundingClientRectWeightChange;
export const getMenuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect;
// 界面 - 窗口
// 从基础库 2.11.0 开始，本接口停止维护
export const setWindowSize = wx.setWindowSize;
export const onWindowResize = wx.onWindowResize;
export const offWindowResize = wx.offWindowResize;
export const checkIsPictureInPictureActive = wx.checkIsPictureInPictureActive;
// 界面 - worklet 动画
export const worklet = wx.worklet;
// 网络
export const request = wx.request;
export const downloadFile = wx.downloadFile;
export const uploadFile = wx.uploadFile;
// websocket
export const sendSocketMessage = promisify(wx.sendSocketMessage);
export const onSocketOpen = wx.onSocketOpen;
export const onSocketMessage = wx.onSocketMessage;
export const onSocketError = wx.onSocketError;
export const onSocketClose = wx.onSocketClose;
export const connectSocket = wx.connectSocket;
export const closeSocket = promisify(wx.closeSocket);
// mDNS
export const stopLocalServiceDiscovery = promisify(wx.stopLocalServiceDiscovery);
export const startLocalServiceDiscovery = promisify(wx.startLocalServiceDiscovery);
export const onLocalServiceResolveFail = wx.onLocalServiceResolveFail;
export const onLocalServiceLost = wx.onLocalServiceLost;
export const onLocalServiceFound = wx.onLocalServiceFound;
export const onLocalServiceDiscoveryStop = wx.onLocalServiceDiscoveryStop;
export const offLocalServiceResolveFail = wx.offLocalServiceResolveFail;
export const offLocalServiceLost = wx.offLocalServiceLost;
export const offLocalServiceFound = wx.offLocalServiceFound;
export const offLocalServiceDiscoveryStop = wx.offLocalServiceDiscoveryStop;
// TCP 通信
export const createTCPSocket = wx.createTCPSocket;
// UDP 通信
export const createUDPSocket = wx.createUDPSocket;
// 支付
export const requestVirtualPayment = wx.requestVirtualPayment;
export const requestPluginPayment = wx.requestPluginPayment;
export const requestPayment = promisify(wx.requestPayment);
export const requestMerchantTransfer = wx.requestMerchantTransfer;
export const requestCommonPayment = wx.requestCommonPayment;
export const openHKOfflinePayView = wx.openHKOfflinePayView;
// @ts-expect-error 全球支付
export const createGlobalPayment = wx.createGlobalPayment;
// 数据缓存
export const setStorageSync = wx.setStorageSync;
export const setStorage = promisify(wx.setStorage);
export const revokeBufferURL = wx.revokeBufferURL;
export const removeStorageSync = promisify(wx.removeStorageSync);
export const removeStorage = promisify(wx.removeStorage);
export const getStorageSync = wx.getStorageSync;
export const getStorageInfoSync = promisify(wx.getStorageInfoSync);
export const getStorageInfo = promisify(wx.getStorageInfo);
export const getStorage = promisify(wx.getStorage);
export const createBufferURL = wx.createBufferURL;
export const clearStorageSync = wx.clearStorageSync;
export const clearStorage = promisify(wx.clearStorage);
export const batchSetStorageSync = wx.batchSetStorageSync;
export const batchSetStorage = promisify(wx.batchSetStorage);
export const batchGetStorageSync = wx.batchGetStorageSync;
export const batchGetStorage = promisify(wx.batchGetStorage);
// 数据预拉取和周期性更新
export const setBackgroundFetchToken = promisify(wx.setBackgroundFetchToken);
export const onBackgroundFetchData = wx.onBackgroundFetchData;
export const getBackgroundFetchToken = promisify(wx.getBackgroundFetchToken);
export const getBackgroundFetchData = promisify(wx.getBackgroundFetchData);
// 缓存管理器
export const createCacheManager = wx.createCacheManager;
// 数据分析
// 从基础库 2.31.1 开始，本接口停止维护，请使用 wx.reportEvent 代替
export const reportMonitor = wx.reportMonitor;
export const reportEvent = wx.reportEvent;
export const reportAnalytics = wx.reportAnalytics;
export const getExptInfoSync = wx.getExptInfoSync;
export const getCommonConfig = wx.getCommonConfig;
// 画布
export const createOffscreenCanvas = wx.createOffscreenCanvas;
// 从基础库 2.9.0 开始，本接口停止维护，请使用 Canvas 代替
export const createCanvasContext = wx.createCanvasContext;
export const canvasToTempFilePath = promisify(wx.canvasToTempFilePath);
export const canvasPutImageData = promisify(wx.canvasPutImageData);
export const canvasGetImageData = promisify(wx.canvasGetImageData);
// 媒体 - 地图
export const createMapContext = wx.createMapContext;
// 媒体 - 图片
export const saveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum);
export const previewMedia = promisify(wx.previewMedia);
export const previewImage = promisify(wx.previewImage);
export const getImageInfo = promisify(wx.getImageInfo);
export const editImage = wx.editImage;
export const cropImage = wx.cropImage;
export const compressImage = promisify(wx.compressImage);
export const chooseMessageFile = promisify(wx.chooseMessageFile);
// 从基础库 2.21.0 开始，本接口停止维护，请使用 wx.chooseMedia 代替
export const chooseImage = promisify(wx.chooseImage);
// 媒体 - 视频
export const saveVideoToPhotosAlbum = promisify(wx.saveVideoToPhotosAlbum);
export const openVideoEditor = wx.openVideoEditor;
export const getVideoInfo = promisify(wx.getVideoInfo);
export const createVideoContext = wx.createVideoContext;
export const compressVideo = promisify(wx.compressVideo);
// 从基础库 2.21.0 开始，本接口停止维护，请使用 wx.chooseMedia 代替
export const chooseVideo = promisify(wx.chooseVideo);
export const chooseMedia = promisify(wx.chooseMedia);
export const checkDeviceSupportHevc = wx.checkDeviceSupportHevc;
// 媒体 - 音频
// 从基础库 1.6.0 开始，本接口停止维护，请使用 wx.createInnerAudioContext 代替
export const stopVoice = promisify(wx.stopVoice);
export const setInnerAudioOption = promisify(wx.setInnerAudioOption);
export const playVoice = promisify(wx.playVoice);
export const pauseVoice = promisify(wx.pauseVoice);
export const getAvailableAudioSources = promisify(wx.getAvailableAudioSources);
export const createWebAudioContext = wx.createWebAudioContext;
export const createInnerAudioContext = wx.createInnerAudioContext;
// 从基础库 1.6.0 开始，本接口停止维护，请使用 wx.createInnerAudioContext 代替
export const createAudioContext = wx.createAudioContext;
export const stopBackgroundAudio = promisify(wx.stopBackgroundAudio);
export const seekBackgroundAudio = promisify(wx.seekBackgroundAudio);
export const playBackgroundAudio = promisify(wx.playBackgroundAudio);
export const pauseBackgroundAudio = promisify(wx.pauseBackgroundAudio);
export const onBackgroundAudioStop = wx.onBackgroundAudioStop;
export const onBackgroundAudioPlay = wx.onBackgroundAudioPlay;
export const onBackgroundAudioPause = wx.onBackgroundAudioPause;
export const getBackgroundAudioPlayerState = promisify(wx.getBackgroundAudioPlayerState);
export const getBackgroundAudioManager = wx.getBackgroundAudioManager;
// 媒体 - 实时音视频
export const createLivePlayerContext = wx.createLivePlayerContext;
export const createLivePusherContext = wx.createLivePusherContext;
// 媒体 - 录音
// 从基础库 1.6.0 开始，本接口停止维护，请使用 wx.getRecorderManager 代替
export const stopRecord = promisify(wx.stopRecord);
export const startRecord = promisify(wx.startRecord);
export const getRecorderManager = wx.getRecorderManager;
// 媒体 - 相机
export const createCameraContext = wx.createCameraContext;
// 媒体 - 音视频合成
export const createMediaContainer = wx.createMediaContainer;
// 媒体 - 实时语音
export const updateVoIPChatMuteConfig = promisify(wx.updateVoIPChatMuteConfig);
export const subscribeVoIPVideoMembers = promisify(wx.subscribeVoIPVideoMembers);
export const setEnable1v1Chat = promisify(wx.setEnable1v1Chat);
export const onVoIPVideoMembersChanged = wx.onVoIPVideoMembersChanged;
export const onVoIPChatStateChanged = wx.onVoIPChatStateChanged;
export const onVoIPChatSpeakersChanged = wx.onVoIPChatSpeakersChanged;
export const onVoIPChatMembersChanged = wx.onVoIPChatMembersChanged;
export const onVoIPChatInterrupted = wx.onVoIPChatInterrupted;
export const offVoIPVideoMembersChanged = wx.offVoIPVideoMembersChanged;
export const offVoIPChatStateChanged = wx.offVoIPChatStateChanged;
export const offVoIPChatSpeakersChanged = wx.offVoIPChatSpeakersChanged;
export const offVoIPChatMembersChanged = wx.offVoIPChatMembersChanged;
export const offVoIPChatInterrupted = wx.offVoIPChatInterrupted;
export const joinVoIPChat = promisify(wx.joinVoIPChat);
export const join1v1Chat = promisify(wx.join1v1Chat);
export const exitVoIPChat = promisify(wx.exitVoIPChat);
// 媒体 - 画面录制器
export const createMediaRecorder = wx.createMediaRecorder;
// 媒体  - 视频解码器
export const createVideoDecoder = wx.createVideoDecoder;
// 位置
export const stopLocationUpdate = promisify(wx.stopLocationUpdate);
export const startLocationUpdateBackground = promisify(wx.startLocationUpdateBackground);
export const startLocationUpdate = promisify(wx.startLocationUpdate);
export const openLocation = promisify(wx.openLocation);
export const onLocationChangeError = wx.onLocationChangeError;
export const offLocationChangeError = wx.offLocationChangeError;
export const onLocationChange = wx.onLocationChange;
export const getLocation = promisify(wx.getLocation);
export const getFuzzyLocation = wx.getFuzzyLocation;
// 为确保选择地理位置接口的合理使用，位置接口调整参考 选择地理位置接口调整公告
export const choosePoi = promisify(wx.choosePoi);
export const chooseLocation = promisify(wx.chooseLocation);
// 文件
export const saveFileToDisk = wx.saveFileToDisk;
export const openDocument = promisify(wx.openDocument);
export const getFileSystemManager = promisify(wx.getFileSystemManager);
// 开放接口 - 登录
export const pluginLogin = wx.pluginLogin;
export const login = wx.login;
export const checkSession = promisify(wx.checkSession);
// 开放接口 - 账号信息
export const getAccountInfoSync = wx.getAccountInfoSync;
// 开放接口 - 用户信息 用户头像昵称获取规则已调整 https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01
export const getUserProfile = promisify(wx.getUserProfile);
export const getUserInfo = promisify(wx.getUserInfo);
// 开放接口 - 授权
export const authorizeForMiniProgram = wx.authorizeForMiniProgram;
export const authorize = promisify(wx.authorize);
// 开放接口 - 设置
export const openSetting = promisify(wx.openSetting);
export const getSetting = promisify(wx.getSetting);
// 开放接口 - 收货地址
export const chooseAddress = promisify(wx.chooseAddress);
// 开放接口 - 卡卷
export const openCard = promisify(wx.openCard);
export const addCard = promisify(wx.addCard);
// 开发接口 -  发票
export const chooseInvoiceTitle = promisify(wx.chooseInvoiceTitle);
export const chooseInvoice = promisify(wx.chooseInvoice);
// 开发接口 -  生物认证
export const startSoterAuthentication = promisify(wx.startSoterAuthentication);
export const checkIsSupportSoterAuthentication = promisify(wx.checkIsSupportSoterAuthentication);
export const checkIsSoterEnrolledInDevice = promisify(wx.checkIsSoterEnrolledInDevice);
// 开放接口 - 微信运动
export const shareToWeRun = promisify(wx.shareToWeRun);
export const getWeRunData = promisify(wx.getWeRunData);
// 开放接口 - 订阅消息
export const requestSubscribeMessage = promisify(wx.requestSubscribeMessage);
export const requestSubscribeDeviceMessage = promisify(wx.requestSubscribeDeviceMessage);
// 开放接口 - 微信红包
export const showRedPackage = promisify(wx.showRedPackage);
// 开放接口 - 微信小店
export const openStoreOrderDetail = wx.openStoreOrderDetail;
// @ts-expect-error
export const openStoreCouponDetail = wx.openStoreCouponDetail;
// 开放接口 - 收藏
export const addVideoToFavorites = wx.addVideoToFavorites;
export const addFileToFavorites = wx.addFileToFavorites;
// 开放接口 - 我的小程序
export const checkIsAddedToMyMiniProgram = wx.checkIsAddedToMyMiniProgram;
// 开放接口 - 车牌
export const chooseLicensePlate = wx.chooseLicensePlate;
// 开放接口 - 视频号
export const reserveChannelsLive = wx.reserveChannelsLive;
export const openChannelsUserProfile = wx.openChannelsUserProfile;
export const openChannelsLive = wx.openChannelsLive;
export const openChannelsEvent = wx.openChannelsEvent;
export const openChannelsActivity = wx.openChannelsActivity;
export const getChannelsShareKey = wx.getChannelsShareKey;
export const getChannelsLiveNoticeInfo = wx.getChannelsLiveNoticeInfo;
export const getChannelsLiveInfo = wx.getChannelsLiveInfo;
// 开放接口 - 音视频通话
export const requestDeviceVoIP = wx.requestDeviceVoIP;
export const getDeviceVoIPList = wx.getDeviceVoIPList;
// 开放接口 - 微信群
export const getGroupEnterInfo = wx.getGroupEnterInfo;
// 开放接口 - 隐私信息授权
export const requirePrivacyAuthorize = wx.requirePrivacyAuthorize;
export const openPrivacyContract = wx.openPrivacyContract;
export const onNeedPrivacyAuthorization = wx.onNeedPrivacyAuthorization;
export const getPrivacySetting = wx.getPrivacySetting;
// 开放接口 - 微信客服
export const openCustomerServiceChat = wx.openCustomerServiceChat;
// 开放接口 - 微信表情
export const openStickerSetView = wx.openStickerSetView;
export const openStickerIPView = wx.openStickerIPView;
export const openSingleStickerView = wx.openSingleStickerView;
// 设备 - 蓝牙通用
export const stopBluetoothDevicesDiscovery = promisify(wx.stopBluetoothDevicesDiscovery);
export const startBluetoothDevicesDiscovery = promisify(wx.startBluetoothDevicesDiscovery);
export const openBluetoothAdapter = wx.openBluetoothAdapter;
export const onBluetoothDeviceFound = wx.onBluetoothDeviceFound;
export const onBluetoothAdapterStateChange = wx.onBluetoothAdapterStateChange;
export const offBluetoothDeviceFound = wx.offBluetoothDeviceFound;
export const offBluetoothAdapterStateChange = wx.offBluetoothAdapterStateChange;
export const makeBluetoothPair = promisify(wx.makeBluetoothPair);
export const isBluetoothDevicePaired = promisify(wx.isBluetoothDevicePaired);
export const getConnectedBluetoothDevices = promisify(wx.getConnectedBluetoothDevices);
export const getBluetoothDevices = promisify(wx.getBluetoothDevices);
export const getBluetoothAdapterState = promisify(wx.getBluetoothAdapterState);
export const closeBluetoothAdapter = promisify(wx.closeBluetoothAdapter);
// 设备 - 蓝牙 - 低功耗中心设备
export const writeBLECharacteristicValue = promisify(wx.writeBLECharacteristicValue);
export const setBLEMTU = promisify(wx.setBLEMTU);
export const readBLECharacteristicValue = promisify(wx.readBLECharacteristicValue);
export const onBLEMTUChange = wx.onBLEMTUChange;
export const onBLEConnectionStateChange = wx.onBLEConnectionStateChange;
export const onBLECharacteristicValueChange = wx.onBLECharacteristicValueChange;
export const offBLEMTUChange = wx.offBLEMTUChange;
export const offBLEConnectionStateChange = wx.offBLEConnectionStateChange;
export const offBLECharacteristicValueChange = wx.offBLECharacteristicValueChange;
export const notifyBLECharacteristicValueChange = promisify(wx.notifyBLECharacteristicValueChange);
export const getBLEMTU = promisify(wx.getBLEMTU);
export const getBLEDeviceRSSI = promisify(wx.getBLEDeviceRSSI);
export const getBLEDeviceCharacteristics = promisify(wx.getBLEDeviceCharacteristics);
export const getBLEDeviceServices = promisify(wx.getBLEDeviceServices);
export const createBLEConnection = promisify(wx.createBLEConnection);
export const closeBLEConnection = promisify(wx.closeBLEConnection);
// 设备 - 蓝牙 - 低功耗外围设备
export const onBLEPeripheralConnectionStateChanged = wx.onBLEPeripheralConnectionStateChanged;
export const offBLEPeripheralConnectionStateChanged = wx.offBLEPeripheralConnectionStateChanged;
export const createBLEPeripheralServer = promisify(wx.createBLEPeripheralServer);
// 设备 - 蓝牙 - 信标
export const stopBeaconDiscovery = promisify(wx.stopBeaconDiscovery);
export const startBeaconDiscovery = promisify(wx.startBeaconDiscovery);
export const onBeaconUpdate = wx.onBeaconUpdate;
export const offBeaconUpdate = wx.offBeaconUpdate;
export const onBeaconServiceChange = wx.onBeaconServiceChange;
export const offBeaconServiceChange = wx.offBeaconServiceChange;
export const getBeacons = promisify(wx.getBeacons);
// 设备 - NFC读写
export const getNFCAdapter = wx.getNFCAdapter;
// 设备 - WIFI
export const stopWifi = promisify(wx.stopWifi);
export const startWifi = promisify(wx.startWifi);
export const setWifiList = promisify(wx.setWifiList);
export const onWifiConnected = wx.onWifiConnected;
export const onGetWifiList = wx.onGetWifiList;
export const offWifiConnectedWithPartialInfo = wx.offWifiConnectedWithPartialInfo;
export const offWifiConnected = wx.offWifiConnected;
export const offGetWifiList = wx.offGetWifiList;
export const getWifiList = promisify(wx.getWifiList);
export const getConnectedWifi = promisify(wx.getConnectedWifi);
export const connectWifi = promisify(wx.connectWifi);
// 设备 - 日历
export const addPhoneRepeatCalendar = promisify(wx.addPhoneRepeatCalendar);
export const addPhoneCalendar = promisify(wx.addPhoneCalendar);
// 设备 - 联系人
export const chooseContact = wx.chooseContact;
export const addPhoneContact = promisify(wx.addPhoneContact);
// 设备 - 无障碍
export const checkIsOpenAccessibility = promisify(wx.checkIsOpenAccessibility);
// 设备 - 电量
export const onBatteryInfoChange = wx.onBatteryInfoChange;
export const offBatteryInfoChange = wx.offBatteryInfoChange;
export const getBatteryInfoSync = promisify(wx.getBatteryInfoSync);
export const getBatteryInfo = promisify(wx.getBatteryInfo);
// 设备 - 剪贴板
export const setClipboardData = promisify(wx.setClipboardData);
export const getClipboardData = promisify(wx.getClipboardData);
// 设备 - NFC 主机卡模拟
export const stopHCE = promisify(wx.stopHCE);
export const startHCE = promisify(wx.startHCE);
export const sendHCEMessage = promisify(wx.sendHCEMessage);
export const onHCEMessage = wx.onHCEMessage;
export const offHCEMessage = wx.offHCEMessage;
export const getHCEState = promisify(wx.getHCEState);
// 设备 - 网络
export const onNetworkWeakChange = wx.onNetworkWeakChange;
export const onNetworkStatusChange = wx.onNetworkStatusChange;
export const offNetworkStatusChange = wx.offNetworkStatusChange;
export const getNetworkType = promisify(wx.getNetworkType);
export const getLocalIPAddress = wx.getLocalIPAddress;
// 设备 - 加密
export const getRandomValues = promisify(wx.getRandomValues);
// 设备 - 屏幕
export const setVisualEffectOnCapture = wx.setVisualEffectOnCapture;
export const setScreenBrightness = promisify(wx.setScreenBrightness);
export const setKeepScreenOn = promisify(wx.setKeepScreenOn);
export const onUserCaptureScreen = wx.onUserCaptureScreen;
export const onScreenRecordingStateChanged = wx.onScreenRecordingStateChanged;
export const offUserCaptureScreen = wx.offUserCaptureScreen;
export const offScreenRecordingStateChanged = wx.offScreenRecordingStateChanged;
export const getScreenRecordingState = wx.getScreenRecordingState;
export const getScreenBrightness = promisify(wx.getScreenBrightness);
// 设备 - 键盘
export const onKeyUp = wx.onKeyUp;
export const onKeyDown = wx.onKeyDown;
export const onKeyboardHeightChange = wx.onKeyboardHeightChange;
export const offKeyUp = wx.offKeyUp;
export const offKeyDown = wx.offKeyDown;
export const offKeyboardHeightChange = wx.offKeyboardHeightChange;
export const hideKeyboard = promisify(wx.hideKeyboard);
export const getSelectedTextRange = promisify(wx.getSelectedTextRange);
// 设备 - 电话
export const makePhoneCall = promisify(wx.makePhoneCall);
// 设备 - 加速计
export const stopAccelerometer = promisify(wx.stopAccelerometer);
export const startAccelerometer = promisify(wx.startAccelerometer);
export const onAccelerometerChange = wx.onAccelerometerChange;
export const offAccelerometerChange = wx.offAccelerometerChange;
// 设备 - 罗盘
export const stopCompass = promisify(wx.stopCompass);
export const startCompass = promisify(wx.startCompass);
export const onCompassChange = wx.onCompassChange;
export const offCompassChange = wx.offCompassChange;
// 设备 - 设备方向
export const stopDeviceMotionListening = promisify(wx.stopDeviceMotionListening);
export const startDeviceMotionListening = promisify(wx.startDeviceMotionListening);
export const onDeviceMotionChange = wx.onDeviceMotionChange;
export const offDeviceMotionChange = wx.offDeviceMotionChange;
// 设备 - 陀螺仪
export const stopGyroscope = promisify(wx.stopGyroscope);
export const startGyroscope = promisify(wx.startGyroscope);
export const onGyroscopeChange = wx.onGyroscopeChange;
export const offGyroscopeChange = wx.offGyroscopeChange;
// 设备 - 内存
export const onMemoryWarning = wx.onMemoryWarning;
export const offMemoryWarning = wx.offMemoryWarning;
// 设备 - 扫码
export const scanCode = promisify(wx.scanCode);
// 设备 - 短信
export const sendSms = wx.sendSms;
// 设备 - 震动
export const vibrateShort = promisify(wx.vibrateShort);
export const vibrateLong = promisify(wx.vibrateLong);
// AI - AI推理
export const getInferenceEnvInfo = wx.getInferenceEnvInfo;
export const createInferenceSession = wx.createInferenceSession;
// AI - 视觉算法
export const isVKSupport = wx.isVKSupport;
export const createVKSession = wx.createVKSession;
// AI - 人脸检测
export const stopFaceDetect = wx.stopFaceDetect;
export const initFaceDetect = wx.initFaceDetect;
export const faceDetect = wx.faceDetect;
// Worker
export const createWorker = wx.createWorker;
// WXML
export const createSelectorQuery = wx.createSelectorQuery;
export const createIntersectionObserver = wx.createIntersectionObserver;
// 第三方平台
export const getExtConfigSync = wx.getExtConfigSync;
export const getExtConfig = promisify(wx.getExtConfig);
// 广告
export const getShowSplashAdStatus = wx.getShowSplashAdStatus;
export const createRewardedVideoAd = wx.createRewardedVideoAd;
export const createInterstitialAd = wx.createInterstitialAd;
