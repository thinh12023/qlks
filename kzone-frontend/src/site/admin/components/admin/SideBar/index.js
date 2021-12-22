import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { connect } from "react-redux";
import ItemMenu from "../ItemMenu";
import $ from "jquery";

const SideBar = (props) => {
  const menus = useRef(null);
  const [state, _setState] = useState({
    show: false,
    // menus: getMenu()
  });

  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const getMenu = () => {
    let allMenus = [
      {
        userType: [6],
        href: "/admin",
        name: "Dashboard",
        icon: "fal fa-game-board-alt",
        filter: "Sơ đồ khách sạn",
      },
      {
        userType: [6],
        href: "#",
        name: "Phòng",
        icon: "fal fa-kaaba",
        menus: [
          {
            href: "/admin/loai-phong",
            name: "Loại phòng",
          },
          {
            href: "/admin/phong",
            name: "Phòng",
          },
          {
            href: "/admin/dich-vu",
            name: "Dịch vụ",
          },
          {
            href: "/admin/tien-ich",
            name: "Tiện ích",
          },
        ],
      },
      {
        userType: [6],
        href: "#",
        name: "Khách sạn",
        icon: "fal fa-building",
        menus: [
          {
            href: "/admin/phieu-thue-phong",
            name: "Phiếu thuê phòng",
          },
          {
            href: "/admin/hoa-don-tra-phong",
            name: "Hóa đơn phòng",
          },
          {
            href: "/admin/hoa-don-dich-vu",
            name: "Hóa đơn dịch vụ",
          },
        ],
      },
      {
        userType: [6],
        href: "#",
        name: "Bài Viết",
        icon: "fal fa-newspaper",
        menus: [
          {
            href: "/admin/bai-viet",
            name: "Tin Tức",
          },
          {
            href: "/admin/su-kien",
            name: "Sự Kiện",
          },
          {
            href: "/admin/tin-noi-bo",
            name: "Tin nội bộ",
          },
        ],
      },
      // {
      //   userType: [6],
      //   href: "/admin/mail",
      //   name: "Mail",
      //   icon: "fal fa-envelope",
      // },
    ];
    return allMenus.filter((item) => {
      // const currentRole = (props.auth && props.auth.authorities) || [];
      // const isAuthorized = currentRole.some((permission) =>
      //   item.userType.includes(permission)
      // ); 
      const isAuthorized = item.userType.includes(props.auth?.role) || item.isLeader

      if (!(item.userType || []).length) return true;
      if (isAuthorized) return true;
    });
  };
  useEffect(() => {
    try {
      window.initApp.listFilter(
        $("#js-nav-menu"),
        $("#nav_filter_input"),
        $("#js-primary-nav")
      );
    } catch (error) { }
  });
  useEffect(() => {
    setState({ menus: getMenu() });
    if (menus.current) {
      setState({ menus: menus.current });
    }
  }, []);
  const toggle = (item) => {
    item.open = !item.open;
    menus.current = [...state.menus];
    setState({ menus: menus.current });
  };
  return (
    <aside className="page-sidebar list-filter-active">
      <div className="page-logo" style={{ padding: 0, height: 66 }}>
        <a
          href="/ke-toan"
          className={`page-logo-link 
          press-scale-down 
          d-flex align-items-center position-relative`}
          style={{ padding: "5px 10px", width: "65%" }}
        >
          <img
            src={require("resources/images/logo.png")}
            alt="Kzone The Star Hotel"
            className="site-logo"
            aria-roledescription="logo"
          />
          {/* <span className="site-name">Kzone The Star Hotel</span> */}
        </a>
      </div>
      <nav
        id="js-primary-nav"
        className="primary-nav js-list-filter"
        role="navigation"
      >
        <div className="nav-filter">
          <div className="position-relative">
            <input
              type="text"
              id="nav_filter_input"
              placeholder="Tìm kiếm tính năng"
              className="form-control"
              tabIndex="0"
            />
            <a
              href="#"
              onClick={() => {
                return false;
              }}
              className="btn-primary btn-search-close js-waves-off"
              data-action="toggle"
              data-class="list-filter-active"
              data-target=".page-sidebar"
            >
              <i className="fal fa-chevron-up"></i>
            </a>
          </div>
        </div>
        <div className="info-card">
          <img
            src="/img/demo/avatars/avatar-admin.png"
            className="profile-image rounded-circle"
            alt={props.auth && props.auth.full_name}
          />
          <div className="info-card-text">
            <a href="#" className="d-flex align-items-center text-white">
              <span className="text-truncate text-truncate-sm d-inline-block">
                {props.auth && props.auth.full_name}
              </span>
            </a>
            {props.auth && props.auth.email && (
              <span className="d-inline-block text-truncate text-truncate-sm">
                {props.auth && props.auth.email}
              </span>
            )}
          </div>
          <img
            src="/img/card-backgrounds/cover-2-lg.png"
            className="cover"
            alt="cover"
          />
          <a
            href="#"
            onClick={() => {
              return false;
            }}
            className="pull-trigger-btn"
            data-action="toggle"
            data-class="list-filter-active"
            data-target=".page-sidebar"
            data-focus="nav_filter_input"
          >
            <i className="fal fa-angle-down"></i>
          </a>
        </div>
        <ul id="js-nav-menu" className="nav-menu">
          {state.menus &&
            state.menus.length &&
            state.menus.map((item, index) => {
              return (
                <ItemMenu
                  key={index}
                  item={item}
                  toggle={toggle}
                  auth={props.auth}
                />
              );
            })}
        </ul>
        <div className="filter-message js-filter-message bg-success-600"></div>
      </nav>
      <div className="nav-footer shadow-top">
        <a
          href="#"
          onClick={() => {
            return false;
          }}
          data-action="toggle"
          data-class="nav-function-minify"
          className="hidden-md-down"
        >
          <i className="ni ni-chevron-right"></i>
          <i className="ni ni-chevron-right"></i>
        </a>
        <ul className="list-table m-auto nav-footer-buttons"></ul>
      </div>
    </aside>
  );
};
export default connect((state) => {
  return {
    auth: state.auth.auth,
  };
})(SideBar);
