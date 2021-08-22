import axios from 'axios';
import { message } from 'antd';

type url = string
type config = any

const warning = (msg:string) => {
  message.warning(msg);
};

const GET = (url:url, config:config) => {
  const params = config.params || {};
  const timeout = config.timeout || 1000;
  return new Promise((res, rej) => {
    axios
      .get(url, {
        params,
        timeout,
      })
      .then((response) => {
        const datatotal = response.data;
        const { code, data, msg } = datatotal;
        if (code === 0) {
          res(data);
        }else {
          rej(msg);
          warning(msg);
        }
      })
      .catch((err) => {
        const str = err.toString();
        warning(str);
        rej(str);
      });
  });
};

export const POST = (url:url, config:config) => {
  const data = config.data || {};
  const timeout = config.timeout || 60000;
  return new Promise((res, rej) => {
    axios
      .post(url, data, {
        timeout,
      })
      .then((response) => {
        const datatotal = response.data;
        const { code, data, msg } = datatotal;
        if (code === 0) {
          res(data);
        }else {
          rej(msg);
          warning(msg);
        }
      })
      .catch((err) => {
        const str = err.toString();
        warning(str);
        rej(str);
      });
  });
};

const request = {
  GET: function (url:url, config:config) {
    return GET(url, config);
  },
  POST: function (url:url, config:config) {
    return POST(url, config);
  },
};

export default request;
