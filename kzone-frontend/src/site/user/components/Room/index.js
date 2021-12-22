import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { HOST } from "client/request";
import { formatNumber } from "utils/index";

function Room({
  item,
  ...props
}) {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useEffect(() => {
    setState({
      item: {
        ...item,
        images: item?.images?.map(i => i?.path),
        utilities: item?.utilities?.map(i => ({
          id: i?.id,
          image: i?.image,
          name: i?.name,
          desc: i?.desc,
        })),
      }
    })
  }, [item]);

  return (
    <Main {...props} bg={`${HOST}images/${state.item?.images[0]}`}>
      <div className="name">{state.item?.name}</div>
      {/* <div className="Content"> */}
      {/* <span >Số Người: {state.item?.numberOfPerson}</span>
        <span>Số Giường: {state.item?.numberOfBed}</span>
        <span>Diện Tích: {state.item?.square}m2</span> */}
      {/* <span>Giá Ở Qua Đêm: {formatNumber(state.item?.overnightRate)} VND</span>
        <span>Giá Ở Cả Ngày: {formatNumber(state.item?.dailyRate)} VND</span> */}
      {/* </div> */}

    </Main>
  )
}


export default connect()(Room);