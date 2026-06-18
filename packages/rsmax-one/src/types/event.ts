/**
 * rsmax-one 事件类型
 * 统一从 @rsmax/types 引入，保持 API 兼容
 */
import type {
  BaseEvent,
  EventCurrentTarget,
  EventTarget,
  FormEvent,
  ImageErrorEvent,
  ImageLoadEvent,
  InputEvent,
  TapEvent,
  Touch,
  TouchCancelEvent,
  TouchEndEvent,
  TouchEvent,
  TouchMoveEvent,
  TouchStartEvent,
} from '@rsmax/types';

export type {
  EventTarget,
  EventCurrentTarget,
  Touch,
  TouchEvent,
  TouchStartEvent,
  TouchMoveEvent,
  TouchEndEvent,
  TouchCancelEvent,
  ImageLoadEvent,
  ImageErrorEvent,
  TapEvent,
  InputEvent,
  FormEvent,
};

/** rsmax-one 中的 Event 等价于 @rsmax/types 的 BaseEvent */
export type Event = BaseEvent;
