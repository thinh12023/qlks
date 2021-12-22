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
        <img src={`${HOST}images/${room?.thumb}`} alt="" />
      </div>
      <div className="numberOfBed">
        <span>Số giường: </span>
        {room?.numberOfBed}
      </div>
      <div className="numberOfPerson">
        <span>Số khách tối đa: </span>
        {room?.numberOfPerson}
      </div>
      <div className="_f">
        <div className="rate">{room?.dailyRate} VNĐ/Ngày</div>
        <Button
          type="link"
          onClick={() => {
            push(`/loai-phong/${room?.id}`)
          }}
        >
          Đặt phòng
      </Button>
      </div>
    </Main>
  )
}

export default connect()(LoaiPhongComponent);