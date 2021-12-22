import { message } from "antd";
import serviceTypeProvider from "data-access/service-type-provider";
export default {
  state: {
    dsLoaiDichVu: [],
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
        dispatch.loaiDichVu.updateData({
          isLoadingCreate: true,
        });

        serviceTypeProvider
          .create(payload)
          .then((s) => {
            dispatch.loaiDichVu.updateData({
              isLoadingCreate: false,
            });
            dispatch.loaiDichVu.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.loaiDichVu.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.loaiDichVu.updateData({
          isLoadingCreate: true,
        });

        serviceTypeProvider
          .update({ id, payload })
          .then((s) => {
            let dsLoaiDichVu = (state.loaiDichVu.dsLoaiDichVu || []).map((item) => {
              if (item.id != id) return item;
              s.data.index = item.index;
              return s.data;
            });

            dispatch.loaiDichVu.updateData({
              isLoadingCreate: false,
              dsLoaiDichVu,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.loaiDichVu.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.loaiDichVu.updateData({
          isLoading: true,
        });

        serviceTypeProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.loaiDichVu.updateData({
              isLoading: false,
            });
            dispatch.loaiDichVu.onSearch({});
            dispatch.dichVu.onSearch({});
            message.success("Xoá thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá không thành công");
            dispatch.loaiDichVu.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.loaiDichVu.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.loaiDichVu.onSearch({ page: 1, size, ...rest });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.loaiDichVu.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.loaiDichVu.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.loaiDichVu.updateData(newState);
        let size = payload.size || state.loaiDichVu.size || 10;
        serviceTypeProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.loaiDichVu.updateData({
              dsLoaiDichVu: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.loaiDichVu.updateData({
              dsLoaiDichVu: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.loaiDichVu.dataSearch || {}),
        ...payload,
      };
      dispatch.loaiDichVu.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.loaiDichVu.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.loaiDichVu.dataSort || {};
      dataSort.type = payload.type;

      dispatch.loaiDichVu.updateData({
        page: 1,
        dataSort,
      });
      dispatch.loaiDichVu.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    updateState: (payload, state) => {
      dispatch.loaiDichVu.updateData({
        ...payload,
      })
    },
  }),
};
