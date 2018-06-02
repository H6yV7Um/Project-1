import configLocal from 'config/local';

let server = null;
if (process.env.NODE_ENV !== 'development') {
  server = 'https://api.hox.com'
} else {
  server = configLocal.SERVER;
}

export const SERVER = server;
