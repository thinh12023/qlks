import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Icon, message } from "antd";
function Footer(props) {
  return (
    <Main>
      <div className="socical-network">

      </div>
      <div className="footer">
        <div className="_col">
          <div className="_row">
            <img src={require("resources/images/logo.png")} alt="" />
          </div>
        </div>
        <div className="_col">
          <div className="_row">
            <Icon type="environment" />
            <div>185 Văn Cao, Ngô Quyền, Hải Phòng</div>
          </div>
          <div className="_row">
            <Icon type="phone" />
            <div>(+84) 203 3768555</div>
          </div>
          <div className="_row">
            <Icon type="mail" />
            <div>sales@kzonethestarhotle.com</div>
          </div>
        </div>
        <div className="_col">
          <div className="_row social">
            <Icon type="facebook" />
            <Icon type="twitter" />
            <Icon type="instagram" />
          </div>
        </div>
      </div>
    </Main>
  )
}

export default connect()(Footer);