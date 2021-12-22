import { message } from "antd";
import employeeProvider from "data-access/employee-provider";
export default {
  state: {
    dsNhanVien: [],
    taiKhoanDangNhap: (() => {
      try {
        let data = localStorage.getItem("taiKhoanDangNhap") || "";
        if (data) return JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
      return null;
    })(),
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    clearOldData: () => {
      dispatch.nhanVien.updateData({
        dataSearch: "",
      });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.nhanVien.updateData({
        size,
        page: 1,
        ...rest,
      });
      dispatch.nhanVien.onSearch({ page: 1, size, ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      const dataSearch = {
        ...(state.nhanVien.dataSearch || {}),
        ...(payload.dataSearch || {}),
      };
      const dataSort = {
        ...(state.nhanVien.dataSort || {}),
        ...(payload.dataSort || {}),
      };

      let newState = { isLoading: true, page, dataSearch };
      dispatch.nhanVien.updateData(newState);
      let size = payload.size || state.nhanVien.size || 10;
      employeeProvider
        .search({
          page,
          size,
          ...dataSearch,
          ...dataSort,
        })
        .then((s) => {
          dispatch.nhanVien.updateData({
            dsNhanVien: (s?.data?.content || []).map((item, index) => {
              item.index = (page - 1) * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.data?.totalElements || 0,
            page,
            size
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nhanVien.updateData({
            dsNhanVien: [],
            isLoading: false,
          });
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nhanVien.dataSearch || {}),
        ...payload,
      };
      dispatch.nhanVien.updateData({
        page: 1,
        dataSearch,
      });
      dispatch.nhanVien.onSearch({
        page: 1,
        dataSearch,
      });
    },
    onChangeSort: ({ ...payload }, state) => {
      const dataSort = state.nhanVien.dataSort || {};
      dataSort.type = payload.type;

      dispatch.nhanVien.updateData({
        page: 1,
        dataSort,
      });
      dispatch.nhanVien.onSearch({
        page: 1,
        dataSort,
      });
    },
    //others
    onSearchById: ({ id }) => {
      return new Promise((resolve, reject) => {
        dispatch.nhanVien.updateData({
          isLoading: true,
        })
        employeeProvider
          .search({ id })
          .then(s => {
            const employee = s?.data?.contents[0];
            localStorage.setItem("taiKhoanDangNhap", JSON.stringify(employee));
            message.success("Success!");
            dispatch.nhanVien.updateData({
              isLoading: false,
              taiKhoanDangNhap: employee,
            })
          })
          .catch(e => {
            message.success("Lỗi không nhận diện được tài khoản");
            dispatch.nhanVien.updateData({
              isLoading: false,
              taiKhoanDangNhap: {},
            })
            reject(e);
          })
      });
    },
    onCreate: (payload) => {
      return new Promise((resolve, reject) => {
        dispatch.nhanVien.updateData({ isLoadingCreate: true });
        employeeProvider
          .create(payload)
          .then(s => {
            dispatch.nhanVien.updateData({
              isLoadingCreate: false,
            });
            dispatch.nhanVien.onSearch({});
            message.success("Tạo mới nhân viên thành công!");
            resolve(s);
          })
          .catch(e => {
            dispatch.nhanVien.updateData({ isLoadingCreate: false });
            message.error("Tạo mới không thành công!");
          });
      });
    }
  }),
};
