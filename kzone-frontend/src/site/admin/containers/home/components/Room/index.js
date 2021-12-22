import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Menu, Popover } from "antd";
import { TRANG_THAI_PHONG } from "constant";
import moment from "moment";
import ModalPhieuDichVu from "site/admin/components/ModalPhieuDichVu";
import { useHistory } from "react-router";
import { TRANG_THAI_PHIEU } from "../../../../../../constant";
const { Item } = Menu;

function Room({
  item,
  onSearchLatest,
  onGuestCheckin,
  onGuestCheckout,
  updateData,
  onUpdateStatus,
  onSearchRoomBillByRoomAndBooking,
  ...props
}) {
  const refPhieuDichVu = useRef(null);
  const [state, _setState] = useState({});
  const { push } = useHistory();
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  }
  const showModalPhieuDichVu = () => e => {
    if (refPhieuDichVu.current) {
      refPhieuDichVu.current.show({}, item?.id, state.booking?.id);
    }
  }
  const onClick = (room, type) => e => {
    switch (type) {
      case "NHAN_PHONG":
        if (item.status == TRANG_THAI_PHONG.DA_DAT_PHONG?.value) {
          guestCheckin();
        }
        break;
      case "TRA_PHONG":
        guestCheckout();
        break;
      default:
        break;
    }
  }
  const guestCheckin = () => {
    const payload = {
      idRoom: item?.id,
      type: state.booking?.type,
      idBooking: state.booking?.id,
      checkinDate: moment().format("YYYY-MM-DD"),
      checkinTime: moment().format("HH:mm:ss"),
      checkoutDate: state.booking?.checkoutDate,
      checkoutTime: state.booking?.checkoutTime,
    }
    onGuestCheckin(payload);
  }
  const guestCheckout = () => {
    //TODO: show model room bill
    if (state.booking?.id && item?.id) {
      onSearchRoomBillByRoomAndBooking({ idRoom: item?.id, idBooking: state.booking?.id })
        .then(s => {
        })
        .catch(e => {

        });
    }
  }
  const createMenu = (room) => (
    <Menu
      mode="vertical"
      style={{ width: "90%", maxHeight: 250, overflowY: "scroll" }}
    >
      {
        (room?.status != TRANG_THAI_PHONG.CHUA_DON_BUONG?.value
          || room?.status != TRANG_THAI_PHONG.DANG_SUA_PHONG?.value)
        && (
          <Item
            key="1"
            onClick={() => {
              push("/admin/phieu-thue-phong/tao-moi");
            }}
          >
            Đặt phòng
          </Item>
        )
      }
      {
        (room?.status != TRANG_THAI_PHONG.CHUA_DON_BUONG?.value
          && room?.status != TRANG_THAI_PHONG.DANG_SUA_PHONG?.value)
        && room?.status != TRANG_THAI_PHONG.KHACH_DANG_O?.value
        && (
          <Item
            key="2"
            onClick={() => {
              push("/admin/phieu-thue-phong/tao-moi");
            }}
          >
            Nhận phòng
          </Item>
        )
      }
      {
        (room?.status != TRANG_THAI_PHONG.CHUA_DON_BUONG?.value
          || room?.status != TRANG_THAI_PHONG.DANG_SUA_PHONG?.value)
        && room?.status == TRANG_THAI_PHONG.KHACH_DANG_O?.value
        && (
          <Item
            key="3"
          // onClick={}
          >
            Trả phòng
          </Item>
        )
      }
      {
        (room?.status != TRANG_THAI_PHONG.CHUA_DON_BUONG?.value
          || room?.status != TRANG_THAI_PHONG.DANG_SUA_PHONG?.value)
        && room?.status == TRANG_THAI_PHONG.KHACH_DANG_O?.value
        && (
          <Item
            key="4"
            onClick={showModalPhieuDichVu()}
          >
            Tạo phiếu dịch vụ
          </Item>
        )
      }
      {
        (room?.status == TRANG_THAI_PHONG.CHUA_DON_BUONG?.value
          || room?.status == TRANG_THAI_PHONG.DANG_SUA_PHONG?.value)
        && (
          <Item
            key="1"
            onClick={() => {
              onUpdateStatus({ id: room?.id, status: TRANG_THAI_PHONG.KHA_DUNG?.value })
                .then(s => {
                  window.location.reload();
                })
            }}
          >
            Thay đổi trạng thái khả dụng
          </Item>
        )
      }
    </Menu>
  )
  useEffect(() => {
    for (const key in TRANG_THAI_PHONG) {
      if (Object.hasOwnProperty.call(TRANG_THAI_PHONG, key)) {
        const i = TRANG_THAI_PHONG[key];
        if (i?.value == item?.status) {
          setState({ bgColor: `${i?.color}` });
          break;
        }
      }
    }
    //search data booking
    if (item && item.status != TRANG_THAI_PHONG.KHA_DUNG.value) {
      onSearchLatest(item?.id)
        .then(s => {
          setState({ booking: s });
        })
        .catch(e => {
          setState({ booking: {} });
        });
    }
  }, [item]);
  return (
    <Main
      {...props}
      bgColor={state.bgColor}
    >
      <Popover
        placement="bottomLeft"
        trigger={["contextMenu", "click"]}
        content={createMenu(item)}
      >
        <div className="room">{item?.name}</div>
        {state.booking && (
          <div className="info">
            <div className="guest">{state.booking?.guest?.profile?.name}</div>
            <div className="date">
              <div className="from">{moment(state.booking?.checkinDate).format("DD/MM")}</div>
              <span>-</span>
              <div className="to">{moment(state.booking?.checkoutDate).format("DD/MM")}</div>
            </div>
            {state.booking?.travelAgency && (
              <div className="travel">{state.booking?.travelAgency?.name}</div>
            )}
            <div className="number">Số khách: {state.booking?.roomBookings[0]?.numberOfPerson}</div>
          </div>
        )}
      </Popover>
      <ModalPhieuDichVu wrappedComponentRef={refPhieuDichVu} />
    </Main>
  );
}

export default connect(
  (state) => ({

  }),
  ({
    phieuThuePhong: {
      onSearchLatest,
      onGuestCheckin,
      onGuestCheckout
    },
    hoaDonThuePhong: {
      onSearchRoomBillByRoomAndBooking,
      updateData,
    },
    phong: {
      onUpdateStatus,
    }
  }) => ({
    updateData,
    onSearchLatest,
    onGuestCheckin,
    onGuestCheckout,
    onUpdateStatus,
    onSearchRoomBillByRoomAndBooking,
  })
)(Room);