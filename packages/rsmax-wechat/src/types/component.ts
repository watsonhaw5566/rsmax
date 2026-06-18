import type {
  CommonProps as BaseCommonProps,
  GenericEvent as BaseGenericEvent,
  BaseEvent as GenericBaseEvent,
  TouchEvent as GenericTouchEvent,
} from '@rsmax/types';

/** 微信内置组件公共属性（基于通用 CommonProps，扩展微信特有字段） */
// reference: https://developers.weixin.qq.com/miniprogram/dev/framework/view/component.html
export interface BaseProps extends BaseCommonProps {
  // Note: children、dataset、id、className、style、hidden、animation
  // 以及 onTap、onClick、onTouchStart、onTouchMove、onTouchCancel、
  // onTouchEnd、onLongPress、onLongTap、onTransitionEnd、onAnimationStart、
  // onAnimationiteration、onAnimationEnd、onTouchForceChange、catchClick
  // 均继承自 @rsmax/types 中的 CommonProps
}

// reference: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html

/** 基础事件对象属性列表（与 @rsmax/types 保持一致） */
export interface BaseEvent extends GenericBaseEvent {}

/** 自定义事件对象属性列表（与 @rsmax/types 保持一致） */
export interface GenericEvent<Detail = unknown> extends BaseGenericEvent<Detail> {}

/** 触摸事件对象属性列表（与 @rsmax/types 保持一致） */
export interface TouchEvent<T = import('@rsmax/types').Touch> extends GenericTouchEvent<T> {}
