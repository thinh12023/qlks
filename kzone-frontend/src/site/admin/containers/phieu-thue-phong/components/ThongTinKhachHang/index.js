import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
import { Main } from "./styled";
import moment from "moment";

const { Option } = Select;

function ThongTinKhachHang({
  filterOption,
  currentItem,
  form,
  ...props
}) {
  const [state, _setState] = useState({});
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
    let payload = {
      identifyNumber: currentItem?.guest?.identifyNumber,
      name: currentItem?.guest?.profile?.name,
      dob: moment(currentItem?.guest?.profile?.dob),
      phone: currentItem?.guest?.profile?.phone,
      email: currentItem?.guest?.profile?.email,
      address: currentItem?.guest?.profile?.address,
      gender: currentItem?.guest?.profile?.gender,
    }
    setState(payload);
  }, [currentItem]);

  useEffect(() => { }, []);

  const { getFieldDecorator } = form;

  return (
    <Main>
      <div className="title">Thông tin khách hàng</div>
      <div className="panelInfo">
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator("identifyNumber", {
                rules: [
                  {
                    required: false,
                    message: "Vui lòng nhập số căn cước công dân",
                  }
                ],
                initialValue: state.identifyNumber,
              })(
                <Input
                  placeholder="Số căn cước công dân"
                  onChange={onChange("identifyNumber")}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập tên khách hàng",
                  }
                ],
                initialValue: state.name,
              })(
                <Input
                  placeholder="Tên khách hàng"
                  onChange={onChange("name")}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator("dob", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập ngày sinh",
                  }
                ],
                initialValue: state.dob,
              })(
                <DatePicker
                  format="DD / MM / YYYY"
                  placeholder="Ngày sinh khách hàng"
                  onChange={onChange("dob")}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  }
                ],
                initialValue: state.email,
              })(
                <Input
                  placeholder="Email khách hàng"
                  onChange={onChange("email")}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator("phone", {
                rules: [],
                initialValue: state.phone,
              })(
                <Input
                  placeholder="Số điện thoại khách hàng"
                  onChange={onChange("phone")}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator("address", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  }
                ],
                initialValue: state.address,
              })(
                <Input
                  placeholder="Địa chỉ khách hàng"
                  onChange={onChange("address")}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator("gender", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính"
                  }
                ],
                initialValue: state.gender,
              })(
                <Select
                  placeholder="Giới tính"
                >
                  <Option key="1" value={0}> Nữ</Option>
                  <Option key="2" value={1}> Nam</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Main>
  );
}
export default connect(
  (state) => ({
    currentItem: state.phieuThuePhong.currentItem,
  }),
  ({

  }) => {
    return {

    };
  }
)(ThongTinKhachHang);
