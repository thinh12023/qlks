import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { DatePicker, Form, Input, Spin, Button, InputNumber } from "antd";
import Banner from "../../../components/Banner";
import { HOST } from "client/request";
import moment from "moment";
import { removeVietnameseTones } from "utils";
import { useHistory } from "react-router";
import { any } from "prop-types";
function BaiVietChiTiet({
  isLoading,
  baiVietHienTai,
  baiVietRandom,
  baiVietRandom1,
  onSearchBaiVietById,
  onSearchRandom,
  onSearchBaiViet,
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
    onSearchBaiViet({ size: 999 });
    const id = props.match.params.id;
    if (id) {
      onSearchBaiVietById(id);
      onSearchRandom(id);
    }
  }, [props.match.params.id]);
  useEffect(() => {

  }, []);
  return (
    <Spin spinning={isLoading}>
      <Banner title={`${baiVietHienTai?.title}`} />
      <Main>
        <div class="leftNews" onClick={(e) => {
                push("/tin-tuc/" + baiVietRandom?.id)
              }}>
          {baiVietRandom?.title}
          <div><img class="leftImg" src={`${HOST}images/${baiVietRandom?.image}`} alt="" /></div>
        </div>

        <div class="all">
        <div class="date">Ngày Viết: {formatDate(baiVietHienTai?.createdAt)}</div>
        <div className="imgDiv">
          <img src={`${HOST}images/${baiVietHienTai?.image}`} alt="" />
        </div>
        <div className="content">
          {baiVietHienTai?.content}
        </div>
        </div>
        <div class="rightNews" onClick={(e) => {
                push("/tin-tuc/" + baiVietRandom1?.id)
              }}>
          {baiVietRandom1?.title}
          <div><img class="rightImg" src={`${HOST}images/${baiVietRandom1?.image}`} alt="" /></div>
        </div>
      </Main>
    </Spin >
  )
}

export default Form.create({})(
  connect(
    (state) => ({
      isLoading: state.baiViet.isLoading || false,
      baiVietHienTai: state.baiViet.baiVietHienTai,
      baiVietRandom: state.baiViet.baiVietRandom,
      baiVietRandom1: state.baiViet.baiVietRandom1,
      dsBaiViet: state.baiViet.dsBaiViet || [],
    }),
    ({
      baiViet: {
        onSearchBaiVietById,
        onSearchRandom,
        onSearch: onSearchBaiViet,
      },
     
    }) => ({
      onSearchBaiVietById,
      onSearchRandom, onSearchBaiViet,
    }),

  )(BaiVietChiTiet)
);