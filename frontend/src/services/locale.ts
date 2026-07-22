import { defaultLocale, Locale } from '@/i18n/config';
import { getCookie, setCookie } from '@/helpers/cookies.helper';
import { APP_LOCALE } from '@/constant/app.constant';

export const LOCALE_CHANGED_EVENT = 'cyber-community:locale-changed';

export function getUserLocale() {
  return getCookie(APP_LOCALE) || defaultLocale;
}

export function setUserLocale(locale: Locale) {
  setCookie(APP_LOCALE, locale);
  window.dispatchEvent(new CustomEvent(LOCALE_CHANGED_EVENT, { detail: locale }));
}
