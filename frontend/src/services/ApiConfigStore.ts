// our own mini redux store for storing api configs :))

import { ConfigurationParameters, Configuration } from './api';

import { config } from '@Config';

class ApiConfigStoreClass {
  private configParams: ConfigurationParameters = {
    // TODO: load this from a config instead
    basePath: config.apiURL,
  };

  private config: Configuration = new Configuration(this.configParams);

  private getTokenFunc: () => Promise<string>;

  constructor(getTokenFunc: () => Promise<string>) {
    this.getTokenFunc = getTokenFunc;
  }

  async getApiConfig(): Promise<Configuration> {
    const newToken = await this.getTokenFunc();
    if (newToken === this.configParams.accessToken) {
      return Promise.resolve(this.config);
    }

    this.configParams.accessToken = newToken;
    this.config = new Configuration(this.configParams);

    return Promise.resolve(this.config);
  }

  setGetTokenFunc(getTokenFunc: () => Promise<string>) {
    this.getTokenFunc = getTokenFunc;
  }
}

export const emptyGetTokenFunc: () => Promise<string> = () => {
  return Promise.resolve('');
};

// default to empty token
const ApiConfigStore = new ApiConfigStoreClass(emptyGetTokenFunc);
export default ApiConfigStore;
