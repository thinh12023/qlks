import { combineUrlParams } from "utils";
import { client } from "client/request";
import { EMPLOYEE_SEARCH, EMPLOYEE_CREATE } from "../client/api";

export default {
  search(param = {}) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${EMPLOYEE_SEARCH}`, {
            page: param?.page,
            size: param?.size,
            id: param?.id,
            name: param?.name,
            email: param?.email,
            phone: param?.phone,
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
        .post(`${EMPLOYEE_CREATE}`, payload)
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
  // update({ id, ...payload }) {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .put(`${USER_UPDATE}/${id}`, payload)
  //       .then((s) => {
  //         if (s?.data?.code === 1 && s?.data?.data) {
  //           resolve(s?.data);
  //         } else reject(s?.data);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },
  // updatePassword({ id, payload }) {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .put(`${USER_UPDATE_PASSWORD}/${id}`, { ...payload })
  //       .then((s) => {
  //         if (s?.data?.code === 1) {
  //           resolve(s?.data);
  //         } else reject(s?.data);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },
  // delete({ id, ...payload }) {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .delete(`${USER_DELETE}/${id}`)
  //       .then((s) => {
  //         if (s?.data?.code === 1 && s?.data?.data) {
  //           resolve(s?.data);
  //         } else reject(s?.data);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },
};
