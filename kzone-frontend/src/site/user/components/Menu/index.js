import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Main } from "./styled";
import { Icon, message } from "antd";
function Menu(props) {
  const { location } = useHistory();
  const [isHidden, setIsHidden] = useState(true);
  const [recent, setRecent] = useState("/");
  return (
    <Main isHidden={isHidden}>
      <div className="men">
        <Link className="font-s" to="/">Trang chủ</Link>
        {/* <Link className="font-s" to="/loai-phong">Đặt phòng</Link> */}
        <Link className="font-s" to="/dich-vu-tt">Dịch vụ</Link>
        <Link className="font-s" to="/tin-tuc">Tin tức</Link>
        <Link className="font-s" to="/tin-noi-bo">Tin nội bộ</Link>
        <Link className="font-s" to="/su-kien">Sự Kiện</Link>
        <Link className="font-s" to="/vi-tri">Vị Trí</Link>
        <Link className="font-s" to="/lien-he">Liên hệ</Link>
      </div>
      <Icon
        type="menu"
        onClick={() => {
          setIsHidden(() => !isHidden);
        }}
      />
    </Main>
  )
}

export default connect()(Menu);