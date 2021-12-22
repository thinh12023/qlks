import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  SERVICE_TYPE_DELETE,
  SERVICE_TYPE_CREATE,
  SERVICE_TYPE_SEARCH,
  SERVICE_TYPE_UPDATE,
} from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${SERVICE_TYPE_SEARCH}`, {
            page: 1,
            size: 10,
            id: param?.id,
            status: param?.status,
            idRoomType: param?.idRoomType,
            idFloor: param?.idFloor,
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
        .post(`${SERVICE_TYPE_CREATE}`, payload)
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
        .put(`${SERVICE_TYPE_UPDATE}/${id}`, payload)
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
        .delete(`${SERVICE_TYPE_DELETE}/${id}`)
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
  //other
  searchById: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${SERVICE_TYPE_SEARCH}`, { page: 1, size: 999, id, }))
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
