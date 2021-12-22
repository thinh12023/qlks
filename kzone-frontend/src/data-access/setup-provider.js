import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  SETUP_INFO,
} from "client/api";

export default {
  build: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${SETUP_INFO}`, payload)
        .then((s) => {
          if (s?.data?.code === 1 && s?.data?.data) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
