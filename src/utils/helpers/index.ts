function trim(str: string, sym?: string): string {
  const replaced = sym?.length ? sym : '\s\uFEFF\xA0';
  const reg = new RegExp(`^[${replaced}]+|[${replaced}]+$`, 'g');
  return str.replace(reg, '');
}

type Indexed<T = any> = {
  [key in string]: T;
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
      if (!rhs.hasOwnProperty(p)) {
          continue;
      }
      try {
          if (rhs[p].constructor === Object) {
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

function isEqual(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export { trim, merge, isEqual };
