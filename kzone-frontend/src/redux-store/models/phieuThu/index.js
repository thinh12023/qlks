import { message } from "antd";
import receiptProvider from "data-access/receipt-provider";
export default {
  state: {
    dsPhieuThu: [],
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    clearOldData: (state) => {

    },
    onCreate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThu.updateData({
          isLoadingCreate: true,
        });
        receiptProvider
          .create(payload)
          .then((s) => {
            dispatch.phieuThu.updateData({
              isLoadingCreate: false,
            });
            dispatch.phieuThu.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.phieuThu.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThu.updateData({
          isLoadingCreate: true,
        });

        receiptProvider
          .update({ id, payload })
          .then((s) => {
            let dsPhieuThu = (state.phieuThu.dsPhieuThu || []).map((item) => {
              if (item.id != id) return item;
              s.data.index = item.index;
              return s.data;
            });

            dispatch.phieuThu.updateData({
              isLoadingCreate: false,
              dsPhieuThu,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.phieuThu.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThu.updateData({
          isLoading: true,
        });

        receiptProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.phieuThu.updateData({
              isLoading: false,
            });
            dispatch.phieuThu.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.phieuThu.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.phieuThu.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.phieuThu.onSearch({ page: 1, size, ...rest });
    },
    onSearch: ({ page = 1, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.phieuThu.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.phieuThu.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.phieuThu.updateData(newState);
        let size = payload.size || state.phieuThu.size || 10;
        receiptProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.phieuThu.updateData({
              dsPhieuThu: (s?.data?.contents || []).map((item, index) => {
                item.index = page * size + index + 1;
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
            dispatch.phieuThu.updateData({
              dsPhieuThu: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phieuThu.dataSearch || {}),
        ...payload,
      };
      dispatch.phieuThu.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.phieuThu.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.phieuThu.dataSort || {};
      dataSort.type = payload.type;

      dispatch.phieuThu.updateData({
        page: 1,
        dataSort,
      });
      dispatch.phieuThu.onSearch({
        page: 1,
        dataSort,
      });
    },
  }),
};
