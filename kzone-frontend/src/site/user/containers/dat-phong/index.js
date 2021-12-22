import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Icon, message } from "antd";
function LoaiPhong(props) {
  return (
    <Main>
      Loai phong
    </Main>
  )
}

export default connect()(LoaiPhong);