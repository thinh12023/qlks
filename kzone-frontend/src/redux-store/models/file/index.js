import fileProvider from "data-access/file-provider";
export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onFileUpload: (file, state) => {
      dispatch.file.updateData({ isLoading: true, });
      return new Promise((resolve, reject) => {
        fileProvider
          .uploadFile({ file })
          .then(s => {
            dispatch.file.updateData({ isLoading: false });
            resolve(s);
          })
          .catch((e) => {
            dispatch.file.updateData({ isLoading: false });
            reject(e);
          });
      });
    },

    onDownload: ({ filename, ...payload }, state) => {
      dispatch.file.updateData({ isLoading: true, });
      return new Promise((resolve, reject) => {
        fileProvider
          .downloadFile({ filename, ...payload })
          .then(data => {
            dispatch.file.updateData({ isLoading: false });
            if (data) resolve(data);
            else reject();
          })
          .catch((e) => {
            dispatch.file.updateData({ isLoading: false });
            reject(e);
          });
      });
    },
  }),
};
