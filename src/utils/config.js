const MODE = "prod"; //dev, prod

const config = {
  dev: {
    PORT: 8001,
    URL_BASE_BACKEND: "http://localhost:8001",
    URL_BASE_FRONTEND: "http://localhost:3000",
  },
  prod: {
    PORT: 443,
    URL_BASE_BACKEND: "https://maiatsintsadzeart.com:443",
    URL_BASE_FRONTEND: "https://maiatsintsadzeart.com",
  },
};

export const getConfig = () => {
  return config[MODE];
};
