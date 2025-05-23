import { promisify } from '@rsmax/framework-shared';

export const getAppStub = getApp;

export const canIUse = tt.canIUse;
export const getSystemInfoSync = tt.getSystemInfoSync;
export const getSystemInfo = promisify(tt.getSystemInfo);
export const getUpdateManager = tt.getUpdateManager;
export const getLaunchOptionsSync = tt.getLaunchOptionsSync;
export const exitMiniProgram = tt.exitMiniProgram;
export const switchTab = promisify(tt.switchTab);
export const reLaunch = promisify(tt.reLaunch);
export const redirectTo = promisify(tt.redirectTo);
export const navigateTo = promisify(tt.navigateTo);
export const navigateBack = promisify(tt.navigateBack);
export const showToast = promisify(tt.showToast);
export const showModal = promisify(tt.showModal);
export const showLoading = promisify(tt.showLoading);
// @ts-ignore
export const showActionSheet = promisify(tt.showActionSheet);
export const hideToast = promisify(tt.hideToast);
export const hideLoading = promisify(tt.hideLoading);
export const setNavigationBarTitle = tt.setNavigationBarTitle;
export const stopPullDownRefresh = tt.stopPullDownRefresh;
export const startPullDownRefresh = tt.startPullDownRefresh;
export const pageScrollTo = promisify(tt.pageScrollTo);
export const createAnimation = tt.createAnimation;
export const request = promisify(tt.request);
export const downloadFile = promisify(tt.downloadFile);
export const uploadFile = promisify(tt.uploadFile);
export const connectSocket = tt.connectSocket;
export const setStorageSync = tt.setStorageSync;
export const setStorage = promisify(tt.setStorage);
export const removeStorageSync = tt.removeStorageSync;
export const removeStorage = promisify(tt.removeStorage);
export const getStorageSync = tt.getStorageSync;
export const getStorageInfoSync = tt.getStorageInfoSync;
export const getStorageInfo = promisify(tt.getStorageInfo);
export const getStorage = promisify(tt.getStorage);
export const clearStorageSync = tt.clearStorageSync;
export const clearStorage = promisify(tt.clearStorage);
export const saveImageToPhotosAlbum = promisify(tt.saveImageToPhotosAlbum);
export const previewImage = promisify(tt.previewImage);
export const getImageInfo = promisify(tt.getImageInfo);
export const chooseImage = promisify(tt.chooseImage);
// @ts-ignore
export const saveVideoToPhotosAlbum = promisify(tt.saveVideoToPhotosAlbum);
export const createVideoContext = tt.createVideoContext;
// @ts-ignore
export const chooseVideo = promisify(tt.chooseVideo);
export const openLocation = promisify(tt.openLocation);
export const getLocation = promisify(tt.getLocation);
export const showShareMenu = promisify(tt.showShareMenu);
export const hideShareMenu = promisify(tt.hideShareMenu);
export const navigateToVideoView = promisify(tt.navigateToVideoView);
export const createCanvasContext = tt.createCanvasContext;
export const saveFile = promisify(tt.saveFile);
export const removeSavedFile = promisify(tt.removeSavedFile);
// @ts-ignore
export const openDocument = promisify(tt.openDocument);
export const getSavedFileList = tt.getSavedFileList;
export const getFileSystemManager = tt.getFileSystemManager;
export const getFileInfo = tt.getFileInfo;
export const login = promisify(tt.login);
export const checkSession = tt.checkSession;
export const navigateToMiniProgram = tt.navigateToMiniProgram;
export const navigateBackMiniProgram = promisify(tt.navigateBackMiniProgram);
export const getUserInfo = promisify(tt.getUserInfo);
export const reportAnalytics = tt.reportAnalytics;
export const Pay = promisify(tt.pay);
export const pay = promisify(tt.pay);
export const authorize = promisify(tt.authorize);
export const openSetting = promisify(tt.openSetting);
export const getSetting = promisify(tt.getSetting);
export const chooseAddress = promisify(tt.chooseAddress);
export const setClipboardData = promisify(tt.setClipboardData);
export const getClipboardData = tt.getClipboardData;
export const onNetworkStatusChange = tt.onNetworkStatusChange;
// @ts-ignore
export const getNetworkType = promisify(tt.getNetworkType);
export const makePhoneCall = promisify(tt.makePhoneCall);
export const stopAccelerometer = promisify(tt.stopAccelerometer);
export const startAccelerometer = promisify(tt.startAccelerometer);
export const onAccelerometerChange = tt.onAccelerometerChange;
export const stopCompass = promisify(tt.stopCompass);
export const startCompass = promisify(tt.startCompass);
export const onCompassChange = tt.onCompassChange;
export const scanCode = promisify(tt.scanCode);
export const vibrateShort = promisify(tt.vibrateShort);
export const vibrateLong = promisify(tt.vibrateLong);
export const getExtConfigSync = tt.getExtConfigSync;
export const getExtConfig = promisify(tt.getExtConfig);
export const createSelectorQuery = tt.createSelectorQuery;
export const createIntersectionObserver = tt.createIntersectionObserver;
// @ts-ignore
export const createRewardedVideoAd = tt.createRewardedVideoAd;
export const getConnectedWifi = promisify(tt.getConnectedWifi);
export const setKeepScreenOn = promisify(tt.setKeepScreenOn);
export const getMenuButtonLayout = tt.getMenuButtonLayout;
export const getMenuButtonBoundingClientRect = tt.getMenuButtonBoundingClientRect;
export const createInnerAudioContext = tt.createInnerAudioContext;
export const getBackgroundAudioManager = tt.getBackgroundAudioManager;
export const getRecorderManager = tt.getRecorderManager;
export const createLivePlayerContext = tt.createLivePlayerContext;
export const createMapContext = tt.createMapContext;
// export const interactionAnalysis = promisify(tt.interactionAnalysis);
export const followOfficialAccount = promisify(tt.followOfficialAccount);
export const checkFollowState = promisify(tt.checkFollowState);
export const onMemoryWarning = tt.onMemoryWarning;
export const showTabBarRedDot = promisify(tt.showTabBarRedDot);
export const showTabBar = promisify(tt.showTabBar);
export const setTabBarStyle = promisify(tt.setTabBarStyle);
export const setTabBarItem = promisify(tt.setTabBarItem);
export const setTabBarBadge = promisify(tt.setTabBarBadge);
export const removeTabBarBadge = promisify(tt.removeTabBarBadge);
export const hideTabBarRedDot = promisify(tt.hideTabBarRedDot);
export const hideTabBar = promisify(tt.hideTabBar);
// AI/AR能力
// @ts-ignore
export const getAlgorithmManager = promisify(tt.getAlgorithmManager);
// @ts-ignore
export const createStickerManager = promisify(tt.createStickerManager);
// @ts-ignore
export const createBytennEngineContext = promisify(tt.createBytennEngineContext);
