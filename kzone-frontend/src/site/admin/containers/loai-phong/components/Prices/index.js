import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Table } from "site/admin/components/common";
import moment from "moment";
import { InputNumber, Button, Row, Col, Select } from "antd";
import { Main } from "./styled";
import {
  TYPE_EARLY_BY_DAY,
  TYPE_EARLY_BY_HOUR,
  TYPE_HOURLY,
  TYPE_OVERTIME_BY_DAY,
  TYPE_OVERTIME_BY_HOUR,
} from "constant";
const { Option } = Select;

function Prices({
  filterOption,
  title,
  dsGiaTheoGio,
  dsPhuTroCheckinSomQuaDem,
  dsPhuTroCheckinSomTheoNgay,
  dsPhuTroCheckoutMuonQuaDem,
  dsPhuTroCheckoutMuonTheoNgay,
  currentItem,
  updateData,
  ...props
}) {
  const [state, _setState] = useState({});
  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const OptionItems = useMemo(() => {
    let items = [];
    for (let i = 1; i < 24; i++) {
      let item = <Option value={i} index={`item${i}`} >{i} h</Option>
      items.push(item);
    }
    return items;
  }, []);

  useEffect(() => {
    //TODO: update state with current item
    let newState = {};
    if (mode == "view") {
      newState.isReadOnly = true;
    }
    setState(newState);
  }, [currentItem]);

  const onAddPrice = (type) => e => {
    switch (type) {
      case "OVERTIME_CHECKOUT_BY_DAY":
        dsPhuTroCheckoutMuonTheoNgay = [
          ...dsPhuTroCheckoutMuonTheoNgay,
          {
            key: dsPhuTroCheckoutMuonTheoNgay?.length,
            number: 1,
            rate: 0,
            type: TYPE_OVERTIME_BY_DAY,
          }
        ];
        updateData({ dsPhuTroCheckoutMuonTheoNgay });
        break;
      case "OVERTIME_CHECKOUT_OVERNIGHT":
        dsPhuTroCheckoutMuonQuaDem = [
          ...dsPhuTroCheckoutMuonQuaDem,
          {
            key: dsPhuTroCheckoutMuonQuaDem?.length,
            number: 1,
            rate: 0,
            type: TYPE_OVERTIME_BY_HOUR,
          }
        ];
        updateData({ dsPhuTroCheckoutMuonQuaDem });
        break;
      case "EARLY_CHECKIN_BY_DAY":
        dsPhuTroCheckinSomTheoNgay = [
          ...dsPhuTroCheckinSomTheoNgay,
          {
            key: dsPhuTroCheckinSomTheoNgay?.length,
            number: 1,
            rate: 0,
            type: TYPE_EARLY_BY_DAY,
          }
        ];
        updateData({ dsPhuTroCheckinSomTheoNgay });
        break;
      case "EARLY_CHECKIN_OVERNIGHT":
        dsPhuTroCheckinSomQuaDem = [
          ...dsPhuTroCheckinSomQuaDem,
          {
            key: dsPhuTroCheckinSomQuaDem?.length,
            number: 1,
            rate: 0,
            type: TYPE_EARLY_BY_HOUR,
          }
        ];
        updateData({ dsPhuTroCheckinSomQuaDem });
        break;
      case "HOURLY_RATE":
        dsGiaTheoGio = [
          ...dsGiaTheoGio,
          {
            key: dsGiaTheoGio?.length,
            number: 1,
            rate: 0,
            type: TYPE_HOURLY,
          }
        ];
        updateData({ dsGiaTheoGio });
        break;
      default:
        break;
    }
  }

  const onRemovePrice = (item, type) => e => {
    let ds = [];
    switch (type) {
      case TYPE_EARLY_BY_DAY:
        ds = dsPhuTroCheckinSomTheoNgay.filter(i => i.key != item.key);
        ds = ds.map((i, index) => ({
          ...i,
          key: index,
        }));
        updateData({ dsPhuTroCheckinSomTheoNgay: ds });
        break;
      case TYPE_EARLY_BY_HOUR:
        ds = dsPhuTroCheckinSomQuaDem.filter(i => i.key != item.key);
        ds = ds.map((i, index) => ({
          ...i,
          key: index,
        }));
        updateData({ dsPhuTroCheckinSomQuaDem: ds });
        break;
      case TYPE_OVERTIME_BY_DAY:
        ds = dsPhuTroCheckoutMuonTheoNgay.filter(i => i.key != item.key);
        ds = ds.map((i, index) => ({
          ...i,
          key: index,
        }));
        updateData({ dsPhuTroCheckoutMuonTheoNgay: ds });
        break;
      case TYPE_OVERTIME_BY_HOUR:
        ds = dsPhuTroCheckoutMuonQuaDem.filter(i => i.key != item.key);
        ds = ds.map((i, index) => ({
          ...i,
          key: index,
        }));
        updateData({ dsPhuTroCheckoutMuonQuaDem: ds });
        break;
      case TYPE_HOURLY:
        ds = dsGiaTheoGio.filter(i => i.key != item.key);
        ds = ds.map((i, index) => ({
          ...i,
          key: index,
        }));
        updateData({ dsGiaTheoGio: ds });
        break;
      default:
        break;
    }
  }

  const onUpdatePrice = (item, type, field) => e => {
    let dsMoi = [];
    const value = e?.hasOwnProperty("target")
      ? e.target.value
      : e?.hasOwnProperty("_d")
        ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
        : e;
    switch (type) {
      case TYPE_EARLY_BY_DAY:
        dsMoi = dsPhuTroCheckinSomTheoNgay?.map((i, index) => {
          if (i.key == item.key) {
            i[field] = value;
          }
          return i;
        });
        updateData({ dsPhuTroCheckinSomTheoNgay: dsMoi });
        break;
      case TYPE_EARLY_BY_HOUR:
        dsMoi = dsPhuTroCheckinSomQuaDem?.map((i, index) => {
          if (i.key == item.key) {
            i[field] = value;
          }
          return i;
        });
        updateData({ dsPhuTroCheckinSomQuaDem: dsMoi });
        break;
      case TYPE_OVERTIME_BY_DAY:
        dsMoi = dsPhuTroCheckoutMuonTheoNgay?.map((i, index) => {
          if (i.key == item.key) {
            i[field] = value;
          }
          return i;
        });
        updateData({ dsPhuTroCheckoutMuonTheoNgay: dsMoi });
        break;
      case TYPE_OVERTIME_BY_HOUR:
        dsMoi = dsPhuTroCheckoutMuonQuaDem?.map((i, index) => {
          if (i.key == item.key) {
            i[field] = value;
          }
          return i;
        });
        updateData({ dsPhuTroCheckoutMuonQuaDem: dsMoi });
        break;
      case TYPE_HOURLY:
        dsMoi = dsGiaTheoGio?.map((i, index) => {
          if (i.key == item.key) {
            i[field] = value;
          }
          return i;
        });
        updateData({ dsGiaTheoGio: dsMoi });
        break;
      default:
        break;
    }
  }

  return (
    <Main>
      <div className="title-p">{title}</div>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <div className="title">
            <b>Phụ trội quá giờ checkout(Theo ngày)</b>
            <Button
              type="primary"
              icon="plus"
              onClick={onAddPrice("OVERTIME_CHECKOUT_BY_DAY")}
            />
          </div>
          <Table
            className="custom"
            rowKey={"key"}
            columns={[
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Thời gian</div>
                  </div>
                ),
                width: 50,
                dataIndex: "number",
                align: "center",
                key: "col1",
                render: (value, item, index) => {
                  return (
                    <Select
                      showArrow={false}
                      value={value}
                      placeholder="Thời gian quá hạn"
                      onChange={onUpdatePrice(item, TYPE_OVERTIME_BY_DAY, "number")}
                    >
                      {[...OptionItems]}
                    </Select>
                  );
                }
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Giá phòng</div>
                  </div>
                ),
                width: 100,
                dataIndex: "rate",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <InputNumber
                      disabled={state.isReadOnly}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      value={value}
                      onChange={onUpdatePrice(item, TYPE_OVERTIME_BY_DAY, "rate")}
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
                width: 50,
                dataIndex: "key",
                align: "center",
                key: "col3",
                render: (value, item, index) => {
                  return (
                    <div className="list-action">
                      <Button
                        type="primary"
                        icon="delete"
                        onClick={onRemovePrice(item, TYPE_OVERTIME_BY_DAY)}
                      />
                    </div>
                  );
                }
              }
            ]}
            dataSource={dsPhuTroCheckoutMuonTheoNgay}
          />
        </Col>
        <Col span={24}>
          <div className="title">
            <b>Phụ trội checkin sớm(Theo ngày)</b>
            <Button
              type="primary"
              icon="plus"
              onClick={onAddPrice("EARLY_CHECKIN_BY_DAY")}
            />
          </div>
          <Table
            // scroll={{ x: 800, y: 500 }}
            className="custom"
            rowKey={"key"}
            columns={[
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Thời gian</div>
                  </div>
                ),
                width: 50,
                dataIndex: "number",
                align: "center",
                key: "col1",
                render: (value, item, index) => {
                  return (
                    <Select
                      showArrow={false}
                      value={value}
                      placeholder="Thời gian quá hạn"
                      onChange={onUpdatePrice(item, TYPE_EARLY_BY_DAY, "number")}
                    >
                      {[...OptionItems]}
                    </Select>
                  );
                }
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Giá phòng</div>
                  </div>
                ),
                width: 100,
                dataIndex: "rate",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <InputNumber
                      disabled={state.isReadOnly}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      value={value}
                      onChange={onUpdatePrice(item, TYPE_EARLY_BY_DAY, "rate")}
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
                width: 50,
                dataIndex: "",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <div className="list-action">
                      <Button
                        type="primary"
                        icon="delete"
                        onClick={onRemovePrice(item, TYPE_EARLY_BY_DAY)}
                      />
                    </div>
                  );
                }
              }
            ]}
            dataSource={dsPhuTroCheckinSomTheoNgay}
          />
        </Col>
        <Col span={24}>
          <div className="title">
            <b>Phụ trội quá giờ checkout(Qua đêm)</b>
            <Button
              type="primary"
              icon="plus"
              onClick={onAddPrice("OVERTIME_CHECKOUT_OVERNIGHT")}
            />
          </div>
          <Table
            // scroll={{ x: 800, y: 500 }}
            className="custom"
            rowKey={"key"}
            columns={[
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Thời gian</div>
                  </div>
                ),
                width: 50,
                dataIndex: "number",
                align: "center",
                key: "col1",
                render: (value, item, index) => {
                  return (
                    <Select
                      showArrow={false}
                      value={value}
                      placeholder="Thời gian quá hạn"
                      onChange={onUpdatePrice(item, TYPE_OVERTIME_BY_HOUR, "number")}
                    >
                      {[...OptionItems]}
                    </Select>
                  );
                }
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Giá phòng</div>
                  </div>
                ),
                width: 100,
                dataIndex: "rate",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <InputNumber
                      disabled={state.isReadOnly}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      value={value}
                      onChange={onUpdatePrice(item, TYPE_OVERTIME_BY_HOUR, "rate")}
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
                width: 50,
                dataIndex: "",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <div className="list-action">
                      <Button
                        type="primary"
                        icon="delete"
                        onClick={onRemovePrice(item, TYPE_OVERTIME_BY_HOUR)}
                      />
                    </div>
                  );
                }
              }
            ]}
            dataSource={dsPhuTroCheckoutMuonQuaDem}
          />
        </Col>
        <Col span={24}>
          <div className="title">
            <b>Phụ trội checkin sớm(Qua đêm)</b>
            <Button
              type="primary"
              icon="plus"
              onClick={onAddPrice("EARLY_CHECKIN_OVERNIGHT")}
            />
          </div>
          <Table
            // scroll={{ x: 800, y: 500 }}
            className="custom"
            rowKey={"key"}
            columns={[
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Thời gian</div>
                  </div>
                ),
                width: 50,
                dataIndex: "number",
                align: "center",
                key: "col1",
                render: (value, item, index) => {
                  return (
                    <Select
                      showArrow={false}
                      value={value}
                      placeholder="Thời gian quá hạn"
                      onChange={onUpdatePrice(item, TYPE_EARLY_BY_HOUR, "number")}
                    >
                      {[...OptionItems]}
                    </Select>
                  );
                }
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Giá phòng</div>
                  </div>
                ),
                width: 100,
                dataIndex: "rate",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <InputNumber
                      disabled={state.isReadOnly}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      value={value}
                      onChange={onUpdatePrice(item, TYPE_EARLY_BY_HOUR, "rate")}
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
                width: 50,
                dataIndex: "",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <div className="list-action">
                      <Button
                        type="primary"
                        icon="delete"
                        onClick={onRemovePrice(item, TYPE_EARLY_BY_HOUR)}
                      />
                    </div>
                  );
                }
              }
            ]}
            dataSource={dsPhuTroCheckinSomQuaDem}
          />
        </Col>
        {/* <Col span={12}>
          <div className="title">
            <b>Giá theo giờ</b>
            <Button
              type="primary"
              icon="plus"
              onClick={onAddPrice("HOURLY_RATE")}
            />
          </div>
          <Table
            // scroll={{ x: 800, y: 500 }}
            className="custom"
            rowKey={"key"}
            columns={[
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Thời gian</div>
                  </div>
                ),
                width: 50,
                dataIndex: "number",
                align: "center",
                key: "col1",
                render: (value, item, index) => {
                  return (
                    <Select
                      showArrow={false}
                      value={value}
                      placeholder="Thời gian quá hạn"
                      onChange={onUpdatePrice(item, TYPE_HOURLY, "number")}
                    >
                      {[...OptionItems]}
                    </Select>
                  );
                }
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Giá phòng</div>
                  </div>
                ),
                width: 100,
                dataIndex: "rate",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <InputNumber
                      disabled={state.isReadOnly}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      value={value}
                      onChange={onUpdatePrice(item, TYPE_HOURLY, "rate")}
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
                width: 50,
                dataIndex: "",
                align: "center",
                key: "col2",
                render: (value, item, index) => {
                  return (
                    <div className="list-action">
                      <Button
                        type="primary"
                        icon="delete"
                        onClick={onRemovePrice(item, TYPE_HOURLY)}
                      />
                    </div>
                  );
                }
              }
            ]}
            dataSource={dsGiaTheoGio}
          />
        </Col> */}
      </Row>
    </Main>
  );
}
export default connect(
  (state) => ({
    dsPhuTroCheckinSomTheoNgay: state.loaiPhong.dsPhuTroCheckinSomTheoNgay || [],
    dsPhuTroCheckoutMuonTheoNgay: state.loaiPhong.dsPhuTroCheckoutMuonTheoNgay || [],
    dsPhuTroCheckinSomQuaDem: state.loaiPhong.dsPhuTroCheckinSomQuaDem || [],
    dsPhuTroCheckoutMuonQuaDem: state.loaiPhong.dsPhuTroCheckoutMuonQuaDem || [],
    dsGiaTheoGio: state.loaiPhong.dsGiaTheoGio || [],
    currentItem: state.loaiPhong.currentItem,
  }),
  ({
    loaiPhong: {
      updateData,
    }
  }) => {
    return {
      updateData,
    };
  }
)(Prices);
