import { promisify } from '@rsmax/framework-shared';

declare const my: any;
export const navigateTo = promisify(my.navigateTo);
export const navigateBack = promisify(my.navigateBack);
export const redirectTo = promisify(my.redirectTo);
export const reLaunch = promisify(my.reLaunch);
export const switchTab = promisify(my.switchTab);
