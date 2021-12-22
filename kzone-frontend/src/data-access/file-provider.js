// import constants from "resources/strings";
// import clientUtils from "utils/client-utils";
import { combineUrlParams } from "utils";
import { client } from "client/request";
import { FILE_UPLOAD, FILE_DOWNLOAD } from "../client/api";

export default {
  upload(image, item) {
    // let url = "";
    // if (item === "employee") {
    //   url += constants.api.dmNhanvien + "/anh-dai-dien";
    // }
    // if (item === "news") {
    //   url += constants.api.adTinTuc + "/anh";
    // }
    // return new Promise((resolve, reject) => {
    //   clientUtils
    //     .uploadImage(url, image)
    //     .then((s) => {
    //       resolve(s);
    //     })
    //     .catch((e) => {
    //       reject(e);
    //     });
    // });
  },
  uploadFile(file, item) {
    // let url = "";
    // if (item === "employee") {
    //   url += constants.api.dmNhanvien + "/cv";
    // }
    // if (item === "contract") {
    //   url += constants.api.nvHopDongLaoDong + "/hop-dong";
    // }
    // return new Promise((resolve, reject) => {
    //   clientUtils
    //     .uploadImage(url, file)
    //     .then((s) => {
    //       resolve(s);
    //     })
    //     .catch((e) => {
    //       reject(e);
    //     });
    // });
  },

  uploadFile: ({ file, ...payload }) => {
    return new Promise(async (resolve, reject) => {
      const dataForm = new FormData();
      dataForm.append("file", file);

      for (const name in file) {
        dataForm.append(name, file[name]);
      }
      const auth = await JSON.parse(localStorage.getItem("auth"));
      client
        .post(`${FILE_UPLOAD}`, dataForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `${auth?.tokenType} ${auth?.accessToken}`,
          },
        })
        .then((s) => {
          if (s?.data?.code === 0 && s?.data != "") {
            resolve(s?.data?.data);
          } else {
            reject(s?.data?.data);
          }
        })
        .catch((e) => {
          reject(e?.data?.data);
        });
    });
  },

  downloadFile: ({ ...payload }) => {
    return new Promise(async (resolve, reject) => {
      client
        .get(combineUrlParams(`${FILE_DOWNLOAD}`, { file: `${payload.filename}` }), {
          responseType: "arraybuffer"
        })
        .then((s) => {
          if (s?.status == 200) {
            resolve(s?.data);
          }
          else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e?.data);
        });
    });
  }
};
