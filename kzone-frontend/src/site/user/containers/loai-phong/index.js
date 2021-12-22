import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Spin } from "antd";
import LoaiPhongComponent from "../../components/LoaiPhongComponent";
import Banner from "../../components/Banner";
function LoaiPhong({
  onSearchLoaiPhongsClient,
  isLoadingClient,
  dsLoaiPhongClient,
  ...props
}) {
  useEffect(() => {
    onSearchLoaiPhongsClient();
  }, []);
  return (
    <Spin spinning={isLoadingClient}>
      <Banner title="Phòng nghỉ" />
      <Main>
        {dsLoaiPhongClient?.map((room, index) => (
          <LoaiPhongComponent key={index} room={room} />
        ))}
      </Main>
    </Spin>
  )
}

export default connect(
  (state) => ({
    isLoadingClient: state.loaiPhong.isLoadingClient || false,
    dsLoaiPhongClient: state.loaiPhong.dsLoaiPhongClient || [],
  }),
  ({
    loaiPhong: {
      onSearchLoaiPhongsClient,
    }
  }) => ({
    onSearchLoaiPhongsClient
  }),

)(LoaiPhong);