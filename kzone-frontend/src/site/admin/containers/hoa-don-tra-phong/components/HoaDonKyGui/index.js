import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import { Table } from "site/admin/components/common";

function HoaDonKyGui({
  form,
  dsHoaDonPhong,
  dsPhong,
  dsFloor,
  onSearchPhong,
  onSearchFloor,
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

  const dsHoaDonKyGui = useMemo(() => {
    let ds = [];
    if (dsHoaDonPhong && dsHoaDonPhong?.length > 0) {
      ds = dsHoaDonPhong?.map(item => ({
        ...item,
        room: dsPhong?.find(i => i?.id == item?.idRoom),
      }))
    }
    return ds;
  }, [dsHoaDonPhong]);

  useEffect(() => {
    onSearchPhong({ dataSearch: { size: 999 } });
    onSearchFloor({ dataSearch: { size: 899 } });
  }, []);

  return (
    <Main>
      <div className="title">Danh sách phòng đơn ký gửi</div>
      <Table
        scroll={{ x: 400, y: 400 }}
        className="custom"
        rowKey={"id"}
        columns={[
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Tên phòng</div>
              </div>
            ),
            width: 50,
            dataIndex: "room",
            align: "center",
            key: "col0",
            render: (value) => {
              return value?.name;
            }
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Tầng</div>
              </div>
            ),
            width: 50,
            dataIndex: "room",
            align: "center",
            key: "col1",
            render: (value) => {
              const floor = dsFloor?.find(i => i?.id == value?.idFloor);
              return floor?.name;
            }
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Tiền phòng</div>
              </div>
            ),
            width: 50,
            dataIndex: "totalPayment",
            align: "center",
            key: "col2",
          },
        ]}
        dataSource={dsHoaDonKyGui}
      />
    </Main>
  );
}
export default connect(
  (state) => ({
    currentItem: state.hoaDonThuePhong.currentItem,
    dsHoaDonPhong: state.hoaDonThuePhong.dsHoaDonPhong || [],
    dsPhong: state.phong.dsPhong || [],
    dsFloor: state.floor.dsFloor,
  }),
  ({
    phong: {
      onSearch: onSearchPhong,
    },
    floor: {
      onSearch: onSearchFloor,
    }
  }) => {
    return {
      onSearchPhong,
      onSearchFloor,
    };
  }
)(HoaDonKyGui);
