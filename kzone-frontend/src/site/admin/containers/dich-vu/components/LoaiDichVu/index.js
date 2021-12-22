import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Pagination, Table } from "site/admin/components/common";
import ModalAddServiceType from "site/admin/components/ModalAddServiceType";
import {
  Button,
  Tooltip,
  Modal,
  Icon,
} from "antd";
import { Main } from "./styled";
const { confirm } = Modal;

function LoaiDichVu({
  page,
  size,
  total,
  isLoading,
  isLoadingCreate,
  dsLoaiDichVu,
  onDeleteLoaiDichVu,
  ...props
}) {
  const refAddLoaiDichVu = useRef(null)
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const showModalAddLoaiDichVu = (item, isReadOnly) => {
    if (refAddLoaiDichVu.current) {
      refAddLoaiDichVu.current.show(item, isReadOnly);
    }
  }
  const showConfirm = (item) => {
    confirm({
      title: "Xác nhận",
      icon: <Icon type="delete" />,
      content: `Bạn có muốn xóa loại dich vụ  ${item?.name}`,
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        onDeleteLoaiDichVu({ id: item.id });
      },
    });
  }
  const onClickAction = ({ type = "add", payload = {} }) => (e) => {
    switch (type) {
      case "delete":
        showConfirm(payload);
        break;
      case "edit":
        showModalAddLoaiDichVu(payload, false);
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
                <div className="title-box">Tên loại dịch vụ</div>
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
                <div className="title-box">Ghi chú</div>
              </div>
            ),
            width: 150,
            dataIndex: "note",
            key: "3",
            align: "center",
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
        dataSource={dsLoaiDichVu}
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
      <ModalAddServiceType wrappedComponentRef={refAddLoaiDichVu} />
    </Main>
  );
}

export default connect(
  (state) => ({
    isLoadingCreate: state.loaiDichVu.isLoadingCreate || false,
    isLoading: state.loaiDichVu.isLoading || false,
    page: state.loaiDichVu.page || 1,
    size: state.loaiDichVu.size || 10,
    total: state.loaiDichVu.total || 0,
    dsLoaiDichVu: state.loaiDichVu.dsLoaiDichVu || [],
  }),
  ({
    loaiDichVu: {
      onDelete: onDeleteLoaiDichVu,
    }
  }) => ({
    onDeleteLoaiDichVu,
  })
)(LoaiDichVu);