import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  NEWS_CREATE,
  NEWS_DELETE,
  NEWS_SEARCH,
  NEWS_UPDATE,
  NEWS_HOT,
  NEWS_CHANGEHOT,
  NEWS_SEARCHRANDOM,
} from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${NEWS_SEARCH}`, {
            page: param?.page,
            size: param?.size,
            id: param?.id,
            title: param?.title,
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
  searchRandom(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${NEWS_SEARCHRANDOM}`, {
            page: param?.page,
            size: param?.size,
            id: param?.id,
            title: param?.title,
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
  create(payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${NEWS_CREATE}`, payload)
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
        .put(`${NEWS_UPDATE}/${id}`, payload)
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
        .delete(`${NEWS_DELETE}/${id}`)
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
  changeHotNews({ id, payload }) {
    return new Promise((resolve, reject) => {
      client
        .put(`${NEWS_CHANGEHOT}/${id}`, payload)
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
  searchHotNews: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${NEWS_HOT}`)
        .then((s) => {
          if (s?.data?.code === 1 && s?.data?.data) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
};
