import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Main } from "./styled";
import OneFloor from "../OneFloor";

function RoomMap({
  isLoading,
  dsPhong,
  dsFloor,
  onSearchFloor,
  onSearchLoaiPhong,
  onSearchPhong,
  ...props
}) {
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  }
  useEffect(() => {
    onSearchFloor({ dataSearch: { size: 999 } })
      .then(s => {
        onSearchPhong({ dataSearch: { size: 999, active: 1 } });
      })
      .catch(e => { });
    onSearchLoaiPhong({
      dataSearch: { size: 99 }
    });
  }, [])
  const dsRoomBooking = useMemo(() => {
    if (!dsFloor || !dsPhong) return [];
    let result = dsFloor?.map((floor, index) => {
      let item = { floor };
      item.rooms = dsPhong?.filter(room => room?.idFloor == floor?.id);
      return item;
    });
    return result;
  }, [dsPhong]);
  return (
    <Main {...props}>
      <Spin spinning={isLoading}>
        {dsRoomBooking?.map((item, index) => (
          <OneFloor item={item} key={index} />
        ))}
      </Spin>
    </Main>
  );
}

export default connect(
  (state) => ({
    isLoading: state.phong.isLoading || false,
    dsPhong: state.phong.dsPhong || [],
    dsFloor: state.floor.dsFloor || [],
  }),
  ({
    phong: {
      onSearch: onSearchPhong,
    },
    floor: {
      onSearch: onSearchFloor,
    },
    loaiPhong: {
      onSearch: onSearchLoaiPhong,
    }
  }) => ({
    onSearchPhong,
    onSearchFloor,
    onSearchLoaiPhong,
  })
)(RoomMap);