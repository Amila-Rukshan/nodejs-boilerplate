const devConfig = {
    MONGO_URL: 'mongodb://localhost/make-a-nodejs-api-dev'
};

const testConfig = {
    MONGO_URL: 'mongodb://localhost/make-a-nodejs-api-test'
};

const prodConfig = {
    MONGO_URL: 'mongodb://localhost/make-a-nodejs-api-prod'
};

const defaultConfig = {
  PORT: process.env.PORT || 3007,
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    case "test":
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
