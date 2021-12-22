import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel, FilterBox } from "site/admin/components/admin";
import { Pagination, Table } from "site/admin/components/common";
import { Main } from "./styled";
import {
  Input,
  Button,
  Modal,
  Spin,
  Icon,
  Checkbox,
  message,
  Tooltip,
  Select,
} from "antd";
import { DS_, TRANG_THAI_THANH_TOAN } from "constant";
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

function RoomBill({
  isLoading,
  page,
  size,
  total,
  dsHoaDonThuePhong,
  onSearchHoaDonThuePhong,
  onChangeInputSearch,
  onDeleteHoaDonThuePhong,
  onSizeChange,
  ...props
}) {
  const refTimeOut = useRef(null);
  let idsHoaDonThuePhong = dsHoaDonThuePhong?.map((i) => i.id);
  const [state, _setState] = useState({
    selectedItem: [],
    showCheckBox: true,
    expandedRowKeys: new Set(),
  });

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
          [type]: value,
        });
        setState({ [type]: value });
      },
      300,
      e?.target ? e?.target?.value : e
    );
  };
  const onChangePage = (page) => {
    onSearchHoaDonThuePhong({ page: page });
  };
  const onChangeSize = (size) => {
    onSizeChange({ size: size });
  };
  function showConfirm(item) {
    confirm({
      title: "Xác nhận",
      icon: <Icon type="delete" />,
      content: `Bạn có muốn xóa hoá đơn ${item?.name}`,
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        onDeleteHoaDonThuePhong({ id: item.id });
      },
    });
  }

  const onClickAction = ({ type = "add", payload = {} }) => (e) => {
    switch (type) {
      case "add":
        if (props.history) {
          props.history.push("/admin/hoa-don-tra-phong/tao-moi");
        } else window.location.href = "/admin/hoa-don-tra-phong/tao-moi";
        break;
      case "delete":
        showConfirm(payload);
        break;
      case "edit":
        if (props.history)
          props.history.push(
            "/admin/hoa-don-tra-phong/" + payload.id + "?mode=edit"
          );
        else
          window.location.href =
            "/admin/hoa-don-tra-phong/" + payload.id + "?mode=edit";
        break;
      case "view":
        if (props.history)
          props.history.push(
            "/admin/hoa-don-tra-phong/" + payload.id + "?mode=view"
          );
        else
          window.location.href =
            "/admin/hoa-don-tra-phong/" + payload.id + "?mode=view";
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
          (item, index) => !idsHoaDonThuePhong.includes(item)
        ),
      });
    } else {
      setState({
        selectedItem: [...state.selectedItem, ...idsHoaDonThuePhong].filter(
          (item, i, self) => item && self.indexOf(item) === i
        ),
      });
    }
  };
  useEffect(() => {
    onSearchHoaDonThuePhong({});
  }, []);

  return (
    <Main>
      <AdminPage>
        <Panel
          title="Quản lý hóa đơn"
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              {/* <div className="right-area">
                <Button icon="plus" type="primary" onClick={onClickAction({})}>
                  Thêm mới
                </Button>
              </div> */}
            </div>
          }
        >
          <div className="page-container">
            <div className="page-filter">
              <FilterBox
                title="Tìm kiếm mã hóa đơn"
                showExpandButton={true}
                showAddButton={false}
              >
                <div className="filter-box">
                  <Search
                    placeholder={"Tìm kiếm theo mã hóa đơn"}
                    onChange={onChangeInput("code")}
                  />
                </div>
              </FilterBox>
              <FilterBox
                title="Tìm kiếm theo trạng thái hóa đơn"
                showExpandButton={true}
                showAddButton={false}
              >
                <div className="filter-box">
                  <Select
                    value={state.status}
                    onChange={onChangeInput("status")}
                  >
                    <Option key={0} value="">Tất cả</Option>
                    {TRANG_THAI_THANH_TOAN?.map((item, index) => (
                      <Option
                        key={index}
                        value={item?.value}
                      >
                        {item?.title}
                      </Option>
                    ))}
                  </Select>
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
                                checked={idsHoaDonThuePhong?.every(
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
                            <div className="title-box">Mã HĐ</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "code",
                        key: "1",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Trạng thái</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "status",
                        key: "01",
                        align: "center",
                        render: (value) => value == 0
                          ? "Đã thanh toán"
                          : value == 1
                            ? "Chưa thanh toán"
                            : "Công nợ"
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Phòng</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "room",
                        key: "0",
                        align: "center",
                        render: (value) => value?.name
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Loại thuê phòng</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "type",
                        key: "2",
                        align: "center",
                        render: (value) => {
                          const type = DS_?.find(i => i?.value == value);
                          return type?.title;
                        }
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Trả trước</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "deposit",
                        key: "3",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Hoàn lại</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "refund",
                        key: "4",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Phụ phí</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "surcharge",
                        key: "5",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Tổng tiền phòng</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "totalRoomPayment",
                        key: "6",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Tổng tiền dịch vụ</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "totalServicePayment",
                        key: "7",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Tổng tiền HĐ ký gửi</div>
                          </div>
                        ),
                        width: 150,
                        dataIndex: "totalConsignmentPayment",
                        key: "8",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Khách trả</div>
                          </div>
                        ),
                        width: 100,
                        dataIndex: "totalPayment",
                        key: "9",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Action</div>
                          </div>
                        ),
                        width: 150,
                        key: "11",
                        align: "center",
                        render: (value, item, index) => {
                          return (
                            <div className="list-action">
                              <Tooltip title="Xem thông tin loại phòng">
                                <Button
                                  type="primary"
                                  icon="eye"
                                  size="small"
                                  onClick={onClickAction({
                                    type: "view",
                                    payload: item,
                                  })}
                                />
                              </Tooltip>
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
                    dataSource={dsHoaDonThuePhong}
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
    page: state.hoaDonThuePhong.page || 1,
    size: state.hoaDonThuePhong.size || 10,
    total: state.hoaDonThuePhong.total || 0,
    isLoading: state.hoaDonThuePhong.isLoading || false,
    dsHoaDonThuePhong: state.hoaDonThuePhong.dsHoaDonThuePhong || [],
  }),
  ({
    hoaDonThuePhong: {
      onSearch: onSearchHoaDonThuePhong,
      onDelete: onDeleteHoaDonThuePhong,
      onChangeInputSearch,
      onSizeChange,
    }
  }) => {
    return {
      onSearchHoaDonThuePhong,
      onChangeInputSearch,
      onDeleteHoaDonThuePhong,
      onSizeChange,
    };
  }
)(RoomBill);
