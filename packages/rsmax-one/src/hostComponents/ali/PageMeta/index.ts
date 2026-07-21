import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface PageMetaProps {
  /** 窗口的背景色，必须为十六进制颜色值 */
  backgroundColor?: string;
  /** 顶部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持 */
  backgroundColorTop?: string;
  /** 底部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持 */
  backgroundColorBottom?: string;
  /** 页面内容的背景色，用于页面中的空白部分和页面大小变化 resize 动画期间的临时空闲区域 */
  rootBackgroundColor?: string;
  /** 滚动位置，可以使用 px 或者 rpx 为单位，在被设置时，页面会滚动到对应位置。 */
  scrollTop?: string;
  /** 滚动动画时长 默认值： 300 */
  scrollDuration?: number;
  /** 页面根节点样式，页面根节点是所有页面节点的祖先节点，相当于 HTML 中的 body 节点。 */
  pageStyle?: string;
  /** 页面 page 的字体大小，可以设置为system，表示使用当前用户设置的支付宝字体大小。 */
  pageFontSize?: string;
  /** 页面的根字体大小，页面中的所有 rem 单位，将使用这个字体大小作为参考值，即 1rem 等于这个字体大小；可以设置为 system，表示使用当前用户设置的支付宝字体大小。 */
  rootFontSize?: string;
  /** 页面滚动时触发，event.detail = { scrollTop } */
  onScroll?: (e: any) => any;
  children?: React.ReactNode;
}

/**
 * 页面属性配置节点，用于指定页面的一些属性、监听页面事件。只能是页面内的第一个节点。
 * 通过这个节点可以获得类似于调用 my.setBackgroundTextStyle、my.setBackgroundColor 等接口调用的效果。
 * @see https://opendocs.alipay.com/mini/component/pagemeta?pathHash=04c010d0
 */
export const PageMeta: React.ComponentType<PageMetaProps> = createHostComponent<PageMetaProps>('page-meta');

PageMeta.defaultProps = {
  scrollDuration: 300,
};
