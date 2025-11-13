import { promisify } from '@rsmax/framework-shared';

declare const tt: any;
export const navigateTo = promisify(tt.navigateTo);
export const navigateBack = promisify(tt.navigateBack);
export const redirectTo = promisify(tt.redirectTo);
export const reLaunch = promisify(tt.reLaunch);
export const switchTab = promisify(tt.switchTab);
