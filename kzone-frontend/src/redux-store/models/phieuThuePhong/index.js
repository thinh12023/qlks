import { message } from "antd";
import bookingProvider from "data-access/booking-provider";
export default {
  state: {
    dsPhieuThuePhong: [],
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    clearOldData: (state) => {
      dispatch.phieuThuePhong.updateData({
        dsPhongDangKy: [],
        currentItem: {},
      })
    },
    onCreate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({
          isLoadingCreate: true,
        });

        bookingProvider
          .create(payload)
          .then((s) => {
            dispatch.phieuThuePhong.updateData({
              isLoadingCreate: false,
            });
            dispatch.phieuThuePhong.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.phieuThuePhong.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({
          isLoadingCreate: true,
        });
        bookingProvider
          .update({ id, payload })
          .then((s) => {
            dispatch.phieuThuePhong.onSearch({});
            dispatch.phieuThuePhong.updateData({
              isLoadingCreate: false,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.phieuThuePhong.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({
          isLoading: true,
        });

        bookingProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.phieuThuePhong.updateData({
              isLoading: false,
            });
            dispatch.phieuThuePhong.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.phieuThuePhong.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.phieuThuePhong.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.phieuThuePhong.onSearch({ page: 1, size, ...rest });
    },
    onSearch: ({ page = 1, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.phieuThuePhong.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.phieuThuePhong.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.phieuThuePhong.updateData(newState);
        let size = payload.size || state.phieuThuePhong.size || 10;
        bookingProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.phieuThuePhong.updateData({
              dsPhieuThuePhong: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.phieuThuePhong.updateData({
              dsPhieuThuePhong: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phieuThuePhong.dataSearch || {}),
        ...payload,
      };
      dispatch.phieuThuePhong.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.phieuThuePhong.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.phieuThuePhong.dataSort || {};
      dataSort.type = payload.type;

      dispatch.phieuThuePhong.updateData({
        page: 1,
        dataSort,
      });
      dispatch.phieuThuePhong.onSearch({
        page: 1,
        dataSort,
      });
    },
    onGetCodeBook: (state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({ isLoadingCreate: true });
        bookingProvider
          .getCodeBook({})
          .then(s => {
            dispatch.phieuThuePhong.updateData({ isLoadingCreate: false });
            resolve(s);
          })
          .catch(e => {
            dispatch.phieuThuePhong.updateData({ isLoadingCreate: false });
            reject(e);
          });
      });
    },
    onSearchById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({ isLoading: true });
        bookingProvider
          .search({ id })
          .then(s => {
            const currentItem = s?.data?.contents[0];
            let dsPhongDangKy = [];
            if (currentItem) {
              dsPhongDangKy = currentItem?.roomBookings?.map((item, index) => ({
                id: item?.room?.id,
                name: item?.room?.name,
                idRoomType: item?.room?.idRoomType,
                idFloor: item?.room?.idFloor,
                numberOfPerson: item?.numberOfPerson,
                idItem: item?.id,
              }))
            }
            dispatch.phieuThuePhong.updateData({
              currentItem,
              dsPhongDangKy,
              isLoading: false
            });
            resolve(s?.data);
          })
          .catch(e => {
            dispatch.phieuThuePhong.updateData({ isLoading: false });
            resolve(e);
          });
      });
    },
    onSearchLatest: (idRoom, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({ isLoading: true });
        bookingProvider
          .searchLatest({ idRoom })
          .then(s => {
            const booking = s?.data;
            dispatch.phieuThuePhong.updateData({ isLoading: false });
            resolve(booking);
          })
          .catch(e => {
            dispatch.phieuThuePhong.updateData({ isLoading: false });
            resolve(e);
          });
      });
    },
    onGuestCheckin: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({ isLoading: true });
        bookingProvider
          .guestCheckin(payload)

          .then(s => {

            dispatch.phieuThuePhong.updateData({ isLoading: false });
            message.success("Successs!");
            resolve(s);
          })
          .catch(e => {
            dispatch.phieuThuePhong.updateData({ isLoading: false });
            message.error("Something went wrong, please try again!");
            reject(e);
          });
      });
    },
    onGuestCheckout: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({ isLoading: true });
        bookingProvider
          .guestCheckout(payload)
          .then(s => {
            dispatch.phieuThuePhong.updateData({ isLoading: false });
            resolve(s?.data);
          })
          .catch(e => {
            dispatch.phieuThuePhong.updateData({ isLoading: false });
            message.error("Something went wrong, please try again!");
            reject(e);
          });
      });
    },
    onGuestBookRoom: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({ isLoadingCreate: true });
        bookingProvider
          .guestBookRoom(payload)
          .then(s => {
            message.success("Đặt phòng thành công!")
            dispatch.phieuThuePhong.updateData({ isLoadingCreate: false });
            resolve(s);
          })
          .catch(e => {
            message.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
            dispatch.phieuThuePhong.updateData({ isLoadingCreate: false });
            reject(e);
          });
      });
    },
    onSearchUnConfirmedBooking: ({ isConfirm }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.phieuThuePhong.updateData({ isLoading: true });
        bookingProvider
          .search({ isConfirm })
          .then(s => {
            let dsPhieuChuaXacNhan = s?.data?.contents;
            message.success("Success!")
            dispatch.phieuThuePhong.updateData({
              isLoading: false,
              dsPhieuChuaXacNhan,
            });
            resolve(s);
          })
          .catch(e => {
            message.error("Failed!");
            dispatch.phieuThuePhong.updateData({
              isLoading: false,
              dsPhieuChuaXacNhan: [],
            });
            reject(e);
          });
      });
    }
  }),
};
