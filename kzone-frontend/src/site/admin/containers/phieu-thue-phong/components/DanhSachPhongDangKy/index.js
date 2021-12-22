import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  InputNumber,
  Button,
} from "antd";
import { Main } from "./styled";
import moment from "moment";
import { Table } from "site/admin/components/common";
import DanhSachPhongKhaDung from "../DanhSachPhongKhaDung";

function DanhSachPhongDangKy({
  form,
  onSearchFloor,
  onSearchLoaiPhong,
  dsPhongDangKy,
  dsFloor,
  dsLoaiPhong,
  updateData,
  ...props
}) {
  const refDanhSachKhaDung = useRef(null);
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
  const showDanhSachPhongKhaDung = () => e => {
    if (refDanhSachKhaDung.current) {
      refDanhSachKhaDung.current.show({});
    }
  }
  const updateRoomBooking = (room, type) => e => {
    const value = e?.hasOwnProperty("target")
      ? e.target.value
      : e?.hasOwnProperty("_d")
        ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
        : e;
    let ds = dsPhongDangKy?.map(r => {
      if (r?.id == room?.id) {
        r[type] = value;
      }
      return r;
    });
    updateData({ dsPhongDangKy: ds });
  }
  const changeBookRoom = (room = {}) => e => {
    let ds = [];
    const index = dsPhongDangKy?.findIndex(item => item?.id == room?.id);
    if (index != -1) {
      ds = dsPhongDangKy?.filter(i => i?.id != room?.id);
    }
    else {
      ds = [...dsPhongDangKy, {
        id: room?.id,
        name: room?.name,
        idRoomType: room?.idRoomType,
        idFloor: room?.idFloor,
        numberOfPerson: 1,
      }];
    }
    updateData({ dsPhongDangKy: [...ds] });
  }
  useEffect(() => {
    onSearchFloor({ dataSearch: { size: 99 } });
    onSearchLoaiPhong({ dataSearch: { size: 99 } });
  }, []);

  return (
    <Main>
      <div className="title">
        Danh sách phòng đăng ký
        <Button
          type="link"
          // icon="plus"
          onClick={showDanhSachPhongKhaDung()}
        >
          Thêm phòng
        </Button>
      </div>
      <Table
        scroll={{ x: 400, y: 400 }}
        className="custom"
        rowKey={"id"}
        columns={[
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Phòng</div>
              </div>
            ),
            width: 50,
            dataIndex: "name",
            align: "center",
            key: "col1",
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Loại phòng</div>
              </div>
            ),
            width: 50,
            dataIndex: "idRoomType",
            align: "center",
            key: "col1",
            render: (value, item, index) => {
              const roomType = dsLoaiPhong?.find(i => i?.id == value);
              return roomType?.name;
            }
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Tầng</div>
              </div>
            ),
            width: 50,
            dataIndex: "idFloor",
            align: "center",
            key: "col1",
            render: (value, item, index) => {
              const floor = dsFloor?.find(i => i?.id == value);
              return floor?.name;
            }
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Số lượng khách</div>
              </div>
            ),
            width: 50,
            dataIndex: "numberOfPerson",
            align: "center",
            key: "col2",
            render: (value, item, index) => {
              return (
                <InputNumber
                  min={1}
                  value={value}
                  onChange={updateRoomBooking(item, "numberOfPerson")}
                />
              )
            },
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Xóa</div>
              </div>
            ),
            width: 30,
            dataIndex: "id",
            align: "center",
            key: "col3",
            render: (value, item, index) => {
              return (
                <div className="list-action">
                  <Button
                    type="primary"
                    icon="delete"
                    onClick={changeBookRoom(item)}
                  />
                </div>
              );
            }
          }
        ]}
        dataSource={dsPhongDangKy}
      />
      <DanhSachPhongKhaDung wrappedComponentRef={refDanhSachKhaDung} />
    </Main>
  );
}
export default connect(
  (state) => ({
    dsPhongDangKy: state.phieuThuePhong.dsPhongDangKy || [],
    dsLoaiPhong: state.loaiPhong.dsLoaiPhong || [],
    dsFloor: state.floor.dsFloor || [],
  }),
  ({
    phieuThuePhong: {
      updateData,
    },
    floor: {
      onSearch: onSearchFloor,
    },
    loaiPhong: {
      onSearch: onSearchLoaiPhong,
    }
  }) => {
    return {
      updateData,
      onSearchFloor,
      onSearchLoaiPhong,
    };
  }
)(DanhSachPhongDangKy);
