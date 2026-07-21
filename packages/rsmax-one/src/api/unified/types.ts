export interface SystemInfo {
  brand: string;
  model: string;
  pixelRatio: number;
  screenWidth: number;
  screenHeight: number;
  windowWidth: number;
  windowHeight: number;
  statusBarHeight: number;
  language: string;
  version: string;
  platform: 'ios' | 'android' | 'windows' | 'mac';
}

export interface NavigateToOptions {
  url: string;
  success?: () => void;
  fail?: () => void;
  complete?: () => void;
}

export interface NavigateBackOptions {
  delta?: number;
}

export interface RedirectToOptions {
  url: string;
}

export interface SwitchTabOptions {
  url: string;
}

export interface ReLaunchOptions {
  url: string;
}

export interface ToastOptions {
  title: string;
  icon?: 'success' | 'loading' | 'none' | 'error';
  image?: string;
  duration?: number;
  mask?: boolean;
}

export interface ModalOptions {
  title?: string;
  content?: string;
  showCancel?: boolean;
  cancelText?: string;
  cancelColor?: string;
  confirmText?: string;
  confirmColor?: string;
  editable?: boolean;
  placeholderText?: string;
}

export interface ModalResult {
  confirm: boolean;
  cancel: boolean;
  content?: string;
}

export interface LoadingOptions {
  title?: string;
  mask?: boolean;
}

export interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
  data?: any;
  header?: Record<string, string>;
  timeout?: number;
  dataType?: string;
  responseType?: 'text' | 'arraybuffer';
}

export interface RequestResult {
  data: any;
  statusCode: number;
  header: Record<string, string>;
}

export interface UploadFileOptions {
  url: string;
  filePath: string;
  name: string;
  header?: Record<string, string>;
  formData?: Record<string, any>;
}

export interface UploadFileResult {
  data: any;
  statusCode: number;
}

export interface DownloadFileOptions {
  url: string;
  header?: Record<string, string>;
}

export interface DownloadFileResult {
  tempFilePath: string;
  statusCode: number;
}

export interface StorageOptions {
  key: string;
  data: any;
}

export interface GetStorageOptions {
  key: string;
}

export interface StorageResult {
  data: any;
}

export interface RemoveStorageOptions {
  key: string;
}

export type Platform = 'wechat' | 'ali' | 'toutiao';

export interface UnifiedAPI {
  getSystemInfo(): Promise<SystemInfo>;
  getSystemInfoSync(): SystemInfo;

  navigateTo(options: NavigateToOptions): Promise<void>;
  navigateBack(options?: NavigateBackOptions): Promise<void>;
  redirectTo(options: RedirectToOptions): Promise<void>;
  switchTab(options: SwitchTabOptions): Promise<void>;
  reLaunch(options: ReLaunchOptions): Promise<void>;

  showToast(options: ToastOptions): Promise<void>;
  showModal(options: ModalOptions): Promise<ModalResult>;
  showLoading(options?: LoadingOptions): Promise<void>;
  hideLoading(): void;

  request(options: RequestOptions): Promise<RequestResult>;
  uploadFile(options: UploadFileOptions): Promise<UploadFileResult>;
  downloadFile(options: DownloadFileOptions): Promise<DownloadFileResult>;

  setStorage(options: StorageOptions): Promise<void>;
  setStorageSync(options: StorageOptions): void;
  getStorage(options: GetStorageOptions): Promise<StorageResult>;
  getStorageSync(options: GetStorageOptions): StorageResult;
  removeStorage(options: RemoveStorageOptions): Promise<void>;
  removeStorageSync(options: RemoveStorageOptions): void;
  clearStorage(): Promise<void>;
  clearStorageSync(): void;
}
