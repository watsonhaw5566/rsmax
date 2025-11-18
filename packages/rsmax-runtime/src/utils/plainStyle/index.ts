import { RuntimeOptions } from '@rsmax/framework-shared';
import { isUnitlessNumber } from './CSSProperty';

const vendorPrefixes = ['webkit', 'moz', 'ms', 'o'];

const transformReactStyleKey = (key: string) => {
  // css3 var
  if (key?.startsWith('--')) {
    return key;
  }

  let styleValue = key.replace(/\.?([A-Z]+)/g, (_x: any, y: string) => `-${y.toLowerCase()}`);

  // vendor prefix
  if (styleValue?.startsWith('-')) {
    const firstWord = styleValue.split('-').filter(s => s)[0];
    styleValue = styleValue.replace(/^-/, '');

    if (vendorPrefixes.includes(firstWord)) {
      styleValue = `-${styleValue}`;
    }
  }

  return styleValue;
};

const transformPx = (value: string) => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.replace(/\b(\d+(\.\d+)?)px\b/g, (match, x) => {
    const targetUnit = 'rpx';
    const size = Number(x);
    return size % 1 === 0 ? size + targetUnit : size.toFixed(2) + targetUnit;
  });
};

const plainStyle = (style: Record<string, string | number>) => {
  const acc: string[] = [];
  const keys = Object.keys(style);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    let value = (style as any)[key];

    if (!Number.isNaN(Number(value)) && !isUnitlessNumber[key] && !key?.startsWith('--')) {
      value = `${value}rpx`;
    }

    acc.push(`${transformReactStyleKey(key)}:${RuntimeOptions.get('pxToRpx') ? transformPx(value) : value};`);
  }
  return acc.join('');
};

export default plainStyle;
