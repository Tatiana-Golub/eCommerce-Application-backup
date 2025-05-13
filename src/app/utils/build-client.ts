import {
  ClientBuilder,
  type Client,
  type PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache,
} from '@commercetools/ts-client';
import { PersistentTokenCache } from './token-cache';

class ClientBuilderUtility {
  private static instance: ClientBuilderUtility;

  private readonly authHost = import.meta.env.VITE_CTP_AUTH_HOST;
  private readonly host = import.meta.env.VITE_CTP_HOST;
  private readonly projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  private readonly scopes = [import.meta.env.VITE_CTP_SCOPES];
  private readonly clientId = import.meta.env.VITE_CTP_CLIENT_ID;
  private readonly clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

  private constructor() {}

  public static getInstance(): ClientBuilderUtility {
    if (!ClientBuilderUtility.instance) {
      ClientBuilderUtility.instance = new ClientBuilderUtility();
    }
    return ClientBuilderUtility.instance;
  }

  public adminClient(): Client {
    return this.clientCommonPart()
      .withClientCredentialsFlow(this.prepareAuthMiddlewareOptions())
      .build();
  }

  public anonymousClient(): Client {
    return this.clientCommonPart()
      .withAnonymousSessionFlow(this.prepareAuthMiddlewareOptions())
      .build();
  }

  public clientWithPassword(username: string, password: string): Client {
    return this.clientCommonPart()
      .withPasswordFlow(this.preparePasswordAuthMiddlewareOptions(username, password))
      .build();
  }

  public getTokenCacheClient(token: string): Client {
    return this.clientCommonPart()
      .withExistingTokenFlow(`Bearer ${token}`, { force: true })
      .build();
  }

  public getTokenCache(): TokenCache {
    return PersistentTokenCache;
  }

  private clientCommonPart(): ClientBuilder {
    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withHttpMiddleware(this.prepareHttpMiddlewareOptions())
      .withLoggerMiddleware();
  }

  private prepareAuthMiddlewareOptions(): AuthMiddlewareOptions {
    return {
      host: this.authHost,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
      scopes: this.scopes,
      httpClient: fetch,
      tokenCache: PersistentTokenCache,
    };
  }

  private prepareHttpMiddlewareOptions(): HttpMiddlewareOptions {
    return {
      host: this.host,
      httpClient: fetch,
    };
  }

  private preparePasswordAuthMiddlewareOptions(
    username: string,
    password: string,
  ): PasswordAuthMiddlewareOptions {
    return {
      host: this.authHost,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        user: {
          username,
          password,
        },
      },
      scopes: this.scopes,
      httpClient: fetch,
    };
  }
}

export const ApiClient = (): ClientBuilderUtility => ClientBuilderUtility.getInstance();

// const authHost = import.meta.env.VITE_CTP_AUTH_HOST;
// const host = import.meta.env.VITE_CTP_HOST;
// const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
// const scopes = [(import.meta.env.VITE_CTP_SCOPES)];
// const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
// const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: authHost,
//   projectKey: projectKey,
//   credentials: {
//     clientId: clientId,
//     clientSecret: clientSecret,
//   },
//   scopes: scopes,
//   httpClient: fetch,
// };

// const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
// host: authHost,
// projectKey: projectKey,
// credentials: {
//   clientId: clientId,
//   clientSecret: clientSecret,
//   user: {
//     username: username,
//     password: password
//   }
// },
// scopes: scopes,
// httpClient: fetch,
// }

// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: host,
//   httpClient: fetch,
// };

// export const AdminClient = new ClientBuilder()
//   .withProjectKey(projectKey)
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware()
//   .build();

//   export const annonimousClient = new ClientBuilder()
//   .withProjectKey(projectKey)
//   .withAnonymousSessionFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware()
//   .build();

//   export const customerClient = new ClientBuilder()
//   .withProjectKey(projectKey)
//   .withPasswordFlow(passwordAuthMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware()
//   .build();
