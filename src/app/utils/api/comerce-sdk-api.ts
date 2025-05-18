import {
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
  type Customer,
} from '@commercetools/platform-sdk';
import { type ClientResponse } from '@commercetools/ts-client';
import { CustomerBuilder } from './bean/customer-builder';
import { ApiClient } from './build-client';
import { clearTokens, UserCache } from './token-cache';

class CommerceSdkApi {
  private static instance: CommerceSdkApi;
  private apiRoot: ByProjectKeyRequestBuilder;

  private readonly projectKeyObject = {
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  };

  constructor() {
    this.apiRoot = this.withAnonymousSessionFlow().apiRoot;
  }

  public static getInstance(): CommerceSdkApi {
    if (!CommerceSdkApi.instance) {
      CommerceSdkApi.instance = new CommerceSdkApi();
      CommerceSdkApi.instance.initializeSession();
    }
    return CommerceSdkApi.instance;
  }

  public getProject(): Promise<ClientResponse> {
    return this.apiRoot.get().execute();
  }

  public createCustomer(customer: Customer = CustomerBuilder().build()): Promise<ClientResponse> {
    return this.apiRoot
      .customers()
      .post({
        body: {
          email: customer.email,
          password: customer.password,
          firstName: customer.firstName,
          lastName: customer.lastName,
          dateOfBirth: customer.dateOfBirth,
        },
      })
      .execute();
  }

  public async loginUser(email: string, password: string): Promise<ClientResponse> {
    return this.apiRoot
      .login()
      .post({
        body: { email, password },
      })
      .execute();
  }

  public logoutUser(): void {
    clearTokens();
    UserCache.clearUser();
    this.withAnonymousSessionFlow();
  }

  public getMe(): Promise<ClientResponse> {
    return this.apiRoot.me().get().execute();
  }

  public withAnonymousSessionFlow(): CommerceSdkApi {
    this.apiRoot = createApiBuilderFromCtpClient(ApiClient().anonymousClient()).withProjectKey(
      this.projectKeyObject,
    );
    return this;
  }

  public withPasswordFlow(login: string, password: string): CommerceSdkApi {
    this.apiRoot = createApiBuilderFromCtpClient(
      ApiClient().clientWithPassword(login, password),
    ).withProjectKey(this.projectKeyObject);
    return this;
  }

  public withExistingToken(): CommerceSdkApi {
    const token = ApiClient().getTokenCache().get().token;
    this.apiRoot = createApiBuilderFromCtpClient(
      ApiClient().getTokenCacheClient(token),
    ).withProjectKey(this.projectKeyObject);

    return this;
  }

  public isLoggedIn(): boolean {
    const token = ApiClient().getTokenCache().get();
    const now = Math.floor(Date.now() / 1000);
    const user = UserCache.get();

    return token && token.expirationTime > now && user !== undefined;
  }

  private initializeSession(): void {
    if (this.isLoggedIn()) {
      this.withExistingToken();
    } else {
      this.logoutUser();
    }
  }
}

export const SdkApi = (): CommerceSdkApi => CommerceSdkApi.getInstance();
