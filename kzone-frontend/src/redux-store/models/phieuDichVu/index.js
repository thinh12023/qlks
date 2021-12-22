import { message } from "antd";
import serviceBillProvider from "data-access/service-bill-provider";
export default {
  state: {
    dsPhieuDichVu: [],
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    clearOldData: (state) => {
      dispatch.phieuDichVu.updateData({

      })
    },
    onCreate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuDichVu.updateData({
          isLoadingCreate: true,
        });
        serviceBillProvider
          .create(payload)
          .then((s) => {
            dispatch.phieuDichVu.updateData({
              isLoadingCreate: false,
            });
            dispatch.phieuDichVu.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.phieuDichVu.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuDichVu.updateData({
          isLoadingCreate: true,
        });

        serviceBillProvider
          .update({ id, payload })
          .then((s) => {
            let dsPhieuDichVu = (state.phieuDichVu.dsPhieuDichVu || []).map((item) => {
              if (item.id != id) return item;
              s.data.index = item.index;
              return s.data;
            });

            dispatch.phieuDichVu.updateData({
              isLoadingCreate: false,
              dsPhieuDichVu,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.phieuDichVu.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuDichVu.updateData({
          isLoading: true,
        });

        serviceBillProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.phieuDichVu.updateData({
              isLoading: false,
            });
            dispatch.phieuDichVu.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.phieuDichVu.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.phieuDichVu.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.phieuDichVu.onSearch({ page: 1, size, ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.phieuDichVu.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.phieuDichVu.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.phieuDichVu.updateData(newState);
        let size = payload.size || state.phieuDichVu.size || 10;
        serviceBillProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.phieuDichVu.updateData({
              dsPhieuDichVu: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.phieuDichVu.updateData({
              dsPhieuDichVu: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phieuDichVu.dataSearch || {}),
        ...payload,
      };
      dispatch.phieuDichVu.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.phieuDichVu.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.phieuDichVu.dataSort || {};
      dataSort.type = payload.type;

      dispatch.phieuDichVu.updateData({
        page: 1,
        dataSort,
      });
      dispatch.phieuDichVu.onSearch({
        page: 1,
        dataSort,
      });
    },
  })
}