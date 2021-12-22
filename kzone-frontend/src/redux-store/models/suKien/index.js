import { message } from "antd";
import eventsProvider from "data-access/events-provider";
export default {
  state: {
    dsSuKien: [],
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onCreate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.suKien.updateData({
          isLoadingCreate: true,
        });
        eventsProvider
          .create(payload)
          .then((s) => {
            dispatch.suKien.updateData({
              isLoadingCreate: false,
            });
            dispatch.suKien.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.suKien.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.suKien.updateData({
          isLoadingCreate: true,
        });
        eventsProvider
          .update({ id, payload })
          .then((s) => {
            dispatch.suKien.onSearch({});
            dispatch.suKien.updateData({
              isLoadingCreate: false,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.suKien.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.suKien.updateData({
          isLoading: true,
        });

        eventsProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.suKien.updateData({
              isLoading: false,
            });
            dispatch.suKien.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.suKien.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.suKien.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.suKien.onSearch({ page: 1, size, ...rest });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.suKien.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.suKien.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.suKien.updateData(newState);
        let size = payload.size || state.suKien.size || 10;
        eventsProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.suKien.updateData({
              dsSuKien: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.suKien.updateData({
              dsSuKien: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.suKien.dataSearch || {}),
        ...payload,
      };
      dispatch.suKien.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.suKien.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.suKien.dataSort || {};
      dataSort.type = payload.type;

      dispatch.suKien.updateData({
        page: 1,
        dataSort,
      });
      dispatch.suKien.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    updateState: (payload, state) => {
      dispatch.suKien.updateData({
        ...payload,
      })
    },
    onSearchPhongKhaDung: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.suKien.updateData({ isLoading: true });
        eventsProvider
          .search(payload)
          .then(s => {
            let ds = s?.data?.contents || [];
            dispatch.suKien.updateData({
              dsPhongKhaDung: ds,
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.suKien.updateData({
              isLoading: false,
              dsPhongKhaDung: [],
            });
          });
      });
    },
    onSearchAvailableByDate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.suKien.updateData({ isLoading: true });
        eventsProvider
          .searchAvailableByDate(payload)
          .then(s => {
            dispatch.suKien.updateData({
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.suKien.updateData({
              isLoading: false,
              dsSuKien: [],
            });
          });
      })
    },
    onSearchById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.suKien.updateData({ isLoading: true });
        eventsProvider
          .search({ id })
          .then(s => {

            dispatch.suKien.updateData({
              currentItem: s?.data?.contents[0],
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.suKien.updateData({
              isLoading: false,
            });
          });
      });
    },
    onSearchSuKienById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.suKien.updateData({ isLoading: true });
        eventsProvider
          .search({ id })
          .then(s => {
            dispatch.suKien.updateData({
              suKienHienTai: s?.data?.contents[0],
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.suKien.updateData({
              isLoading: false,
            });
          });
      });
    },
    onSearchRandom: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tinNoiBo.updateData({ isLoading: true });
        eventsProvider 
          .searchRandom({ id })
          .then(s => {
            dispatch.tinNoiBo.updateData({
              suKienRandom: s?.data?.contents[0],
              suKienRandom1: s?.data?.contents[1],
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.tinNoiBo.updateData({
              isLoading: false,
            });
          });
      });
    },
  }),
};
