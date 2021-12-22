import { message } from "antd";
import authProvider from "data-access/auth-provider";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    auth: (() => {
      try {
        let data = localStorage.getItem("auth") || "";
        if (data) return JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
      return null;
    })(),
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onLogin: (param, state) => {
      const { username, password } = param;
      return new Promise((resolve, reject) => {
        if (!username || !password) {
          message.error("Thông tin tài khoản không đúng");
          return;
        }
        authProvider
          .login({ password, username })
          .then((s) => {
            let auth = s?.data;
            localStorage.setItem("auth", JSON.stringify(auth));
            dispatch.auth.updateData({
              auth,
              role: auth.role,
            });
            dispatch.nhanVien.onSearchById({ id: auth.idEmployee });
            message.success("Đăng nhập thành công");
            resolve(auth);
            return;
          })
          .catch((e) => {
            message.error(e);
            reject(e);
            return;
          });
      });
    },
    onLogout: () => {
      authProvider
        .logout()
        .then((s) => {
          localStorage.removeItem("auth");
          localStorage.removeItem("loginType");
          cacheUtils.clear();
          dispatch.auth.updateData({
            auth: null,
            type: null,
          });
          setTimeout(() => {
            let redirect = `/login`;
            console.log(redirect);
            window.location.href = redirect;
          }, 1000);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }),
};
