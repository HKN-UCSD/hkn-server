// our own mini redux store for storing api configs :))

import { ConfigurationParameters, Configuration } from './api';

class ApiConfigStoreClass {
  private configParams: ConfigurationParameters = {
    // TODO: load this from a config instead
    basePath:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://dev-api.hknucsd.com',
  };

  private config: Configuration = new Configuration(this.configParams);

  getApiConfig(): Configuration {
    return this.config;
  }

  // this is gonna be called on login
  setToken(token: string) {
    this.configParams.accessToken = token;
    this.config = new Configuration(this.configParams);
  }
}

const ApiConfigStore = new ApiConfigStoreClass();
export default ApiConfigStore;
