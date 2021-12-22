import { message } from "antd";
import travelAgencyProvider from "data-access/travel-agency-provider";
export default {
  state: {
    dsTravelAgency: [],
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
        dispatch.travelAgency.updateData({
          isLoadingCreate: true,
        });

        travelAgencyProvider
          .create(payload)
          .then((s) => {
            dispatch.travelAgency.updateData({
              isLoadingCreate: false,
            });
            dispatch.travelAgency.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.travelAgency.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.travelAgency.updateData({
          isLoadingCreate: true,
        });

        travelAgencyProvider
          .update({ id, payload })
          .then((s) => {
            let dsTravelAgency = (state.travelAgency.dsTravelAgency || []).map((item) => {
              if (item.id != id) return item;
              s.data.index = item.index;
              return s.data;
            });

            dispatch.travelAgency.updateData({
              isLoadingCreate: false,
              dsTravelAgency,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.travelAgency.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.travelAgency.updateData({
          isLoading: true,
        });

        travelAgencyProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.travelAgency.updateData({
              isLoading: false,
            });
            dispatch.travelAgency.onSearch({});
            message.success("Xoá thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá không thành công");
            dispatch.travelAgency.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.travelAgency.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.travelAgency.onSearch({ page: 1, size, ...rest });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.travelAgency.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.travelAgency.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.travelAgency.updateData(newState);
        let size = payload.size || state.travelAgency.size || 10;
        travelAgencyProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.travelAgency.updateData({
              dsTravelAgency: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.travelAgency.updateData({
              dsTravelAgency: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.travelAgency.dataSearch || {}),
        ...payload,
      };
      dispatch.travelAgency.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.travelAgency.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.travelAgency.dataSort || {};
      dataSort.type = payload.type;

      dispatch.travelAgency.updateData({
        page: 1,
        dataSort,
      });
      dispatch.travelAgency.onSearch({
        page: 1,
        dataSort,
      });
    },
  }),
};
