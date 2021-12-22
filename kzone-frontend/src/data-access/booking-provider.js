import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  ROOM_DELETE,
  BOOKING_CREATE,
  BOOKING_SEARCH,
  BOOKING_SEARCH_LATEST,
  BOOKING_UPDATE,
  BOOKING_GET_CODE_BOOK,
  BOOKING_GUEST_CHECKIN,
  BOOKING_GUEST_CHECKOUT,
  BOOKING_GUEST_BOOK_ROOM,
} from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${BOOKING_SEARCH}`, {
            page: param?.page,
            size: param?.size,
            id: param?.id,
            code: param?.code,
            status: param?.status,
            name: param?.name,
            phone: param?.phone,
            identifyNumber: param?.identifyNumber,
            isConfirm: param?.isConfirm,
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
        .post(`${BOOKING_CREATE}`, payload)
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
        .put(`${BOOKING_UPDATE}/${id}`, payload)
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
  searchById: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${BOOKING_SEARCH}`, { page: 1, size: 999, id, }))
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
  searchLatest: ({ idRoom, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${BOOKING_SEARCH_LATEST}/${idRoom}`)
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
  getCodeBook: ({ }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${BOOKING_GET_CODE_BOOK}`)
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
  guestCheckin: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${BOOKING_GUEST_CHECKIN}`, payload)
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
  guestCheckout: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${BOOKING_GUEST_CHECKOUT}`, payload)
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
  guestBookRoom: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${BOOKING_GUEST_BOOK_ROOM}`, payload)
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
