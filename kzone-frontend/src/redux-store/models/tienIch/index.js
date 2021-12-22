import { message } from "antd";
import utilityProvider from "data-access/utility-provider";
export default {
  state: {
    dsTienIch: [],
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onCreate: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tienIch.updateData({
          isLoadingCreate: true,
        });

        utilityProvider
          .create({ ...payload })
          .then((s) => {
            dispatch.tienIch.updateData({
              isLoadingCreate: false,
            });
            dispatch.tienIch.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.tienIch.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tienIch.updateData({
          isLoadingCreate: true,
        });
        utilityProvider
          .update({ id, payload })
          .then((s) => {
            dispatch.tienIch.onSearch({});
            dispatch.tienIch.updateData({
              isLoadingCreate: false,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.tienIch.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    // onDelete: ({ id, ...payload }, state) => {
    //   return new Promise((resolve, reject) => {
    //     dispatch.tienIch.updateData({
    //       isLoading: true,
    //     });

    //     utilityProvider
    //       .delete({ id, ...payload })
    //       .then((s) => {
    //         dispatch.tienIch.updateData({
    //           isLoading: false,
    //         });
    //         dispatch.tienIch.onSearch({});
    //         message.success("Xoá phòng thành công");
    //         resolve(s?.data);
    //       })
    //       .catch((e) => {
    //         message.error(e?.message || "Xoá phòng không thành công");
    //         dispatch.tienIch.updateData({
    //           isLoading: false,
    //         });
    //         reject(e);
    //       });
    //   });
    // },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.tienIch.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.tienIch.onSearch({ page: 1, size, ...rest });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.tienIch.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.tienIch.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.tienIch.updateData(newState);
        let size = payload.size || state.tienIch.size || 10;
        utilityProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.tienIch.updateData({
              dsTienIch: (s?.data?.contents || []).map((item, index) => {
                item.index = (Math.max(0, page - 1)) * size + index + 1;
                item.createdAt = undefined;
                item.updatedAt = undefined;
                return item;
              }),
              isLoading: false,
              total: s?.data?.totalElement || 0,
              page,
              size,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.tienIch.updateData({
              dsTienIch: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.tienIch.dataSearch || {}),
        ...payload,
      };
      dispatch.tienIch.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.tienIch.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.tienIch.dataSort || {};
      dataSort.type = payload.type;

      dispatch.tienIch.updateData({
        page: 1,
        dataSort,
      });
      dispatch.tienIch.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    updateState: (payload, state) => {
      dispatch.tienIch.updateData({
        ...payload,
      })
    },
  }),
};
