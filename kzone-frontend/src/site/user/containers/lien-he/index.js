import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Icon, message } from "antd";
import Banner from "../../components/Banner";

function LoaiPhong(props) {
  return (
    <Main>

      <div className="contain">
      <span className="title">Thông Tin Liên Hệ</span>
      <div className="social">
        <Icon type="phone"/>
        <span className="sizes">(+84) 203 3768555</span>
      </div>

      <div className="social">
        <Icon type="facebook"/>
        <span className="sizes">Facebook.com/K-zoneHotel</span>
        
      </div>

      <div className="social">
        <Icon type="twitter"/>
        <span className="sizes">Twitter.com/K-zoneHotel</span>
      </div>

      <div className="social">
        <Icon type="instagram"/>
        <span className="sizes">Instagram.com/K-zoneHotel</span>
      </div>
      
      </div>
    </Main>
  )
}

export default connect()(LoaiPhong);