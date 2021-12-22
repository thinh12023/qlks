import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  RECEIPT_CREATE,
  RECEIPT_SEARCH,
} from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${RECEIPT_SEARCH}`, {
            page: param?.page,
            size: param?.size,
            id: param?.id,
            code: param?.code,
            status: param?.status,
            name: param?.name,
            phone: param?.phone,
            identifyNumber: param?.identifyNumber,
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
  create({ ...payload }) {
    return new Promise((resolve, reject) => {
      client
        .post(`${RECEIPT_CREATE}`, payload)
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
  searchById: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${RECEIPT_SEARCH}`, { page: 1, size: 999, id, }))
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
