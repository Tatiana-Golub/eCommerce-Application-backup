import type { Customer } from '@commercetools/platform-sdk';
import type { TokenCache, TokenStore } from '@commercetools/ts-client';

const MAIN_TOKEN_KEY = 'commercetools_token';
const USER = 'current_user';

export const PersistentTokenCache: TokenCache = {
  get: (): TokenStore => {
    try {
      const raw = localStorage.getItem(MAIN_TOKEN_KEY);
      if (!raw) {
        throw new Error('Token not found');
      }
      return JSON.parse(raw) as TokenStore;
    } catch {
      return { token: '', expirationTime: 0 };
    }
  },

  set: (token: TokenStore): void => {
    localStorage.setItem(MAIN_TOKEN_KEY, JSON.stringify(token));
  },
};

export const clearTokens = (): void => {
  localStorage.removeItem(MAIN_TOKEN_KEY);
};

export const UserCache = {
  get: (): Customer => JSON.parse(localStorage.getItem(USER) || '{}'),
  set: (customer: Customer): void => {
    localStorage.setItem(USER, JSON.stringify(customer));
  },
  clearUser: (): void => {
    localStorage.removeItem(USER);
  },
};
