import { format, parseISO } from 'date-fns';
import { ru as locale } from 'date-fns/locale';

function localeFormat(dateString: string, formatPattern: string) {
  const date = parseISO(dateString);

  return format(date, formatPattern, { locale });
}

function toCapitalCase(text: string) {
  return text
    .split('')
    .map((a, i) => !i ? a.toUpperCase() : a)
    .join('');
}

export function lastMessageDate(dateString: string) {
  if (!dateString) return '';
  return localeFormat(dateString, 'k:mm');
}

export function messageTime(dateString: string) {
  if (!dateString) return '';
  return localeFormat(dateString, 'k:mm');
}

export function datetime(dateString: string) {
  if (!dateString) return '';

  const month = toCapitalCase(localeFormat(dateString, 'LLLL'));
  const day = toCapitalCase(localeFormat(dateString, 'EEEE'));

  return localeFormat(dateString, `${day}, d ${month} yyyy г. kk:mm:ss OOO`);
}
