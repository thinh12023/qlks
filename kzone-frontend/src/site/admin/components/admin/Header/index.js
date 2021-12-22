import React, {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
import { Select, Button } from "antd";
import "./style.scss";
import { connect } from "react-redux";
import ModalChangePassword from "../../ModalChangePassword";
import ModalUpdateInfoHotel from "../../ModalUpdateInfoHotel";

const Header = (props) => {
  const screenShort = useRef(null);
  const refChangePassword = useRef(null);
  const refModalUpdateInfo = useRef(null);
  const [size, setSize] = useState([0, 0]);
  const [state, _setState] = useState({
    showChangePass: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChangePass = () => {
    if (refChangePassword.current) {
      refChangePassword.current.show();
    }
    setState({
      showChangePass: true,
    });
  };
  const useWindowSize = () => {
    useLayoutEffect(() => {
      updateSize();
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  };
  const updateSize = () => {
    let offsetBottom;
    if (screenShort.current) {
      let parentHeight = window.innerHeight;
      offsetBottom = parentHeight - 547;
    }
    setSize(offsetBottom);
  };
  const showModalUpdateInfoHotel = () => e => {
    if (refModalUpdateInfo.current) {
      refModalUpdateInfo.current.show({});
    }
  }

  return (
    <header className="page-header" role="banner">
      <div className="page-logo">
        <a
          href="#"
          className="page-logo-link press-scale-down d-flex align-items-center position-relative"
        // data-toggle="modal"
        // data-target="#modal-shortcut"
        >
          <img
            src={require("resources/images/logo.png")}
            alt="Kzone The Star Hotel"
            aria-roledescription="logo"
          />
          {/* <span className="page-logo-text mr-1">Kzone The Star Hotel</span> */}
          {/* <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
          <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i> */}
        </a>
      </div>

      <div className="hidden-md-down dropdown-icon-menu position-relative">
        <a
          href="#"
          className="header-btn btn js-waves-off"
          data-action="toggle"
          data-class="nav-function-hidden"
          title="Hide Navigation"
        >
          <i className="ni ni-menu"></i>
        </a>
        <ul>
          <li>
            <a
              href="#"
              className="btn js-waves-off"
              data-action="toggle"
              data-class="nav-function-minify"
              title="Minify Navigation"
            >
              <i className="ni ni-minify-nav"></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="btn js-waves-off"
              data-action="toggle"
              data-class="nav-function-fixed"
              title="Lock Navigation"
            >
              <i className="ni ni-lock-nav"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="hidden-lg-up">
        <a
          href="#"
          className="header-btn btn press-scale-down waves-effect waves-themed"
          data-action="toggle"
          data-class="mobile-nav-on"
        >
          <i className="ni ni-menu"></i>
        </a>
      </div>
      <div className="ml-auto d-flex">
        {props.dsPhong && props.dsPhong.length <= 0 && (
          <div className="hidden-md-down header-icon _c">
            <Button
              onClick={showModalUpdateInfoHotel()}
              type="primary"
              style={{ width: "100%", marginRight: 15, backgroundColor: "#57ace5" }}
            >
              <b>Cập nhật thông tin khách sạn</b>
            </Button>
          </div>
        )}
        <div>
          <a
            href="#"
            data-toggle="dropdown"
            title={props.auth && props.auth.email}
            className="header-icon d-flex align-items-center justify-content-center ml-2"
          >
            <img
              src={
                "/img/demo/avatars/avatar-admin.png"
              }
              className="profile-image rounded-circle"
              alt={""}
            // style={{ maxHeight: 90 }}
            />
          </a>
          <div
            className={`dropdown-menu dropdown-menu-animated dropdown-lg ${useWindowSize() <= 10 && "screenShort"
              }`}
            ref={screenShort}
          >
            <div className="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
              <div className="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                <a
                  className="fw-500 pt-3 pb-3"
                >
                  <span className="mr-2">
                  </span>
                  <div className="info-card-text">
                    <div className="fs-lg text-truncate text-truncate-lg">
                      {props.auth && props.auth.username}
                    </div>
                    <span className="text-truncate text-truncate-md opacity-80">
                      {props.auth && props.auth.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="dropdown-divider m-0"></div>
            <a
              onClick={onChangePass}
              className="dropdown-item fw-500 pt-3 pb-3"
            >
              <span data-i18n="drpdwn.reset_layout">Thay đổi mật khẩu</span>
            </a>
            <a href="#" className="dropdown-item" data-action="app-reset">
              <span data-i18n="drpdwn.reset_layout">Đặt lại bố cục</span>
            </a>
            <a
              href="#"
              className="dropdown-item"
              data-toggle="modal"
              data-target=".js-modal-settings"
            >
              <span>Cài đặt</span>
            </a>
            <a href="#" className="dropdown-item" data-action="app-fullscreen">
              <span>Toàn màn hình</span>
              <i className="float-right text-muted fw-n">F11</i>
            </a>
            <a
              onClick={() => {
                localStorage.clear();
                props.onLogout();
                // window.location.href = "/login";
              }}
              className="dropdown-item fw-500 pt-3 pb-3"
            >
              <span>Đăng xuất</span>
            </a>
          </div>
        </div>
      </div>
      <ModalChangePassword wrappedComponentRef={refChangePassword} />
      <ModalUpdateInfoHotel wrappedComponentRef={refModalUpdateInfo} />
    </header>
  );
};

export default connect(
  (state) => {
    return {
      auth: state.auth.auth,
      dsPhong: state.phong.dsPhong || [],
    };
  },
  ({
    auth: { onLogout },
  }) => {
    return {
      onLogout,
    };
  }
)(Header);
