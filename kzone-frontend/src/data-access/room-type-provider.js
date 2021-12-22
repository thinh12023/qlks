import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  ROOM_TYPE_DELETE,
  ROOM_TYPE_CREATE,
  ROOM_TYPE_SEARCH,
  ROOM_TYPE_UPDATE,
  ROOM_TYPE_SEARCH_CLIENT,
} from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${ROOM_TYPE_SEARCH}`, {
            page: Math.max(0, (param?.page || 0)),
            size: 10,
            id: param?.id,
            name: param?.name,
          })
        )
        .then((s) => {
          if (s?.data?.code === 1 && s?.data?.data) {
            resolve(s?.data);
            console.log(s?.data);
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
        .post(`${ROOM_TYPE_CREATE}`, payload)
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
        .put(`${ROOM_TYPE_UPDATE}/${id}`, payload)
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
        .delete(`${ROOM_TYPE_DELETE}/${id}`)
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
  searchLoaiPhongsClient: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${ROOM_TYPE_SEARCH_CLIENT}`)
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
  searchLoaiPhongById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${ROOM_TYPE_SEARCH_CLIENT}/id=${id}`)
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
