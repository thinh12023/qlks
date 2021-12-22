import { message } from "antd";
import setupProvider from "data-access/setup-provider";

export default {
  state: {
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onBuild: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.setup.updateData({ isLoading: true });
        setupProvider
          .build(payload)
          .then(s => {
            dispatch.setup.updateData({ isLoading: false });
            //TODO: call search room
            resolve(s);
          })
          .catch(e => {
            console.log(e);
            dispatch.setup.updateData({ isLoading: false });
            reject(e);
          });
      });
    },
  }),
};
