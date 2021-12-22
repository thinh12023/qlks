import { message } from "antd";
import innerProvider from "data-access/inner-provider";
export default {
  state: {
    dsTinNoiBo: [],
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
        dispatch.tinNoiBo.updateData({
          isLoadingCreate: true,
        });
        innerProvider 
          .create(payload)
          .then((s) => {
            dispatch.tinNoiBo.updateData({
              isLoadingCreate: false,
            });
            dispatch.tinNoiBo.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.tinNoiBo.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tinNoiBo.updateData({
          isLoadingCreate: true,
        });
        innerProvider 
          .update({ id, payload })
          .then((s) => {
            dispatch.tinNoiBo.onSearch({});
            dispatch.tinNoiBo.updateData({
              isLoadingCreate: false,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.tinNoiBo.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tinNoiBo.updateData({
          isLoading: true,
        });

        innerProvider 
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.tinNoiBo.updateData({
              isLoading: false,
            });
            dispatch.tinNoiBo.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.tinNoiBo.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.tinNoiBo.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.tinNoiBo.onSearch({ page: 1, size, ...rest });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.tinNoiBo.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.tinNoiBo.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.tinNoiBo.updateData(newState);
        let size = payload.size || state.tinNoiBo.size || 10;
        innerProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.tinNoiBo.updateData({
              dsTinNoiBo: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.tinNoiBo.updateData({
              dsTinNoiBo: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.tinNoiBo.dataSearch || {}),
        ...payload,
      };
      dispatch.tinNoiBo.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.tinNoiBo.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.tinNoiBo.dataSort || {};
      dataSort.type = payload.type;

      dispatch.tinNoiBo.updateData({
        page: 1,
        dataSort,
      });
      dispatch.tinNoiBo.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    updateState: (payload, state) => {
      dispatch.tinNoiBo.updateData({
        ...payload,
      })
    },
    onSearchPhongKhaDung: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tinNoiBo.updateData({ isLoading: true });
        innerProvider 
          .search(payload)
          .then(s => {
            let ds = s?.data?.contents || [];
            dispatch.tinNoiBo.updateData({
              dsPhongKhaDung: ds,
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.tinNoiBo.updateData({
              isLoading: false,
              dsPhongKhaDung: [],
            });
          });
      });
    },
    onSearchAvailableByDate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tinNoiBo.updateData({ isLoading: true });
        innerProvider 
          .searchAvailableByDate(payload)
          .then(s => {
            dispatch.tinNoiBo.updateData({
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.tinNoiBo.updateData({
              isLoading: false,
              dsTinNoiBo: [],
            });
          });
      })
    },
    onSearchById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tinNoiBo.updateData({ isLoading: true });
        innerProvider 
          .search({ id })
          .then(s => {
            dispatch.tinNoiBo.updateData({
              currentItem: s?.data?.contents[0],
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
    onSearchTinNoiBoById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tinNoiBo.updateData({ isLoading: true });
        innerProvider 
          .search({ id })
          .then(s => {
            dispatch.tinNoiBo.updateData({
              tinNoiBoHienTai: s?.data?.contents[0],
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
    onSearchRandom: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tinNoiBo.updateData({ isLoading: true });
        innerProvider 
          .searchRandom({ id })
          .then(s => {
            dispatch.tinNoiBo.updateData({
              tinNoiBoRandom: s?.data?.contents[0],
              tinNoiBoRandom1: s?.data?.contents[1],
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
