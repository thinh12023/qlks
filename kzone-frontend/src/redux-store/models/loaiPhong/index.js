import { message } from "antd";
import roomTypeProvider from "data-access/room-type-provider";
import cacheUtils from "utils/cache-utils";
import { TYPE_EARLY_BY_DAY, TYPE_EARLY_BY_HOUR, TYPE_HOURLY, TYPE_OVERTIME_BY_DAY, TYPE_OVERTIME_BY_HOUR } from "../../../constant";
export default {
  state: {
    dsLoaiPhong: [],
    dsPhuTroCheckinSomTheoNgay: [],
    dsPhuTroCheckoutMuonTheoNgay: [],
    dsPhuTroCheckinSomQuaDem: [],
    dsPhuTroCheckoutMuonQuaDem: [],
    dsGiaTheoGio: [],
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    clearOldData: () => {
      dispatch.loaiPhong.updateData({
        dataSearch: "",
        dsPhuTroCheckinSomTheoNgay: [],
        dsPhuTroCheckoutMuonTheoNgay: [],
        dsPhuTroCheckinSomQuaDem: [],
        dsPhuTroCheckoutMuonQuaDem: [],
        dsGiaTheoGio: [],
        currentItem: {},
      });
    },
    onCreate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.loaiPhong.updateData({
          isLoadingCreate: true,
        });

        roomTypeProvider
          .create(payload)
          .then((s) => {
            dispatch.loaiPhong.updateData({
              isLoadingCreate: false,
            });
            dispatch.loaiPhong.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Thêm mới không thành công");
            dispatch.loaiPhong.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.loaiPhong.updateData({
          isLoadingCreate: true,
        });

        roomTypeProvider
          .update({ id, payload })
          .then((s) => {
            let dsLoaiPhong = (state.loaiPhong.dsLoaiPhong || []).map((item) => {
              if (item.id != id) return item;
              s.data.index = item.index;
              return s.data;
            });

            dispatch.loaiPhong.updateData({
              isLoadingCreate: false,
              dsLoaiPhong,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.loaiPhong.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.loaiPhong.updateData({
          isLoading: true,
        });

        roomTypeProvider
          .delete({ id })
          .then((s) => {
            dispatch.loaiPhong.updateData({
              isLoading: false,
            });
            dispatch.loaiPhong.onSearch({});
            message.success("Xoá loại phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá loại phòng không thành công");
            dispatch.loaiPhong.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.loaiPhong.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.loaiPhong.onSearch({
        page: 1,
        size,
        ...rest
      });
    },
    onSearch: ({ page = 1, ...payload }, state) => {
      const dataSearch = {
        ...(state.loaiPhong.dataSearch || {}),
        ...(payload.dataSearch || {}),
      };
      const dataSort = {
        ...(state.loaiPhong.dataSort || {}),
        ...(payload.dataSort || {}),
      };

      let newState = { isLoading: true, page, dataSearch };
      dispatch.loaiPhong.updateData(newState);
      let size = payload.size || state.loaiPhong.size || 10;
      roomTypeProvider
        .search({
          page: page - 1,
          size,
          ...dataSearch,
          ...dataSort,
        })
        .then((s) => {
          dispatch.loaiPhong.updateData({
            dsLoaiPhong: (s?.data?.contents || []).map((item, index) => {
              item.index = Math.max(0, (page - 1)) * size + index + 1;
              return item;
            }),
            isLoading: false,
            total: s?.data?.totalElement || 0,
            page,
            size
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.loaiPhong.updateData({
            dsroomType: [],
            isLoading: false,
          });
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.loaiPhong.dataSearch || {}),
        ...payload,
      };
      dispatch.loaiPhong.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.loaiPhong.onSearch({
        page: 1,
        dataSearch,
      });
    },
    // onChangeSort: ({ ...payload }, state) => {
    //   const dataSort = state.loaiPhong.dataSort || {};
    //   dataSort.type = payload.type;

    //   dispatch.loaiPhong.updateData({
    //     page: 1,
    //     dataSort,
    //   });
    //   dispatch.loaiPhong.onSearch({
    //     page: 1,
    //     dataSort,
    //   });
    // },
    onSearchById: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.loaiPhong.updateData({
          isLoading: true,
        });
        roomTypeProvider
          .search({ id, ...payload })
          .then(s => {
            let roomType = s?.data?.contents[0];
            let prices = roomType?.prices || [];
            dispatch.loaiPhong.updateData({
              isLoading: false,
              currentItem: { ...roomType },
              dsGiaTheoGio: prices?.filter(i => i?.type == TYPE_HOURLY),
              dsPhuTroCheckinSomQuaDem: prices?.filter(i => i?.type == TYPE_EARLY_BY_HOUR),
              dsPhuTroCheckinSomTheoNgay: prices?.filter(i => i?.type == TYPE_EARLY_BY_DAY),
              dsPhuTroCheckoutMuonQuaDem: prices?.filter(i => i?.type == TYPE_OVERTIME_BY_HOUR),
              dsPhuTroCheckoutMuonTheoNgay: prices?.filter(i => i?.type == TYPE_OVERTIME_BY_DAY),
            });
          })
          .catch(e => {
            dispatch.loaiPhong.updateData({
              isLoading: false,
            });
          })
      });
    },
    onSearchLoaiPhongsClient: (state) => {
      return new Promise((resolve, reject) => {
        dispatch.loaiPhong.updateData({ isLoadingClient: true });
        roomTypeProvider
          .searchLoaiPhongsClient()
          .then(s => {
            const dsLoaiPhongClient = s?.data || [];
            dispatch.loaiPhong.updateData({
              dsLoaiPhongClient,
              isLoadingClient: false,
            });
          })
          .catch(e => {
            dispatch.loaiPhong.updateData({
              dsLoaiPhongClient: [],
              isLoadingClient: false,
            });
          });
      });
    },
    onSearchLoaiPhongById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.loaiPhong.updateData({ isLoadingClient: true });
        roomTypeProvider
          .searchLoaiPhongById(id)
          .then(s => {
            const currentItemClient = s?.data;
            dispatch.loaiPhong.updateData({
              isLoadingClient: false,
              currentItemClient,
            });
          })
          .catch(e => {
            dispatch.loaiPhong.updateData({
              isLoadingClient: false,
              currentItemClient: {},
            });
          });
      });
    },
  }),
};
