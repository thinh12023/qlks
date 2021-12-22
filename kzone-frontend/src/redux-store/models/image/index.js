import cacheUtils from "utils/cache-utils";
import { message } from "antd";
import imageProvider from "data-access/image-provider";
export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({

    onImageUpload: (file, state) => {
      dispatch.image.updateData({ isImageUpload: true })
      return new Promise((resolve, reject) => {
        imageProvider
          .uploadImage({ file })
          .then((s) => {
            dispatch.image.updateData({ isImageUpload: false })
            resolve(s?.data?.filename);
          })
          .catch((e) => {
            dispatch.image.updateData({ isImageUpload: false })
            reject(e);
          });
      });
    },

    onDelete: ({ id }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.image.updateData({
          isLoading: true,
        });

        imageProvider
          .delete({ id })
          .then((s) => {
            dispatch.image.updateData({
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch((e) => {
            dispatch.image.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
  }),
};
