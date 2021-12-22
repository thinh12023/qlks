import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import accountProvider from "data-access/account-provider";
import { DS_TAI_KHOAN } from "constant/index";
import { flattenArray } from "utils/common";

export default {
  state: {
    dsTaiKhoan: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getAllAccount: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        if (state.account?.dsTaiKhoanCongNo &&
          state.account?.dsTaiKhoanThue &&
          state.account?.dsTaiKhoanKhoVaChiPhi) {
          return;
        } else {
          let dsTaiKhoanCongNo = [], dsTaiKhoanThue = [], dsTaiKhoanKhoVaChiPhi = [];
          let promises = payload.map(item => accountProvider
            .search({ accountNumber: item.id }));
          Promise
            .all(promises)
            .then(accounts => {

              accounts.forEach((item, index) => {
                console.log(index, item);
                switch (index) {
                  case (0):
                    dsTaiKhoanCongNo = flattenArray(item.data.content, "listChild");
                    break;
                  case (1):
                    dsTaiKhoanKhoVaChiPhi = flattenArray(item.data.content, "listChild");
                    break;
                  case (2):
                    dsTaiKhoanThue = flattenArray(item.data.content, "listChild");
                    break;
                  default: break;
                }
              })
              dispatch.account.updateData({
                dsTaiKhoanThue,
                dsTaiKhoanKhoVaChiPhi,
                dsTaiKhoanCongNo,
              })
            })
            .catch((e) => {
              message.error("Không tải được danh sách tài khoản!")
            })
        }

      });
    },
    // getAll: (payload, state) => {
    //   return new Promise(async (resolve, reject) => {
    //     let userId = state.auth.auth?.id;
    //     let dsTaiKhoan = await cacheUtils.read(
    //       userId,
    //       "DATA_TAI_KHOAN",
    //       [],
    //       false
    //     );
    //     dispatch.account.updateData({
    //       dsTaiKhoan,
    //     });

    //     accountProvider
    //       .getAll()
    //       .then((s) => {
    //         let dsTaiKhoan = (s?.data || []).map((item) => ({
    //           id: item.id,
    //           name: item.accountName,
    //           accountNumber: item.accountNumber,
    //           type: item.type,
    //         }));
    //         let dsTaiKhoanCongNo = [], dsTaiKhoanThue = [], dsTaiKhoanKho = [], dsTaiKhoanTien = [], dsTaiKhoanChiPhi = [];
    //         dsTaiKhoan.forEach(item => {
    //           switch (item.type) {
    //             case DS_TAI_KHOAN.congNo:
    //               dsTaiKhoanCongNo.push(item);
    //               break;
    //             case DS_TAI_KHOAN.kho:
    //               dsTaiKhoanKho.push(item);
    //               break;
    //             case DS_TAI_KHOAN.thue:
    //               dsTaiKhoanThue.push(item);
    //               break;
    //             case DS_TAI_KHOAN.chiPhi:
    //               dsTaiKhoanChiPhi.push(item);
    //               break;
    //             case DS_TAI_KHOAN.tien:
    //               dsTaiKhoanTien.push(item);
    //               break;
    //             default:
    //               break;
    //           }
    //         });
    //         dispatch.account.updateData({
    //           dsTaiKhoan,
    //           dsTaiKhoanThue,
    //           dsTaiKhoanChiPhi,
    //           dsTaiKhoanTien,
    //           dsTaiKhoanKho,
    //           dsTaiKhoanCongNo,
    //         });
    //         cacheUtils.save(userId, "DATA_TAI_KHOAN", dsTaiKhoan, false);
    //       })
    //       .catch((e) => { });
    //   });
    // },

    // onSearch: ({ ...payload }, state) => {
    //   return new Promise((resolve, reject) => {
    //     const dataSearch = {
    //       ...(state.account.dataSearch || {}),
    //       ...(payload.dataSearch || {}),
    //     };
    //     let newState = { dataSearch };
    //     dispatch.account.updateData(newState);
    //     accountProvider
    //       .search({
    //         page,
    //         size,
    //         ...dataSearch,
    //       })
    //       .then((s) => {
    //         resolve(s?.data);
    //       })
    //       .catch((e) => {
    //         message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
    //         dispatch.account.updateData({
    //           dsTaiKhoan: [],
    //           // isLoading: false,
    //         });
    //       });
    //   })
    // },

    // onDeleteMultiple: (payload = [], state) => {
    //   return new Promise((resolve, reject) => {
    //     dispatch.thue.updateData({
    //       isLoading: true,
    //     });

    //     productProvider
    //       .deleteMultiple(payload)
    //       .then(s => {
    //         dispatch.thue.updateData({
    //           isLoading: false,
    //         })
    //         dispatch.thue.onSearch({});
    //         message.success("Xóa thành công");
    //         resolve(s?.data);
    //       })
    //       .catch(e => {
    //         message.error(e?.message || "Xóa không thành công");
    //         dispatch.thue.updateData({
    //           isLoading: false,
    //         });
    //         reject(e);
    //       });
    //   });
    // },

    // onDelete: ({ id, ...payload }, state) => {
    //   return new Promise((resolve, reject) => {
    //     dispatch.thue.updateData({
    //       isLoading: true,
    //     });

    //     productProvider
    //       .delete({ id, ...payload })
    //       .then(s => {
    //         //TODO: remove item deleted on state
    //         const { page = 1, size = 10, totalElements } = state.tax;
    //         let dsHangHoa = (state.tax.dsHangHoa || [])
    //           .filter(item => item.id !== id)
    //           .map((item, index) => {
    //             item.key = (page - 1) * size + index + 1;
    //             return item;
    //           });
    //         dispatch.thue.updateData({
    //           isLoading: false,
    //           dsHangHoa: [...dsHangHoa],
    //           page: page,
    //           totalElements: Math.max((totalElements - 1), 0),
    //         });

    //         message.success("Xóa thành công");
    //         resolve(s?.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //         message.error(e?.message || "Xóa không thành công");
    //         dispatch.thue.updateData({
    //           isLoading: false,
    //         });
    //         reject(e);
    //       });
    //   });
    // },
    // onCreate: (payload, state) => {
    //   return new Promise((resolve, reject) => {
    //     dispatch.thue.updateData({
    //       isLoadingCreate: true,
    //     });

    //     taxProvider
    //       .create(payload)
    //       .then(s => {
    //         dispatch.thue.updateData({
    //           isLoadingCreate: false,
    //         });

    //         dispatch.thue.onGetAll({});
    //         message.success("Thêm mới thành công");
    //         resolve(s);
    //       })
    //       .catch(e => {
    //         message.error(e?.message || "Tạo mới không thành công");
    //         dispatch.thue.updateData({
    //           isLoadingCreate: false,
    //         });
    //         reject(e);
    //       });
    //   });
    // },

    // onUpdate: ({ id, ...payload }, state) => {
    //   return new Promise((resolve, reject) => {
    //     dispatch.thue.updateData({
    //       isLoadingCreate: true,
    //     });

    //     taxProvider
    //       .update({ id, ...payload })
    //       .then(s => {
    //         // let dsHangHoa = (state.tax.dsHangHoa || []).map(item => {
    //         //   if (item.id !== id) return item;
    //         //   s.data.key = item.key;
    //         //   return s.data;
    //         // });

    //         // dispatch.thue.updateData({
    //         //   isLoadingCreate: false,
    //         //   dsHangHoa: [...dsHangHoa],
    //         // });

    //         message.success("Chỉnh sửa thành công");
    //         resolve(s?.data);
    //       })
    //       .catch(e => {
    //         message.error(e?.message || "Chỉnh sửa không thành công");
    //         dispatch.thue.updateData({
    //           isLoadingCreate: false,
    //         });
    //         reject(e);
    //       });
    //   });
    // },

    //   onSizeChange: ({ size, ...rest }, state) => {
    //     dispatch.thue.updateData({
    //       size,
    //       page: 1,
    //       ...rest,
    //     });
    //     dispatch.thue.onSearch({ page: 1, size, ...rest });
    //   },
    //   onSearch: ({ page = 1, ...payload }, state) => {
    //     let newState = { isLoading: true, page };
    //     dispatch.thue.updateData(newState);
    //     let size = payload.size || state.tax.size || 10;
    //     const dataSearch = payload.dataSearch || state.tax.dataSearch || {};

    //     productProvider
    //       .search({
    //         page,
    //         size,
    //         ...dataSearch,
    //       })
    //       .then(s => {
    //         dispatch.thue.updateData({
    //           dsHangHoa: (s?.data?.content || []).map((item, index) => {
    //             item.key = (page - 1) * size + index + 1;
    //             return item;
    //           }),
    //           isLoading: false,
    //           totalElements: s?.data?.totalElements || 0,
    //           page,
    //           size
    //         });
    //       })
    //       .catch(e => {
    //         message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
    //         dispatch.thue.updateData({
    //           dsHangHoa: [],
    //           isLoading: false,
    //         });
    //       });
    //   },
    //   onChangeInputSearch: ({ ...payload }, state) => {
    //     const dataSearch = {
    //       ...(state.tax.dataSearch || {}),
    //       ...payload,
    //     };
    //     dispatch.thue.updateData({
    //       page: 1,
    //       dataSearch,
    //     });
    //     dispatch.thue.onSearch({
    //       page: 1,
    //       dataSearch,
    //     });
    //   },
  }),
};
