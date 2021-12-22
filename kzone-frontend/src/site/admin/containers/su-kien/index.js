import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel, FilterBox } from "site/admin/components/admin";
import { Pagination, Table } from "site/admin/components/common";
import { Main } from "./styled";
import { HOST } from "client/request";
import {
  Input,
  Button,
  Modal,
  Spin,
  Icon,
  Checkbox,
  message,
  Tooltip,
} from "antd";
const { Search } = Input;
const { confirm } = Modal;

function SuKien({
  isLoading,
  page,
  size,
  total,
  dsSuKien,
  onSearchSuKien,
  onChangeInputSearch,
  onDeleteSuKien,
  onSizeChange,
  ...props
}) {
  const refTimeOut = useRef(null);
  let idsSuKien = dsSuKien?.map((i) => i.id);
  const [state, _setState] = useState({
    selectedItem: [],
    showCheckBox: true,
    expandedRowKeys: new Set(),
  });

  console.log(page, size, total);

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
    onSearchSuKien({ page: page });
  };
  const onChangeSize = (size) => {
    onSizeChange({ size: size });
  };
  function showConfirm(item) {
    confirm({
      title: "Xác nhận",
      icon: <Icon type="delete" />,
      content: `Bạn có muốn xóa sự kiện ${item?.title}`,
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        onDeleteSuKien({ id: item.id });
      },
    });
  }

  const onClickAction = ({ type = "add", payload = {} }) => (e) => {
    switch (type) {
      case "add":
        if (props.history) {
          props.history.push("/admin/su-kien/tao-moi");
        } else window.location.href = "/admin/su-kien/tao-moi";
        break;
      case "delete":
        showConfirm(payload);
        break;
      case "edit":
        if (props.history)
          props.history.push(
            "/admin/su-kien/" + payload.id + "?mode=edit"
          );
        else
          window.location.href =
            "/admin/su-kien/" + payload.id + "?mode=edit";
        break;
      case "view":
        if (props.history)
          props.history.push(
            "/admin/su-kien/" + payload.id + "?mode=view"
          );
        else
          window.location.href =
            "/admin/su-kien/" + payload.id + "?mode=view";
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
          (item, index) => !idsSuKien.includes(item)
        ),
      });
    } else {
      setState({
        selectedItem: [...state.selectedItem, ...idsSuKien].filter(
          (item, i, self) => item && self.indexOf(item) === i
        ),
      });
    }
  };
  useEffect(() => {
    onSearchSuKien({});
  }, []);

  return (
    <Main>
      <AdminPage>
        <Panel
          title="Quản lý sự kiện"
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
                    placeholder={"Tìm kiếm theo tiêu đề"}
                    onChange={onChangeInput("title")}
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
                                checked={idsSuKien?.every(
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
                            <div className="title-box">Tiêu đề</div>
                          </div>
                        ),
                        width: 200,
                        dataIndex: "title",
                        key: "1",
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
                        key: "1",
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
                            <div className="title-box">Mô tả</div>
                          </div>
                        ),
                        width: 200,
                        dataIndex: "desc",
                        key: "2",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Nội dung</div>
                          </div>
                        ),
                        width: 300,
                        dataIndex: "content",
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
                        key: "11",
                        align: "center",
                        render: (value, item, index) => {
                          return (
                            <div className="list-action">
                              {/* <Tooltip title="Xem thông tin loại phòng">
                                <Button
                                  type="primary"
                                  icon="eye"
                                  size="small"
                                  onClick={onClickAction({
                                    type: "view",
                                    payload: item,
                                  })}
                                />
                              </Tooltip> */}
                              <Tooltip title="Chỉnh sửa thông tin sự kiện">
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
                              <Tooltip title="Xóa sự kiện">
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
                    dataSource={dsSuKien}
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
    page: state.suKien.page || 1,
    size: state.suKien.size || 10,
    total: state.suKien.total || 0,
    isLoading: state.suKien.isLoading || false,
    dsSuKien: state.suKien.dsSuKien || [],
  }),
  ({
    suKien: {
      onSearch: onSearchSuKien,
      onDelete: onDeleteSuKien,
      onChangeInputSearch,
      onSizeChange,
    }
  }) => {
    return {
      onSearchSuKien,
      onChangeInputSearch,
      onDeleteSuKien,
      onSizeChange,
    };
  }
)(SuKien);
