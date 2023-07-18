const MODE = "prod"; //dev, prod

const config = {
  dev: {
    PORT: 8001,
    URL_BASE_BACKEND: "http://localhost:8001",
  },
  prod: {
    PORT: 8001,
    URL_BASE_BACKEND: "http://maiatsadzeart.com:8001",
  },
};

export const getConfig = () => {
  return config[MODE];
};
