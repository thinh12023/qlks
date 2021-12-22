import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import { Table } from "site/admin/components/common";

function HoaDonDichVu({
  form,
  currentItem,
  dsHoaDonDichVu,
  ...props
}) {
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const onChange = (type) => (e) => {
    let newState = {
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
          : e,
    };
    setState(newState);
  };
  const dsHoaDonDv = useMemo(() => {
    let ds = [];
    if (dsHoaDonDichVu && dsHoaDonDichVu?.length > 0) {
      ds = dsHoaDonDichVu?.map(item => ({
        ...item,
      }))
    }
    return ds;
  }, [dsHoaDonDichVu]);
  useEffect(() => { }, []);
  return (
    <Main>
      <div className="title">Danh sách hóa đơn dịch vụ</div>
      <Table
        scroll={{ x: 400, y: 400 }}
        className="custom"
        rowKey={"id"}
        columns={[
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Trạng thái</div>
              </div>
            ),
            width: 100,
            dataIndex: "status",
            align: "center",
            key: "col1",
            render: (value) => value == 0
              ? "Đã thanh toán"
              : "Chưa thanh toán",
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Tổng tiền</div>
              </div>
            ),
            width: 100,
            dataIndex: "totalPayment",
            align: "center",
            key: "col2",
          },
        ]}
        dataSource={dsHoaDonDv}
      />
    </Main>
  );
}
export default connect(
  (state) => ({
    dsHoaDonDichVu: state.hoaDonThuePhong.dsHoaDonDichVu,
    currentItem: state.hoaDonThuePhong.currentItem,
  }),
  ({
  }) => {
    return {
    };
  }
)(HoaDonDichVu);
