import { type TokenStore, type TokenCache } from '@commercetools/ts-client';

const TOKEN_STORAGE_KEY = 'commercetools_token';

export const PersistentTokenCache: TokenCache = {
  get: (): TokenStore => {
    try {
      const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!raw) {
        throw new Error('Token not found');
      }
      console.log('Getting token:', raw);
      return JSON.parse(raw) as TokenStore;
    } catch {
      return { token: '', expirationTime: 0 };
    }
  },

  set: (token: TokenStore): void => {
    try {
      console.log('Saving token:', token);
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
    } catch {}
  },
};
