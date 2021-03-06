import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel, FilterBox } from "site/admin/components/admin";
import { Pagination, Table } from "site/admin/components/common";
import ModalAddTienIch from "site/admin/components/ModalAddTienIch";
import { Main } from "./styled";
import { HOST } from "client/request";
import {
  Input,
  Select,
  Button,
  Modal,
  Spin,
  Icon,
  Checkbox,
  message,
  Tooltip,
  Tag,
} from "antd";
import { STATUS } from "constant";

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

function Utility({
  total,
  size,
  page,
  sortType,
  isLoading,
  isLoadingCreate,
  dsTienIch,
  dsLoaiPhong,
  dsFloor,
  onSearchLoaiPhong,
  onSearchTienIch,
  onDeletePhong,
  onChangeInputSearch,
  onSearchFloor,
  ...props
}) {
  const refTimeOut = useRef(null);
  const refAddTienIch = useRef(null);
  const idTienIchs = dsTienIch.map((item) => item?.id);

  const [state, _setState] = useState({
    expandedRowKeys: new Set(),
    showCheckBox: false,
    selectedItem: [],
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
          [type]: value.trim(),
        });
      },
      300,
      e.target.value
    );
  };

  const onChangeSelect = (type) => (e) => {
    onChangeInputSearch({
      [type]: e && e.target ? e.target.value : e,
    });
  };

  const onChange = (type) => e => {
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? e._d
          : e
    })
  }

  const onChangePage = (page) => {
    onSearchTienIch({ page });
  };
  const onChangeSize = (size) => {
    onSearchTienIch({ size });
  };
  // function showConfirm(item) {
  //   confirm({
  //     title: "X??c nh???n",
  //     icon: <Icon type="delete" />,
  //     content: `B???n c?? mu???n x??a ph??ng ${item.numberRoom}`,
  //     okText: "?????ng ??",
  //     cancelText: "H???y b???",
  //     onOk() {
  //       onDeletePhong({ id: item.id });
  //     },
  //   });
  // }

  const onClickAction = ({ type = "add", payload = {} }) => (e) => {
    switch (type) {
      case "add":
        showModalAddRoom({}, false);
        break;
      // case "delete":
      //   showConfirm(payload);
      //   break;
      case "edit":
        showModalAddRoom(payload, false);
        break;
      case "view":
        // showHangHoaChiTiet(payload);
        break;
      default:
        break;
    }
  };

  // const onDeleteMultiple = () => {
  //   if (state.selectedItem.length > 0) {
  //     confirm({
  //       title: "X??c nh???n",
  //       icon: <Icon type="delete" />,
  //       content: `B???n c?? mu???n x??a ${state.selectedItem.length} danh m???c`,
  //       okText: "?????ng ??",
  //       cancelText: "H???y b???",
  //       onOk() {
  //         // props.onDeleteMultiple(state.selectedItem);
  //       },
  //     });
  //     return;
  //   }
  //   message.warning("B???n ch??a ch???n danh m???c s???n ph???m n??o");
  // };

  const showModalAddRoom = (payload, isReadOnly) => {
    if (refAddTienIch.current) {
      refAddTienIch.current.show(payload, isReadOnly);
    }
  };

  const filterOption = (input, option) => {
    return (
      (option.props.name || option.props.children)
        ?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
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
          (item, index) => !idTienIchs.includes(item)
        ),
      });
    } else {
      setState({
        selectedItem: [...state.selectedItem, ...idTienIchs].filter(
          (item, i, self) => item && self.indexOf(item) === i
        ),
      });
    }
  };

  useEffect(() => {
    onSearchTienIch({
      dataSearch: { active: "" }
    });
  }, []);

  return (
    <Main>
      <AdminPage>
        <Panel
          title="Qu???n l?? ti???n ??ch"
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              <div className="right-area">
                {/* <Select
                  style={{ minWidth: 100, marginRight: 10 }}
                  placeholder="Floor"
                  onChange={onChange("idFloor")}
                  value={state.idFloor}
                >
                  <Option key={`col${0}`} value="">T???t c???</Option>
                  {dsFloor?.map((floor, index) => (
                    <Option key={`op${index + 1}`} value={floor?.id}>
                      {floor?.name}
                    </Option>
                  ))}
                </Select> */}
                {/* {state.selectedItem.length > 0 && (
                  <Button
                    icon="delete"
                    type="danger"
                    onClick={onDeleteMultiple}
                  >
                    X??a d???ch v???
                  </Button>
                )} */}
                <Button icon="plus" type="primary" onClick={onClickAction({})}>
                  Th??m ti???n ??ch
                </Button>
              </div>
            </div>
          }
        >
          <div className="page-container">
            <div className="page-filter">
              {/* <FilterBox
                title="Lo???i ph??ng"
                showAddButton={false}
                showExpandButton={true}
              >
                <Select
                  placeholder="T??m ki???m lo???i ph??ng"
                  onChange={onChangeSelect("idRoomType")}
                >
                  <Option value="">===T???t c???===</Option>
                  {dsLoaiPhong?.map((t, index) => (
                    <Option key={index} value={t.id}>
                      {t.name}
                    </Option>
                  ))}
                </Select>
              </FilterBox> */}
              <FilterBox
                title="T??n ti???n ??ch"
                showExpandButton={true}
                showAddButton={false}
              >
                <Search
                  // value={state.search}
                  placeholder="T??m theo t??n ti???n ??ch"
                  onChange={onChangeInput("name")}
                />
              </FilterBox>
              <FilterBox
                title="Tr???ng th??i ti???n ??ch"
                showAddButton={false}
                showExpandButton={true}
              >
                <Select
                  placeholder="T??m ki???m theo tr???ng th??i"
                  onChange={onChangeSelect("active")}
                >
                  <Option value="">===T???t c???===</Option>
                  {STATUS?.map((s, index) => (
                    <Option key={index} value={s?.value}>
                      {s?.title}
                    </Option>
                  ))}
                </Select>
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
                                checked={idTienIchs?.every(
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
                        hidden: !state.showCheckBox,
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
                            <div className="title-box">T??n ti???n ??ch</div>
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
                            <div className="title-box">Tr???ng th??i</div>
                          </div>
                        ),
                        width: 150,
                        dataIndex: "active",
                        key: "2",
                        align: "center",
                        render: (value, item, index) => {
                          return (
                            <Tag color={value ? "green" : "volcano"}>{value ? "Active" : "Disable"}</Tag>
                          );
                        }
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">M?? t???</div>
                          </div>
                        ),
                        width: 150,
                        dataIndex: "desc",
                        key: "3",
                        align: "center",
                        render: (value, item, index) => {
                          return value;
                        }
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Icon</div>
                          </div>
                        ),
                        width: 150,
                        dataIndex: "image",
                        key: "4",
                        align: "center",
                        render: (value, item, index) => {
                          return <img
                            style={{
                              width: 20,
                              height: 20,
                              objectFit: "contain"
                            }}
                            src={HOST + `images/${value}`} />;
                        }
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Action</div>
                          </div>
                        ),
                        width: 150,
                        key: "7",
                        align: "center",
                        fixed: "right",
                        render: (value, item, index) => {
                          return (
                            <div className="list-action">
                              {/* <Tooltip title="Xem th??ng tin ph??ng"> */}
                              <Button
                                type="primary"
                                icon="eye"
                                size="small"
                                onClick={onClickAction({
                                  type: "view",
                                  payload: item,
                                })}
                              />
                              {/* </Tooltip> */}
                              {/* <Tooltip title="Ch???nh s???a th??ng tin ph??ng"> */}
                              <Button
                                type="primary"
                                icon="edit"
                                size="small"
                                onClick={onClickAction({
                                  type: "edit",
                                  payload: item,
                                })}
                              />
                              {/* </Tooltip> */}
                              {/* <Tooltip title="X??a th??ng tin ph??ng">
                                <Button
                                  type="primary"
                                  icon="delete"
                                  size="small"
                                  onClick={onClickAction({
                                    type: "delete",
                                    payload: item,
                                  })}
                                />
                              </Tooltip> */}
                            </div>
                          );
                        },
                      },
                    ]}
                    dataSource={dsTienIch}
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
          <ModalAddTienIch wrappedComponentRef={refAddTienIch} />
        </Panel>
      </AdminPage>
    </Main>
  );
}

export default connect(
  (state) => ({
    page: state.tienIch.page || 1,
    size: state.tienIch.size || 10,
    total: state.tienIch.total || 0,
    isLoading: state.tienIch.isLoading || false,
    isLoadingCreate: state.tienIch.isLoadingCreate || false,
    dsTienIch: state.tienIch.dsTienIch || [],
  }),
  ({
    tienIch: {
      onSearch: onSearchTienIch,
      onChangeInputSearch,
    },
  }) => {
    return {
      onSearchTienIch,
      onChangeInputSearch,
    };
  }
)(Utility);
