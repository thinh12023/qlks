import { message } from "antd";
import roomBillProvider from "data-access/room-bill-provider";
import moment from "moment";
import { LOAI_THUE_PHONG } from "constant";
export default {
  state: {
    dsHoaDonThuePhong: [],
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    clearOldData: (state) => {
      dispatch.hoaDonThuePhong.updateData({

      })
    },
    onCreate: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.hoaDonThuePhong.updateData({
          isLoadingCreate: true,
        });
        roomBillProvider
          .create(payload)
          .then((s) => {
            dispatch.hoaDonThuePhong.updateData({
              isLoadingCreate: false,
            });
            dispatch.hoaDonThuePhong.onSearch({});
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.hoaDonThuePhong.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.hoaDonThuePhong.updateData({
          isLoadingCreate: true,
        });

        roomBillProvider
          .update({ id, payload })
          .then((s) => {
            let dsHoaDonThuePhong = (state.hoaDonThuePhong.dsHoaDonThuePhong || []).map((item) => {
              if (item.id != id) return item;
              s.data.index = item.index;
              return s.data;
            });

            dispatch.hoaDonThuePhong.updateData({
              isLoadingCreate: false,
              dsHoaDonThuePhong,
            });
            message.success("Chỉnh sửa thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Chỉnh sửa không thành công");
            dispatch.hoaDonThuePhong.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.hoaDonThuePhong.updateData({
          isLoading: true,
        });

        roomBillProvider
          .delete({ id, ...payload })
          .then((s) => {
            dispatch.hoaDonThuePhong.updateData({
              isLoading: false,
            });
            dispatch.hoaDonThuePhong.onSearch({});
            message.success("Xoá phòng thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xoá phòng không thành công");
            dispatch.hoaDonThuePhong.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.hoaDonThuePhong.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.hoaDonThuePhong.onSearch({ page: 1, size, ...rest });
    },
    onSearch: ({ page = 1, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const dataSearch = {
          ...(state.hoaDonThuePhong.dataSearch || {}),
          ...(payload.dataSearch || {}),
        };
        const dataSort = {
          ...(state.hoaDonThuePhong.dataSort || {}),
          ...(payload.dataSort || {}),
        };

        let newState = { isLoading: true, page, dataSearch };
        dispatch.hoaDonThuePhong.updateData(newState);
        let size = payload.size || state.hoaDonThuePhong.size || 10;
        roomBillProvider
          .search({
            page,
            size,
            ...dataSearch,
            ...dataSort,
          })
          .then((s) => {
            dispatch.hoaDonThuePhong.updateData({
              dsHoaDonThuePhong: (s?.data?.contents || []).map((item, index) => {
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
            dispatch.hoaDonThuePhong.updateData({
              dsHoaDonThuePhong: [],
              isLoading: false,
            });
            reject(e);
          });
      })
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.hoaDonThuePhong.dataSearch || {}),
        ...payload,
      };
      dispatch.hoaDonThuePhong.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.hoaDonThuePhong.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.hoaDonThuePhong.dataSort || {};
      dataSort.type = payload.type;

      dispatch.hoaDonThuePhong.updateData({
        page: 1,
        dataSort,
      });
      dispatch.hoaDonThuePhong.onSearch({
        page: 1,
        dataSort,
      });
    },
    onSearchRoomBillByRoomAndBooking: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.hoaDonThuePhong.updateData({ isLoadingCreate: true });
        roomBillProvider
          .searchRoomBillByRoomAndBooking(payload)
          .then(s => {
            let currentItem = s?.data;
            let checkoutDate = moment();
            if (currentItem.type == LOAI_THUE_PHONG.THEO_NGAY && checkoutDate.isAfter(moment(currentItem?.checkoutDate))) {
              currentItem = {
                ...currentItem,
                checkoutDate: moment(checkoutDate).format("YYYY-DD-MM"),
                checkoutTime: moment(checkoutDate).format("HH:mm:ss"),
              }
            }
            dispatch.hoaDonThuePhong.updateData({
              isLoadingCreate: false,
              currentItem,
              booking: s?.data?.booking || {},
              guest: s?.data?.booking?.guest || {},
              room: s?.data?.room || {},
            });
            message.success("Load thông tin hóa đơn thành công!");
            resolve();
          })
          .catch(e => {
            dispatch.hoaDonThuePhong.updateData({
              isLoadingCreate: false,
              currentItem: {},
              currentItem: {},
              booking: {},
              guest: {},
              room: {},
            });
            message.error("Load thông tin hóa đơn không thành công!");
            reject();
          });
      });
    },
    onConfirmGuestCheckout: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.hoaDonThuePhong.updateData({ isLoadingCreate: true });
        roomBillProvider
          .confirmCheckout(payload)
          .then(s => {
            dispatch.hoaDonThuePhong.updateData({ isLoadingCreate: false, currentItem: {}, dsHoaDonPhong: [], dsHoDonDichVu: {} });
            resolve();
          })
          .catch(e => {
            dispatch.hoaDonThuePhong.updateData({ isLoadingCreate: false });
            reject();
          });
      });
    },
    onSearchById: (id, state) => {
      return new Promise((resolve, reject) => {
        dispatch.hoaDonThuePhong.updateData({ isLoadingCreate: true });
        roomBillProvider
          .search({ id })
          .then(s => {
            const { booking, room, roomBill, roomBillConsignments, serviceBills } = s?.data?.contents[0];
            const totalMoney = parseFloat(roomBill?.totalRoomPayment)
              + parseFloat(roomBill?.totalConsignmentPayment)
              + parseFloat(roomBill?.totalServicePayment)
              + parseFloat(roomBill?.surcharge)
              - parseFloat(roomBill?.discount);
            dispatch.hoaDonThuePhong.updateData({
              isLoadingCreate: false,
              currentItem: {
                ...roomBill,
                totalMoney,
              },
              dsHoaDonPhong: roomBillConsignments,
              dsHoaDonDichVu: serviceBills,
              typeOfBooking: roomBill?.type,
            });
            resolve();
          })
          .catch(e => {
            dispatch.hoaDonThuePhong.updateData({ isLoadingCreate: false });
            reject();
          });
      });
    },
  })
}