import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import {
  InputNumber,
  Button,
} from "antd";
import { Main } from "./styled";
import moment from "moment";
import { Table } from "site/admin/components/common";

function DanhSachPhongDangKy({
  form,
  currentItem,
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

  const tienPhongChiTiet = useMemo(() => {
    let ds = [];
    if (currentItem) {
      ds = currentItem?.roomBillDetails?.map((item, index) => ({
        ...item,
        index,
      }));
    }
    return ds;
  }, [currentItem]);

  console.log(tienPhongChiTiet);

  useEffect(() => { }, []);

  return (
    <Main>
      <div className="title">Tiền phòng chi tiết</div>
      <Table
        scroll={{ x: 400, y: 400 }}
        className="custom"
        rowKey={"index"}
        columns={[
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Desc</div>
              </div>
            ),
            width: 50,
            dataIndex: "desc",
            align: "center",
            key: "col0",
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">From</div>
              </div>
            ),
            width: 50,
            dataIndex: "fromDate",
            align: "center",
            key: "col1",
            render: (value, item) => moment(value).format("DD/MM/YY HH:mm"),
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">To</div>
              </div>
            ),
            width: 50,
            dataIndex: "to",
            align: "center",
            key: "col2",
            render: (value, item) => moment(value).format("DD/MM/YY HH:mm"),
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Cost</div>
              </div>
            ),
            width: 50,
            dataIndex: "cost",
            align: "center",
            key: "col3",
          },
          // {
          //   title: (
          //     <div className="custome-header">
          //       <div className="title-box">Total</div>
          //     </div>
          //   ),
          //   width: 50,
          //   dataIndex: "total",
          //   align: "center",
          //   key: "col4",
          // },
        ]}
        dataSource={tienPhongChiTiet}
      />
    </Main>
  );
}
export default connect(
  (state) => ({
    currentItem: state.hoaDonThuePhong.currentItem,
  }),
  ({

  }) => {
    return {

    };
  }
)(DanhSachPhongDangKy);
