import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel, FilterBox } from "site/admin/components/admin";
import { Pagination, Table } from "site/admin/components/common";
import { Main } from "./styled";
import { getTienPhongChiTiet } from "utils/common";
import {
  Input,
  Button,
  Modal,
  Spin,
  Icon,
  Checkbox,
  Tooltip,
  Select,
  Tag,
} from "antd";
import moment from "moment";
import { TRANG_THAI_PHIEU_S, TRANG_THAI_HOA_DON, TRANG_THAI_PHIEU } from "constant";
import { useHistory } from "react-router";
const { Search } = Input;
const { confirm } = Modal;
const { Option } = Select;

function PhieuThuePhong({
  isLoading,
  page,
  size,
  total,
  dsPhieuThuePhong,
  onSearchPhieuThuePhong,
  onChangeInputSearch,
  onDeletePhieuThuePhong,
  onGuestCheckin,
  onGuestCheckout,
  updateData,
  onSizeChange,
  ...props
}) {
  const refTimeOut = useRef(null);
  const refConfirmBooking = useRef(null);
  let idsPhieuThuePhong = dsPhieuThuePhong?.map((i) => i.id);
  const [state, _setState] = useState({
    selectedItem: [],
    showCheckBox: true,
    expandedRowKeys: new Set(),
  });
  const { push } = useHistory();
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const onChangeInput = (type) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (value) => {
        onChangeInputSearch({
          [type]: value.trim(),
        });
      },
      300,
      e.target.value
    );
  };
  const onChangePage = (page) => {
    onSearchPhieuThuePhong({ page: page });
  };
  const onChangeSize = (size) => {
    onSizeChange({ size: size });
  };
  function showConfirm(item) {
    confirm({
      title: "Xác nhận",
      icon: <Icon type="delete" />,
      content: `Bạn có muốn xóa phiếu thuê ${item?.code}`,
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        onDeletePhieuThuePhong({ id: item.id });
      },
    });
  }

  const showModalConfirmBooking = (payload) => {
    if (refConfirmBooking.current) {
      refConfirmBooking.current.show(payload);
    }
  }

  const onClickAction = ({ type = "add", payload = {} }) => (e) => {
    switch (type) {
      case "check":
        showModalConfirmBooking(payload);
        break;
      case "add":
        if (props.history) {
          props.history.push("/admin/phieu-thue-phong/tao-moi");
        } else window.location.href = "/admin/phieu-thue-phong/tao-moi";
        break;
      case "delete":
        showConfirm(payload);
        break;
      case "edit":
        if (props.history)
          props.history.push(
            "/admin/phieu-thue-phong/" + payload.id + "?mode=edit"
          );
        else
          window.location.href =
            "/admin/phieu-thue-phong/" + payload.id + "?mode=edit";
        break;
      case "checkin":
        confirm({
          title: "Xác nhận",
          icon: <Icon type="question" />,
          content: `Bạn có muốn checkin cho phiếu ${payload?.code}`,
          okText: "Đồng ý",
          cancelText: "Hủy bỏ",
          onOk() {
            const data = {
              id: payload?.id,
              checkinDate: moment().format("YYYY-MM-DD"),
              checkinTime: moment().format("HH:mm:ss"),
            };
            onGuestCheckin(data)
              .then(s => push("/admin"))
              .catch(e => push("/admin"));
          },
        });
        break;
      case "checkout":
        confirm({
          title: "Xác nhận",
          icon: <Icon type="question" />,
          content: `Bạn có muốn checkout cho phiếu ${payload?.code}`,
          okText: "Đồng ý",
          cancelText: "Hủy bỏ",
          onOk() {
            const data = {
              id: payload?.id,
              checkoutDate: moment().format("YYYY-MM-DD"),
              checkoutTime: moment().format("HH:mm:ss"),
            };
            onGuestCheckout(data)
              .then(data => {
                const { booking, receipts, roomBookings, serviceBills, roomBills } = data;
                let dsHoaDonPhong = [], totalMoney = 0, refund = 0, totalPayment = 0;
                //TODO: tinh tien tra truoc
                let deposit = receipts?.reduce((acc, item) => {
                  acc = parseFloat(acc) + parseFloat(item?.totalMoney);
                  return acc;
                }, 0);
                //TODO: tinh tien dich vu
                let totalServicePayment = serviceBills?.reduce((acc, item) => {
                  acc = parseFloat(acc) + parseFloat(item?.totalPayment);
                  return acc;
                }, 0);
                //TODO: tao hoa don
                roomBookings?.forEach((item, index) => {
                  const { ds, total } = getTienPhongChiTiet({
                    type: booking?.type,
                    payload: {
                      checkinDate: item?.checkinDate,
                      checkinTime: item?.checkinTime,
                      checkoutDate: item?.checkoutDate,
                      checkoutTime: item?.checkoutTime,
                      hourlyRate: item?.roomType?.hourlyRate,
                      overnightRate: item?.roomType?.overnightRate,
                      dailyRate: item?.roomType?.dailyRate,
                      prices: item?.roomType?.prices,
                      nameOfRoom: item?.room?.name,
                    }
                  });
                  const hoaDon = {
                    type: booking.type,
                    status: TRANG_THAI_HOA_DON.CHUA_THANH_TOAN,
                    checkinDate: item?.checkinDate,
                    checkinTime: item?.checkinTime,
                    checkoutDate: item?.checkoutDate,
                    checkoutTime: item?.checkoutTime,
                    deposit: 0,
                    refund: 0,
                    surcharge: 0,
                    discount: 0,
                    totalRoomPayment: total,
                    roomBillDetail: ds,
                    totalServicePayment: 0,
                    totalConsignmentPayment: 0,
                    totalPayment: 0,
                    idRoom: item?.room?.id || item?.idRoom,
                    idBooking: booking?.id || item?.idBooking,
                    idConsignmentBill: null,
                    idDebt: null,
                    idGuest: booking?.idGuest,
                    idTravelAgency: booking?.idTravelAgency,
                  };
                  dsHoaDonPhong.push(hoaDon);
                });
                let currentItem = dsHoaDonPhong.shift();
                let totalConsignmentPayment = dsHoaDonPhong?.reduce((acc, item) => {
                  acc = parseFloat(acc) + parseFloat(item?.totalRoomPayment);
                  return acc;
                }, 0);
                dsHoaDonPhong = dsHoaDonPhong?.map(item => ({
                  ...item,
                  totalPayment: item?.totalRoomPayment,
                }))
                if (roomBills && roomBills.length > 0) {
                  totalConsignmentPayment = roomBills?.reduce((acc, item) => {
                    acc = parseFloat(acc) + item?.totalPayment;
                    return acc;
                  });
                  dsHoaDonPhong = [
                    ...dsHoaDonPhong,
                    ...roomBills,
                  ]
                }
                totalMoney = currentItem?.totalRoomPayment
                  + totalConsignmentPayment
                  + totalServicePayment
                  + currentItem?.surcharge
                  - currentItem?.discount;
                if (totalMoney > deposit) {
                  refund = 0;
                  totalPayment = totalMoney - deposit;
                }
                else if (totalMoney < deposit) {
                  refund = deposit - totalMoney;
                  totalPayment = 0;
                }
                else if (totalMoney == deposit) {
                  refund = 0;
                  totalPayment = 0;
                }
                currentItem = {
                  ...currentItem,
                  totalConsignmentPayment,
                  totalServicePayment,
                  deposit,
                  totalMoney,
                  totalPayment,
                  totalMoney,
                  refund,
                };
                updateData({
                  dsHoaDonPhong,
                  currentItem,
                  dsHoaDonDichVu: serviceBills,
                  typeOfBooking: booking?.type
                });
                push("/admin/hoa-don-tra-phong/tao-moi");
              })
              .catch(e => push("/admin"));
          },
        });
        break;
      default:
        break;
    }
  };
  const onChangeCheckBox = (value) => () => {
    const index = state.selectedItem.indexOf(value);
    if (index != -1) {
      state.selectedItem.splice(index, 1);
      setState({
        selectedItem: [...state.selectedItem],
      });
    } else {
      setState({
        selectedItem: [...state.selectedItem, value],
      });
    }
  };
  const showCheckBox = () => {
    setState({
      showCheckBox: !state.showCheckBox,
      selectedItem: [],
    });
  };
  const onRow = (record, rowIndex) => {
    return {
      onDoubleClick: (event) => {
        showCheckBox();
      },
    };
  };
  const onChangeCheckBoxAll = (e) => {
    if (!e?.target?.checked) {
      setState({
        selectedItem: state.selectedItem.filter(
          (item, index) => !idsPhieuThuePhong.includes(item)
        ),
      });
    } else {
      setState({
        selectedItem: [...state.selectedItem, ...idsPhieuThuePhong].filter(
          (item, i, self) => item && self.indexOf(item) === i
        ),
      });
    }
  };
  useEffect(() => {
    onSearchPhieuThuePhong({});
  }, []);

  return (
    <Main>
      <AdminPage>
        <Panel
          title="Quản lý phiếu thuê phòng"
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              <div className="right-area">
                <Button icon="plus" type="primary" onClick={onClickAction({})}>
                  Thêm mới
                </Button>
              </div>
            </div>
          }
        >
          <div className="page-container">
            <div className="page-filter">
              <FilterBox
                title="Tìm kiếm"
                showExpandButton={true}
                showAddButton={false}
              >
                <div className="filter-box">
                  <Search
                    placeholder={"Tìm kiếm theo số điện thoại khách hàng"}
                    onChange={onChangeInput("phone")}
                  />
                </div>
              </FilterBox>
            </div>
            <div className="page-main">
              <div className="fixed">
                <Spin spinning={isLoading}>
                  <Table
                    expandIconAsCell={false}
                    expandIconColumnIndex={-1}
                    rowClassName={(record, index) =>
                      state.expandedRowKeys.has(record?.key)
                        ? "table-row-selected"
                        : index % 2 === 0
                          ? "table-row-light"
                          : "table-row-dark"
                    }
                    onRow={onRow}
                    scroll={{ x: 800, y: "calc(100vh - 355px)" }}
                    className="custom"
                    rowKey="key"
                    columns={[
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">
                              <Checkbox
                                onChange={onChangeCheckBoxAll}
                                checked={idsPhieuThuePhong?.every(
                                  (item, index, self) =>
                                    state.selectedItem.includes(item)
                                )}
                              />
                            </div>
                          </div>
                        ),
                        width: 70,
                        dataIndex: "id",
                        key: "0",
                        align: "center",
                        hidden: state.showCheckBox,
                        render: (value, row, index) => {
                          return (
                            <Checkbox
                              onChange={onChangeCheckBox(value)}
                              checked={state.selectedItem.includes(value)}
                            />
                          );
                        },
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Mã phiếu</div>
                          </div>
                        ),
                        width: 80,
                        dataIndex: "code",
                        key: "1",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Khách hàng</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "guest",
                        key: "2",
                        align: "center",
                        render: (value, item, index) => value?.profile?.name,
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Trạng thái</div>
                          </div>
                        ),
                        width: 150,
                        dataIndex: "status",
                        key: "3",
                        align: "center",
                        render: (value, item, index) => {
                          return (
                            <Select
                              value={value}
                            >
                              {TRANG_THAI_PHIEU_S?.map((s, i) => (
                                <Option
                                  key={i}
                                  value={s?.value}
                                >
                                  {s?.title}
                                </Option>
                              ))}
                            </Select>
                          )
                        }
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Xác nhận</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "isConfirm",
                        key: "40",
                        align: "center",
                        render: (value, item, index) => value
                          ? (
                            <Tag color="green" >Xác nhận</Tag>
                          ) :
                          (
                            <Tag color="red" >Chưa xác nhận</Tag>
                          ),
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Loại đặt phòng</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "typeOfOrder",
                        key: "41",
                        align: "center",
                        render: (value, item, index) => value == 0 ? "Offline" : "Online",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Ngày vào</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "checkinDate",
                        key: "4",
                        align: "center",
                        render: (value, item, index) => moment(value).format("DD / MM / YYYY"),
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Thời gian vào</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "checkinTime",
                        key: "5",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Ngày ra</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "checkoutDate",
                        key: "6",
                        align: "center",
                        render: (value, item, index) => moment(value).format("DD / MM / YYYY"),
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Thời gian ra</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "checkoutTime",
                        key: "7",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Đoàn / Công ty</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "travelAgency",
                        key: "8",
                        align: "center",
                        render: (value, item, index) => value?.name,
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Action</div>
                          </div>
                        ),
                        width: 150,
                        key: "9",
                        align: "center",
                        render: (value, item, index) => {
                          // ( !item?.isConfirm ?
                          //   <Tooltip title="Xác nhận khách đặt online">
                          //     <Button
                          //       type="primary"
                          //       icon="check"
                          //       size="small"
                          //       onClick={onClickAction({
                          //         type: "check",
                          //         payload: item,
                          //       })}
                          //     />
                          //   </Tooltip>
                          // ) :
                          return (
                            <div className="list-action">
                              {item?.isConfirm
                                &&
                                item?.status != TRANG_THAI_PHIEU.DAT_PHONG
                                &&
                                item?.status != TRANG_THAI_PHIEU.TRA_PHONG
                                && (
                                  <Tooltip title="Khách trả phòng">
                                    <Button
                                      type="primary"
                                      icon="logout"
                                      size="small"
                                      onClick={onClickAction({
                                        type: "checkout",
                                        payload: item,
                                      })}
                                    />
                                  </Tooltip>
                                )}
                              {item?.isConfirm
                                &&
                                item?.status != TRANG_THAI_PHIEU.NHAN_PHONG
                                && (
                                  <Tooltip title="Khách nhận phòng">
                                    <Button
                                      type="primary"
                                      icon="login"
                                      size="small"
                                      onClick={onClickAction({
                                        type: "checkin",
                                        payload: item,
                                      })}
                                    />
                                  </Tooltip>
                                )}
                              <Tooltip title="Chỉnh sửa thông tin loại phòng">
                                <Button
                                  type="primary"
                                  icon="edit"
                                  size="small"
                                  onClick={onClickAction({
                                    type: "edit",
                                    payload: item,
                                  })}
                                />
                              </Tooltip>
                              <Tooltip title="Xóa thông tin loại phòng">
                                <Button
                                  type="primary"
                                  icon="delete"
                                  size="small"
                                  onClick={onClickAction({
                                    type: "delete",
                                    payload: item,
                                  })}
                                />
                              </Tooltip>
                            </div>
                          );
                        },
                      },
                    ]}
                    dataSource={dsPhieuThuePhong}
                  />
                  <div className="footer">
                    {total > 0 && (
                      <Pagination
                        onPageChange={onChangePage}
                        onChangeSize={onChangeSize}
                        page={page}
                        size={size}
                        total={total}
                        style={{ justifyContent: "flex-end" }}
                      />
                    )}
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </Panel>
      </AdminPage>
    </Main >
  );
}
export default connect(
  (state) => ({
    page: state.phieuThuePhong.page || 1,
    size: state.phieuThuePhong.size || 10,
    total: state.phieuThuePhong.total || 0,
    isLoading: state.phieuThuePhong.isLoading || false,
    dsPhieuThuePhong: state.phieuThuePhong.dsPhieuThuePhong || [],
  }),
  ({
    phieuThuePhong: {
      onSearch: onSearchPhieuThuePhong,
      onDelete: onDeletePhieuThuePhong,
      onChangeInputSearch,
      onSizeChange,
      onGuestCheckin,
      onGuestCheckout,
    },
    hoaDonThuePhong: {
      updateData,
    }
  }) => {
    return {
      onSearchPhieuThuePhong,
      onChangeInputSearch,
      onDeletePhieuThuePhong,
      onGuestCheckin,
      onGuestCheckout,
      onSizeChange,
      updateData,
    };
  }
)(PhieuThuePhong);
