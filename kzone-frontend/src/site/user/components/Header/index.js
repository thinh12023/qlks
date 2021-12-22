import React, { useState, useEffect, useRef } from "react";
import { Main } from "./styled";
import { connect } from "react-redux";
import Menu from "../Menu";
import Logo from "../Logo";
import HotNews from "../HotNews";

const Header = (props) => {
  const menus = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  menus.current = [
    {
      path: "/",
      title: "Trang chủ",
    },
    {
      path: "loai-phong",
      title: "Loại phòng",
    },
  ];
  return (
    <Main>
      <div className="info">
        <HotNews />
      </div>
      <div className="nav">
        <Logo />
        <Menu />
      </div>
    </Main>
  );
};
export default connect((state) => {
  return {

  };
})(Header);
