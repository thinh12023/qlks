import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { DatePicker, Form, Input, Spin, Button, InputNumber } from "antd";
import Banner from "../../../components/Banner";
import { HOST } from "client/request";
import moment from "moment";
import { removeVietnameseTones } from "utils";
import { useHistory } from "react-router";
function TinNoiBoChiTiet({
  isLoading,
  tinNoiBoHienTai,
  tinNoiBoRandom,
  tinNoiBoRandom1,

  onSearchTinNoiBoById,
  onSearchRandom,
  ...props
}) {
  const { push } = useHistory();
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const formatDate=(date)=>{
    return  moment(date).format('DD-MM-YYYY HH:MM');
  }
  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      onSearchTinNoiBoById(id);
      onSearchRandom(id);
    }
  }, [props.match.params.id]);
  useEffect(() => {

  }, []);
  return (
    <Spin spinning={isLoading}>
      <Banner title={`${tinNoiBoHienTai?.title}`} />
      <Main>
        <div class="leftNews" onClick={(e) => {
                push("/tin-noi-bo/" + tinNoiBoRandom?.id)
              }}>
          {tinNoiBoRandom?.title}
          <div><img class="leftImg" src={`${HOST}images/${tinNoiBoRandom?.image}`} alt="" /></div>
        </div>
   
        <div class="all">
        <div class="date">Ngày Viết: {formatDate(tinNoiBoHienTai?.createdAt)}</div>
        <div className="imgDiv">
          <img src={`${HOST}images/${tinNoiBoHienTai?.image}`} alt="" />
        </div>
        <div className="content">
          {tinNoiBoHienTai?.content}
        </div>
        </div>

        <div class="rightNews" onClick={(e) => {
                push("/tin-noi-bo/" + tinNoiBoRandom1?.id)
              }}>
          {tinNoiBoRandom1?.title}
          <div><img class="rightImg" src={`${HOST}images/${tinNoiBoRandom1?.image}`} alt="" /></div>
        
        </div>
      </Main>
    </Spin >
  )
}

export default Form.create({})(
  connect(
    (state) => ({
      isLoading: state.tinNoiBo.isLoading || false,
      tinNoiBoHienTai: state.tinNoiBo.tinNoiBoHienTai,
      tinNoiBoRandom: state.tinNoiBo.tinNoiBoRandom,
      tinNoiBoRandom1: state.tinNoiBo.tinNoiBoRandom1,
    }),
    ({
      tinNoiBo: {
        onSearchTinNoiBoById,
        onSearchRandom,
      },
    }) => ({
      onSearchTinNoiBoById,
      onSearchRandom,
    }),

  )(TinNoiBoChiTiet)
);