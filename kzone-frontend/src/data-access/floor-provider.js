import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  FLOOR_CREATE,
  FLOOR_DELETE,
  FLOOR_SEARCH,
  FLOOR_UPDATE,
} from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${FLOOR_SEARCH}`, {
            page: Math.max(0, param?.page - 1),
            size: param?.size,
            id: param?.id,
            name: param?.name,
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
        .post(`${FLOOR_CREATE}`, payload)
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
  update({ id, payload }) {
    return new Promise((resolve, reject) => {
      client
        .put(`${FLOOR_UPDATE}/${id}`, payload)
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
  delete({ id, ...payload }) {
    return new Promise((resolve, reject) => {
      client
        .delete(`${FLOOR_DELETE}/${id}`)
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
