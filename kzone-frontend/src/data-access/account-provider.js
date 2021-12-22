import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  ACCOUNT_GET_ALL,
  ACCOUNT_SEARCH
} from "../client/api";

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${ACCOUNT_GET_ALL}`, {
            page: 1,
            size: 999,
          })
        )
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
  search: (param = {}) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${ACCOUNT_SEARCH}`, {
          page: 1,
          size: 999,
          ...param,
        }))
        .then(s => {
          if (s?.data?.code === 1 && s?.data?.data) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
};
