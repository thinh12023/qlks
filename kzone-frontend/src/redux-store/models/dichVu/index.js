import { message } from "antd";
import serviceProvider from "data-access/service-provider";
export default {
  state: {
    dsDichVu: [],
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
        dispatch.dichVu.updateData({
          isLoadingCreate: true,
        });

        serviceProvider
          .create({ ...payload })
          .then((s) => {
            dispatch.dichVu.updateData({
              isLoadingCreate: false,
            });
            dispatch.dichVu.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.dichVu.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.dichVu.updateData({
          isLoadingCreate: true,
        });

        serviceProvider
          .update({ id, payload })
          .then((s) => {
            let dsDichVu = (state.dichVu.dsDichVu || []).map((item) => {
              if (item.id != id) return item;
              s.data.index = item.index;
              return s.data;
            });

            dispatch.dichVu.updateData({
              isLoadingCreate: false,
              dsDichVu,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.dichVu.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.dichVu.updateData({
          isLoading: true,
        });

        serviceProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.dichVu.updateData({
              isLoading: false,
            });
            dispatch.dichVu.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.dichVu.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.dichVu.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.dichVu.onSearch({ page: 1, size, ...rest });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.dichVu.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.dichVu.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.dichVu.updateData(newState);
        let size = payload.size || state.dichVu.size || 10;
        serviceProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.dichVu.updateData({
              dsDichVu: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.dichVu.updateData({
              dsDichVu: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dichVu.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVu.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.dichVu.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.dichVu.dataSort || {};
      dataSort.type = payload.type;

      dispatch.dichVu.updateData({
        page: 1,
        dataSort,
      });
      dispatch.dichVu.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    updateState: (payload, state) => {
      dispatch.dichVu.updateData({
        ...payload,
      })
    },
  }),
};
