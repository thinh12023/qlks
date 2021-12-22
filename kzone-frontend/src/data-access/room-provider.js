import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  ROOM_DELETE,
  ROOM_CREATE,
  ROOM_SEARCH,
  ROOM_UPDATE,
  ROOM_UPDATE_STATUS,
  ROOM_AVAILABLE_BY_DATE,
  ROOM_INUSE,
  ROOM_NOTREADY,
  ROOM_PREORDER,
  ROOM_READY,
} from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${ROOM_SEARCH}`, {
            page: param?.page || 0,
            size: param?.size,
            id: param?.id,
            status: param?.status,
            idRoomType: param?.idRoomType,
            idFloor: param?.idFloor,
            name: param?.name,
            active: param?.active,
            square: param?.square,
            image:param?.image,
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
  searchReady(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${ROOM_READY}`)
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
  searchNotReady(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${ROOM_NOTREADY}`)
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
  searchPreorder(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${ROOM_PREORDER}`)
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
  searchInUse(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${ROOM_INUSE}`)
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
        .post(`${ROOM_CREATE}`, payload)
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
        .put(`${ROOM_UPDATE}/${id}`, payload)
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
        .delete(`${ROOM_DELETE}/${id}`)
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
        .get(combineUrlParams(`${ROOM_SEARCH}`, { page: 1, size: 999, id, }))
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
  searchAvailableByDate: ({ checkinDate, checkoutDate }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${ROOM_AVAILABLE_BY_DATE}/${checkinDate}/${checkoutDate}`)
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
  updateStatus: (payload) => {
    const { status, id } = payload;
    return new Promise((resolve, reject) => {
      client
        .get(`${ROOM_UPDATE_STATUS}/${id}/${status}`)
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
