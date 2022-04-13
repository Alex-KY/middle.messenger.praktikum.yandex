import sanitize from './sanitize';
import { lastMessageDate, messageTime, datetime } from './date-fns';

import { Indexed } from '../types';

function trim(str: string, sym?: string): string {
  const replaced = sym?.length ? sym : '\s\uFEFF\xA0';
  const reg = new RegExp(`^[${replaced}]+|[${replaced}]+$`, 'g');
  return str.replace(reg, '');
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
      if (!rhs.hasOwnProperty(p)) {
          continue;
      }
      try {
          if (rhs[p] instanceof Object) {
              rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
          } else {
              lhs[p] = rhs[p];
          }
      } catch(e) {
          lhs[p] = rhs[p];
      }
  }
  return lhs;
}

function isEqual(obj1: unknown, obj2: unknown) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export { trim, merge, isEqual, lastMessageDate, messageTime, datetime, sanitize };
