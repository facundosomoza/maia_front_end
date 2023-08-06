const MODE = "dev"; //dev, prod

const config = {
  dev: {
    PORT: 8001,
    URL_BASE_BACKEND: "http://localhost:8001",
  },
  prod: {
    PORT: 443,
    URL_BASE_BACKEND: "https://maiatsadzeart.com:443",
  },
};

export const getConfig = () => {
  return config[MODE];
};
