import { message } from "antd";
import floorProvider from "data-access/floor-provider";
export default {
  state: {
    dsFloor: [],
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
        dispatch.floor.updateData({
          isLoadingCreate: true,
        });

        floorProvider
          .create({ ...payload })
          .then((s) => {
            dispatch.floor.updateData({
              isLoadingCreate: false,
            });
            dispatch.floor.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.floor.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.floor.updateData({
          isLoadingCreate: true,
        });

        floorProvider
          .update({ id, payload })
          .then((s) => {
            let dsFloor = (state.floor.dsFloor || []).map((item) => {
              if (item.id != id) return item;
              s.data.index = item.index;
              return s.data;
            });

            dispatch.floor.updateData({
              isLoadingCreate: false,
              dsFloor,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.floor.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.floor.updateData({
          isLoading: true,
        });

        floorProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.floor.updateData({
              isLoading: false,
            });
            dispatch.floor.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.floor.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.floor.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.floor.onSearch({ page: 1, size, ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.floor.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.floor.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.floor.updateData(newState);
        let size = payload.size || state.floor.size || 10;
        floorProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.floor.updateData({
              dsFloor: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.floor.updateData({
              dsFloor: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.floor.dataSearch || {}),
        ...payload,
      };
      dispatch.floor.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.floor.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.floor.dataSort || {};
      dataSort.type = payload.type;

      dispatch.floor.updateData({
        page: 1,
        dataSort,
      });
      dispatch.floor.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    updateState: (payload, state) => {
      dispatch.floor.updateData({
        ...payload,
      })
    },
  }),
};
