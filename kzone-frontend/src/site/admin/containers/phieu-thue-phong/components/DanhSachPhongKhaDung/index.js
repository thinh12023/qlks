import React, {
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { connect } from "react-redux";
import {
  Form,
  DatePicker,
} from "antd";
import { Main } from "./styled";
import moment from "moment";
const { RangePicker } = DatePicker;

function DanhSachPhongKhaDung({
  onSearchAvailableByDate,
  onSearchRoomType,
  dsRoomType,
  filterOption,
  dsPhong,
  dsLoaiPhong,
  dsPhongDangKy,
  dsFloor,
  updateData,
  ...props
}, ref) {
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}) => {
      setState({
        show: true,
      });
      props.form.resetFields();
    },
  }));
  const onChangeDate = (dates, dateStrings) => {
    setState({
      fromDate: moment(dates[0]).format("YYYY-MM-DD"),
      toDate: moment(dates[1]).format("YYYY-MM-DD"),
    })
  }
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {

        }
      });
    } else setState({ show: false });
  };
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
    if (state.fromDate && state.toDate) {
      onSearchAvailableByDate({
        checkinDate: state.fromDate,
        checkoutDate: state.toDate,
      })
        .then(s => {
          let dsRoomBooking = dsFloor?.map((floor) => {
            let item = { floor };
            let rooms = s?.filter(
              room => room?.idFloor == floor?.id
            );
            rooms = rooms?.map(k => {
              const roomType = dsLoaiPhong?.find(i => i?.id == k?.idRoomType);
              k.roomType = roomType;
              return k;
            })
            item.rooms = rooms;
            return item;
          });
          setState({ dsRoomBooking });
        });
    }
  }, [state.fromDate, state.toDate]);
  useEffect(() => {
    if (state.show) {
      onSearchRoomType({ dataSearch: { size: 99, page: 1 } });
    }
  }, [state.show]);
  return (
    <Main
      visible={state.show}
      style={{ maxWidth: 700 }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <RangePicker
        format={"DD / MM / YYYY"}
        style={{ width: "50%", marginBottom: 30 }}
        placeholder={["Ngày checkin", "Ngày checkout"]}
        onChange={onChangeDate}
      />
      {state.dsRoomBooking?.map((item, index) => (
        <div
          className="_row"
          key={`col${index}`}
        >
          <div className="floor">
            {item?.floor?.name}
          </div>
          <div className="rooms">
            {item?.rooms?.map((room, i) => (
              <div className="info"
                onClick={changeBookRoom(room)}
                key={`col${i}`}
              >
                <div className="title">
                  {room?.name}
                </div>
                <div className="room-type">
                  {room?.roomType?.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Main>
  );
}
export default Form.create({})(
  connect(
    (state) => ({
      dsPhong: state.phong.dsPhong || [],
      dsFloor: state.floor.dsFloor || [],
      dsLoaiPhong: state.loaiPhong.dsLoaiPhong || [],
      dsPhongDangKy: state.phieuThuePhong.dsPhongDangKy || [],
    }),
    ({
      phieuThuePhong: {
        updateData,
      },
      phong: {
        onSearchAvailableByDate,
        onSearch: onSearchPhong,
      },
      loaiPhong: {
        onSearch: onSearchRoomType,
      }
    }) => {
      return {
        updateData,
        onSearchAvailableByDate,
        onSearchPhong,
        onSearchRoomType,
      };
    },
    null,
    { forwardRef: true }
  )(forwardRef(DanhSachPhongKhaDung))
);