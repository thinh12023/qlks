import { message } from "antd";
import roomProvider from "data-access/room-provider";
export default {
  state: {
    dsPhong: [],
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
        dispatch.phong.updateData({
          isLoadingCreate: true,
        });

        roomProvider
          .create({ ...payload })
          .then((s) => {
            dispatch.phong.updateData({
              isLoadingCreate: false,
            });
            dispatch.phong.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.phong.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phong.updateData({
          isLoadingCreate: true,
        });
        roomProvider
          .update({ id, payload })
          .then((s) => {
            dispatch.phong.onSearch({});
            dispatch.phong.updateData({
              isLoadingCreate: false,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.phong.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phong.updateData({
          isLoading: true,
        });

        roomProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.phong.updateData({
              isLoading: false,
            });
            dispatch.phong.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.phong.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.phong.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.phong.onSearch({ page: 1, size, ...rest });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.phong.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.phong.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.phong.updateData(newState);
        let size = payload.size || state.phong.size || 10;
        roomProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.phong.updateData({
              dsPhong: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.phong.updateData({
              dsPhong: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phong.dataSearch || {}),
        ...payload,
      };
      dispatch.phong.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.phong.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.phong.dataSort || {};
      dataSort.type = payload.type;

      dispatch.phong.updateData({
        page: 1,
        dataSort,
      });
      dispatch.phong.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    updateState: (payload, state) => {
      dispatch.phong.updateData({
        ...payload,
      })
    },
    onSearchPhongKhaDung: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phong.updateData({ isLoading: true });
        roomProvider
          .search(payload)
          .then(s => {
            let ds = s?.data?.contents || [];
            dispatch.phong.updateData({
              dsPhongKhaDung: ds,
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.phong.updateData({
              isLoading: false,
              dsPhongKhaDung: [],
            });
          });
      });
    },
    onSearchAvailableByDate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phong.updateData({ isLoading: true });
        roomProvider
          .searchAvailableByDate(payload)
          .then(s => {
            dispatch.phong.updateData({
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.phong.updateData({
              isLoading: false,
              dsPhong: [],
            });
          });
      })
    },
    onUpdateStatus: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phong.updateData({ isLoading: true });
        roomProvider
          .updateStatus(payload)
          .then(s => {
            dispatch.phong.updateData({
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.phong.updateData({
              isLoading: false,
            });
          });
      });
    },
  }),
};
