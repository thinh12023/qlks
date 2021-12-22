import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Pagination, Table } from "site/admin/components/common";
import ModalAddService from "site/admin/components/ModalAddService";
import {
  Button,
  Tooltip,
  Modal,
  Icon,
} from "antd";
import { Main } from "./styled";
import { HOST } from "client/request";
const { confirm } = Modal;

const DichVu = ({
  dsDichVu,
  page,
  size,
  total,
  isLoading,
  isLoadingCreate,
  onDeleteDichVu,
  ...props
}) => {
  const refAddDichVu = useRef(null);
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const showConfirm = (item) => {
    confirm({
      title: "Xác nhận",
      icon: <Icon type="delete" />,
      content: `Bạn có muốn xóa dich vụ  ${item?.name}`,
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        onDeleteDichVu({ id: item.id });
      },
    });
  }
  const showModalAddDichVu = (item, isReadOnly) => {
    if (refAddDichVu.current) {
      refAddDichVu.current.show(item, isReadOnly);
    }
  }
  const onClickAction = ({ type = "add", payload = {} }) => (e) => {
    switch (type) {
      case "delete":
        showConfirm(payload);
        break;
      case "edit":
        showModalAddDichVu(payload, false);
        break;
      case "view":
        // showHangHoaChiTiet(payload);
        break;
      default:
        break;
    }
  };
  return (
    <Main>
      <Table
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
        scroll={{ x: 800, y: "calc(100vh - 355px)" }}
        className="custom"
        rowKey="key"
        columns={[
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Tên dịch vụ</div>
              </div>
            ),
            width: 150,
            dataIndex: "name",
            key: "1",
            align: "center",
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Giá dịch vụ</div>
              </div>
            ),
            width: 150,
            dataIndex: "price",
            key: "3",
            align: "center",
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Ảnh</div>
              </div>
            ),
            width: 200,
            dataIndex: "image",
            key: "4",
            align: "center",
            render: (value) => (
              <img
                src={`${HOST}images/${value}`}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "contain"
                }}
              />
            )
          },
          {
            title: (
              <div className="custome-header">
                <div className="title-box">Action</div>
              </div>
            ),
            width: 150,
            key: "6",
            align: "center",
            fixed: "right",
            render: (value, item, index) => {
              return (
                <div className="list-action">
                  <Tooltip title="Xem thông tin dịch vụ">
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
                  <Tooltip title="Chỉnh sửa thông tin dịch vụ">
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
                  <Tooltip title="Xóa thông tin dịch vụ">
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
        dataSource={dsDichVu}
      />
      <div className="footer">
        {/* {total > 0 && (
          <Pagination
            onPageChange={onChangePage}
            onChangeSize={onChangeSize}
            page={page}
            size={size}
            total={total}
            style={{ justifyContent: "flex-end" }}
          />
        )} */}
      </div>
      <ModalAddService wrappedComponentRef={refAddDichVu} />
    </Main>
  );
}

export default connect(
  (state) => ({
    isLoadingCreate: state.dichVu.isLoadingCreate || false,
    isLoading: state.dichVu.isLoading || false,
    page: state.dichVu.page || 1,
    size: state.dichVu.size || 10,
    total: state.dichVu.total || 0,
    dsDichVu: state.dichVu.dsDichVu || [],
  }),
  ({
    dichVu: {
      onDelete: onDeleteDichVu,
    }
  }) => ({
    onDeleteDichVu,
  })
)(DichVu);