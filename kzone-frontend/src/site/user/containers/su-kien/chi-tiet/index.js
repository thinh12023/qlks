import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { DatePicker, Form, Input, Spin, Button, InputNumber } from "antd";
import Banner from "../../../components/Banner";
import { HOST } from "client/request";
import moment from "moment";
import { removeVietnameseTones } from "utils";
import { useHistory } from "react-router";
function SuKienChiTiet({
  isLoading,
  suKienHienTai,
  onSearchSuKienById,
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
  
  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      onSearchSuKienById(id);
    }
  }, [props.match.params.id]);
  useEffect(() => {

  }, []);
  return (
    <Spin spinning={isLoading}>
      <Banner title={`${suKienHienTai?.title}`} />
      <Main>
        <div className="img">
          <img src={`${HOST}images/${suKienHienTai?.image}`} alt="" />
        </div>
        <div className="content">
          {suKienHienTai?.content}
        </div>
      </Main>
    </Spin >
  )
}

export default Form.create({})(
  connect(
    (state) => ({
      isLoading: state.suKien.isLoading || false,
      suKienHienTai: state.suKien.suKienHienTai,
    }),
    ({
      suKien: {
        onSearchSuKienById,
      },
    }) => ({
      onSearchSuKienById,
    }),

  )(SuKienChiTiet)
);