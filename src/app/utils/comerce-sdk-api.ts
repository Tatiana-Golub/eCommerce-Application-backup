import {
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { type ClientResponse } from '@commercetools/ts-client';
import { ApiClient } from './build-client';

class CommerceSdkApi {
  private static instance: CommerceSdkApi;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.apiRoot = this.withAnonymousSessionFlow().apiRoot;
  }

  public static getInstance(): CommerceSdkApi {
    if (!CommerceSdkApi.instance) {
      CommerceSdkApi.instance = new CommerceSdkApi();
    }
    return CommerceSdkApi.instance;
  }

  public getProject(): Promise<ClientResponse> {
    return this.apiRoot.get().execute();
  }

  public createCustomer(): Promise<ClientResponse> {
    return this.apiRoot
      .customers()
      .post({
        body: {
          email: 'vK3Kb@example.com',
          password: '123456',
        },
      })
      .execute();
  }

  public loginUser(email: string, password: string): Promise<ClientResponse> {
    return this.apiRoot
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
  }

  public logout(): void {
    localStorage.removeItem('commercetools_token');
    this.withAnonymousSessionFlow();
  }

  public getMe(): Promise<ClientResponse> {
    return this.apiRoot.me().get().execute();
  }

  public withAnonymousSessionFlow(): CommerceSdkApi {
    this.apiRoot = createApiBuilderFromCtpClient(ApiClient().anonymousClient()).withProjectKey({
      projectKey: 'ecommerce-application-404team',
    });
    return this;
  }

  public withPasswordFlow(login: string, password: string): CommerceSdkApi {
    this.apiRoot = createApiBuilderFromCtpClient(
      ApiClient().clientWithPassword(login, password),
    ).withProjectKey({
      projectKey: 'ecommerce-application-404team',
    });
    return this;
  }

  public withAdminFlow(): CommerceSdkApi {
    this.apiRoot = createApiBuilderFromCtpClient(ApiClient().adminClient()).withProjectKey({
      projectKey: 'ecommerce-application-404team',
    });
    return this;
  }

  public withExistingToken(token: string): CommerceSdkApi {
    this.apiRoot = createApiBuilderFromCtpClient(
      ApiClient().getTokenCacheClient(token),
    ).withProjectKey({ projectKey: 'ecommerce-application-404team' });

    return this;
  }
}

export const SdkApi = (): CommerceSdkApi => CommerceSdkApi.getInstance();
