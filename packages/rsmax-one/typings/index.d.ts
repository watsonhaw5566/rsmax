type DOMStringMap = Record<string, string>;

interface InputEvent extends Event {
  readonly data: string | null;
  readonly inputType: string;
  readonly isComposing: boolean;
  target: EventTarget | null;
}
