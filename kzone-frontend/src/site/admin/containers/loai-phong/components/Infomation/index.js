import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
} from "antd";
import { Main } from "./styled";
import moment from "moment";
import { ROOM_DIRECTION } from "constant";

const { Option } = Select;

function Infomation({
  filterOption,
  title,
  currentItem,
  form,
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
  useEffect(() => {
    if (currentItem != null && (mode == "view" || mode == "edit")) {
      const item = currentItem;
      let newState = {
        show: true,
        id: item?.id,
        name: item?.name,
        numberOfBed: item?.numberOfBed,
        numberOfPerson: item?.numberOfPerson,
        dailyRate: item?.dailyRate,
        overnightRate: item?.overnightRate,
        monthlyRate: item?.monthlyRate,
        overGuestNumberRate: item?.overGuestNumberRate,
        hourlyRate: item?.hourlyRate,
        square: item?.square,
        direction: item?.direction,
      };
      if (mode == "view") {
        newState.isReadOnly = true;
      }
      setState(newState);
    }
  }, [currentItem]);
  useEffect(() => { }, []);

  const { getFieldDecorator } = form;

  return (
    <Main>
      <div className="title">{title}</div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập tên loại phòng!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên loại phòng!",
                },
              ],
              initialValue: state.name,
            })(
              <Input
                disabled={state.isReadOnly}
                placeholder="Tên loại phòng"
                onChange={onChange("name")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("numberOfBed", {
              rules: [
                {
                  required: true,
                  message: "Số giường không được để trống!",
                },
              ],
              initialValue: state.numberOfBed,
            })(
              <InputNumber
                min={1}
                disabled={state.isReadOnly}
                placeholder="Số giường"
                onChange={onChange("numberOfBed")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("numberOfPerson", {
              rules: [
                {
                  required: true,
                  message: "Số lượng khách không được để trống!",
                },
              ],
              initialValue: state.numberOfPerson,
            })(
              <InputNumber
                min={1}
                disabled={state.isReadOnly}
                placeholder="Số lượng khách"
                onChange={onChange("numberOfPerson")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("dailyRate", {
              rules: [
                {
                  required: true,
                  message: "Giá theo ngày không được để trống!",
                },
              ],
              initialValue: state.dailyRate,
            })(
              <InputNumber
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled={state.isReadOnly}
                placeholder="Giá theo ngày"
                onChange={onChange("dailyRate")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("overnightRate", {
              rules: [
                {
                  required: true,
                  message: "Giá qua đêm không được để trống!",
                },
              ],
              initialValue: state.overnightRate,
            })(
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
                disabled={state.isReadOnly}
                placeholder="Giá qua đêm"
                onChange={onChange("overnightRate")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("monthlyRate", {
              rules: [
                {
                  required: true,
                  message: "Giá theo tháng không được để trống!",
                },
              ],
              initialValue: state.monthlyRate,
            })(
              <InputNumber
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled={state.isReadOnly}
                placeholder="Giá theo tháng"
                onChange={onChange("monthlyRate")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("overGuestNumberRate", {
              rules: [
                {
                  required: true,
                  message: "Phụ trội quá số người ở không được để trống!",
                },
              ],
              initialValue: state.overGuestNumberRate,
            })(
              <InputNumber
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled={state.isReadOnly}
                placeholder="Phu trội quá số người ở (/người))"
                onChange={onChange("overGuestNumberRate")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("hourlyRate", {
              rules: [
                {
                  required: true,
                  message: "Giá theo giờ không được để trống!",
                },
              ],
              initialValue: state.hourlyRate,
            })(
              <InputNumber
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled={state.isReadOnly}
                placeholder="Giá theo giờ"
                onChange={onChange("hourlyRate")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("square", {
              rules: [
                {
                  required: true,
                  message: "Diện tích phòng không được để trống!",
                },
              ],
              initialValue: state.square,
            })(
              <InputNumber
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled={state.isReadOnly}
                placeholder="Diện tích phòng "
                onChange={onChange("square")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("direction", {
              rules: [
                {
                  required: true,
                  message: "Hướng phòng không được để trống!",
                },
              ],
              initialValue: state.direction,
            })(
              <Select
                disabled={state.isReadOnly}
                placeholder="Hướng phòng"
                onChange={onChange("direction")}
              >
                {ROOM_DIRECTION?.map((floor, index) => (
                  <Option key={index} value={floor.value}>
                    {floor?.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Main>
  );
}
export default connect(
  (state) => ({
    currentItem: state.loaiPhong.currentItem,
  }),
  ({

  }) => {
    return {
    };
  }
)(Infomation);
