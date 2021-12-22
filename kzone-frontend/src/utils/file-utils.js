import { client } from "client/request";
// import FileDownload from "js-file-download";

export default {
  getFromUrl: ({ url = "" }) => {
    return new Promise((resolve, reject) => {
      client
        .get(url, {
          responseType: "arraybuffer",
        })
        .then((s) => {
          // FileDownload(s?.data, (url.split("/").pop() || "report.xlsx"));
          // resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
