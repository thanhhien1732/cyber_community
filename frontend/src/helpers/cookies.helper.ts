import { ACCESS_TOKEN, APP_LOCALE, REFRESH_TOKEN } from "@/constant/app.constant";

export function setCookie(name: string, value: string, maxAge?: number) {
   const age = maxAge === undefined ? "" : `; Max-Age=${maxAge}`;
   document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; SameSite=Lax${age}`;
}

export function getCookie(name: string) {
   const encodedName = `${encodeURIComponent(name)}=`;
   const cookie = document.cookie.split("; ").find((item) => item.startsWith(encodedName));
   return cookie ? decodeURIComponent(cookie.slice(encodedName.length)) : undefined;
}

export function deleteCookie(name: string) {
   document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export async function setRefreshToken(refreshToken: string) {
   setCookie(REFRESH_TOKEN, refreshToken);
}

export async function setAccessToken(accessToken: string) {
   setCookie(ACCESS_TOKEN, accessToken);
}

export async function getRefreshToken() {
   return getCookie(REFRESH_TOKEN);
}

export async function getAccessToken() {
   return getCookie(ACCESS_TOKEN);
}

export async function getLocale() {
   return getCookie(APP_LOCALE);
}

export async function clearTokens() {
   deleteCookie(REFRESH_TOKEN);
   deleteCookie(ACCESS_TOKEN);
}
