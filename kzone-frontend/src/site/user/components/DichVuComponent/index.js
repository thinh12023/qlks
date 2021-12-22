import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Button, Icon } from "antd"
import { HOST } from "client/request";
import { useHistory } from "react-router";
function LoaiPhongComponent({
  room,
  ...props
}) {
  const { push } = useHistory();
  return (
    <Main>
       <div className="name">{room?.name}</div>
      <div className="img">
        <img src={`${HOST}images/${room?.image}`} alt="" />
      </div> 
    </Main>
  )
}

export default connect()(LoaiPhongComponent);