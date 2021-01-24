const devConfig = {
    MONGO_URL: 'mongodb://localhost/make-a-nodejs-api-dev',
    JWT_SECRET: 'thisisasecret',
    FACEBOOK_APP_ID: "968881793611886",
    FACEBOOK_APP_SECRET: "00d559b78b9794b1d5753ec7b877de7e"
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
