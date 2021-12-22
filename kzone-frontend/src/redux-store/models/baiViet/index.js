import { message } from "antd";
import newsProvider from "data-access/news-provider";
export default {
  state: {
    dsBaiViet: [],
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
        dispatch.baiViet.updateData({
          isLoadingCreate: true,
        });
        newsProvider
          .create(payload)
          .then((s) => {
            dispatch.baiViet.updateData({
              isLoadingCreate: false,
            });
            dispatch.baiViet.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.baiViet.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({
          isLoadingCreate: true,
        });
        newsProvider
          .update({ id, payload })
          .then((s) => {
            dispatch.baiViet.onSearch({});
            dispatch.baiViet.updateData({
              isLoadingCreate: false,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.baiViet.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onChangeHotNews: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({
          isLoadingCreate: true,
        });
        newsProvider
          .changeHotNews({ id, payload })
          .then((s) => {
            dispatch.baiViet.onSearch({});
            dispatch.baiViet.updateData({
              isLoadingCreate: false,
            });
            message.success("Chỉnh sửa hot news thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.baiViet.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({
          isLoading: true,
        });

        newsProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.baiViet.updateData({
              isLoading: false,
            });
            dispatch.baiViet.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.baiViet.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.baiViet.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.baiViet.onSearch({ page: 1, size, ...rest });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.baiViet.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.baiViet.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.baiViet.updateData(newState);
        let size = payload.size || state.baiViet.size || 10;
        newsProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.baiViet.updateData({
              dsBaiViet: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.baiViet.updateData({
              dsBaiViet: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.baiViet.dataSearch || {}),
        ...payload,
      };
      dispatch.baiViet.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.baiViet.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.baiViet.dataSort || {};
      dataSort.type = payload.type;

      dispatch.baiViet.updateData({
        page: 1,
        dataSort,
      });
      dispatch.baiViet.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    updateState: (payload, state) => {
      dispatch.baiViet.updateData({
        ...payload,
      })
    },
    onSearchPhongKhaDung: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({ isLoading: true });
        newsProvider
          .search(payload)
          .then(s => {
            let ds = s?.data?.contents || [];
            dispatch.baiViet.updateData({
              dsPhongKhaDung: ds,
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.baiViet.updateData({
              isLoading: false,
              dsPhongKhaDung: [],
            });
          });
      });
    },
    onSearchAvailableByDate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({ isLoading: true });
        newsProvider
          .searchAvailableByDate(payload)
          .then(s => {
            dispatch.baiViet.updateData({
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.baiViet.updateData({
              isLoading: false,
              dsBaiViet: [],
            });
          });
      })
    },
    onSearchById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({ isLoading: true });
        newsProvider
          .search({ id })
          .then(s => {
            dispatch.baiViet.updateData({
              currentItem: s?.data?.contents[0],
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.baiViet.updateData({
              isLoading: false,
            });
          });
      });
    },
    onSearchBaiVietById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({ isLoading: true });
        newsProvider
          .search({ id })
          .then(s => {
            dispatch.baiViet.updateData({
              baiVietHienTai: s?.data?.contents[0],
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.baiViet.updateData({
              isLoading: false,
            });
          });
      });
    },
    onSearchRandom: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({ isLoading: true });
        newsProvider 
          .searchRandom({ id })
          .then(s => {
            dispatch.baiViet.updateData({
              baiVietRandom: s?.data?.contents[0],
              baiVietRandom1: s?.data?.contents[1],
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch(e => {
            reject(e);
            dispatch.baiViet.updateData({
              isLoading: false,
            });
          });
      });
    },
    onSearchHotNews: (state) => {
      return new Promise((resolve, reject) => {
        dispatch.baiViet.updateData({ dsTinNong: [] });
        newsProvider
          .searchHotNews()
          .then((s) => {
            const { data, code } = s;
            if (code == 1 && data) {
              dispatch.baiViet.updateData({ dsTinNong: data });
              resolve(data);
            }
            reject(s);
          })
          .catch((e) => {
            dispatch.baiViet.updateData({ dsTinNong: [] });
            reject(e);
          });
      })
    }
  }),
};
