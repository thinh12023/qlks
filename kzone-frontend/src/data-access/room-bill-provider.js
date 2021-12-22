import { combineUrlParams } from "utils";
import { client } from "client/request";
import {
  ROOM_BILL_DELETE,
  ROOM_BILL_CREATE,
  ROOM_BILL_SEARCH,
  ROOM_BILL_UPDATE,
  ROOM_BILL_CONFIRM_CHECKOUT,
  ROOM_BILL_SEARCH_BY_ROOM_AND_BOOKING,
} from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${ROOM_BILL_SEARCH}`, {
            page: param?.page,
            size: param?.size,
            id: param?.id,
            code: param?.code,
            status: param?.status,
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
        .post(`${ROOM_BILL_CREATE}`, payload)
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
        .put(`${ROOM_BILL_UPDATE}/${id}`, payload)
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
        .delete(`${ROOM_BILL_DELETE}/${id}`)
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
        .get(combineUrlParams(`${ROOM_BILL_SEARCH}`, { page: 1, size: 999, id, }))
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
  searchRoomBillByRoomAndBooking: (payload) => {
    return new Promise((resolve, reject) => {
      const { idRoom, idBooking } = payload;
      client
        .get(`${ROOM_BILL_SEARCH_BY_ROOM_AND_BOOKING}/${idRoom}/${idBooking}`)
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
  confirmCheckout: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${ROOM_BILL_CONFIRM_CHECKOUT}`, payload)
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
