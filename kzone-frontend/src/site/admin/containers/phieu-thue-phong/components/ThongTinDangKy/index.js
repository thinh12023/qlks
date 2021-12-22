import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
} from "antd";
import { Main } from "./styled";
import moment from "moment";
import { FORMAT, DS_ } from "constant";
import ModalAddTravelAgency from "site/admin/components/ModalAddTravelAgency";
import ModalPhieuTraTruoc from "site/admin/components/ModalPhieuTraTruoc";
import { LOAI_THUE_PHONG, LOAI_PHIEU_THU } from "constant";

const { Option } = Select;
const { TextArea } = Input;

function ThongTinDangKy({
  dsPhongDangKy,
  filterOption,
  currentItem,
  form,
  type,
  dsTravelAgency,
  onSearchTravelAgency,
  ...props
}) {
  const { getFieldDecorator } = form;
  const refAddTravelAgency = useRef(null);
  const refAddPhieuTraTruoc = useRef(null);
  const [state, _setState] = useState({
    checkinTime: moment("14:00", "HH:mm"),
    checkoutTime: moment("12:00", "HH:mm"),
    checkinDate: moment().add(1, "days"),
    checkoutDate: moment().add(2, "days"),
    type: LOAI_THUE_PHONG.THEO_NGAY
  });
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
          ? moment(e._d)
          : e,
    };
    setState(newState);
  };
  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }
  const showModalAddTravelAgency = ({ }) => e => {
    if (refAddTravelAgency.current) {
      refAddTravelAgency.current.show({});
    }
  }
  const showModalPhieuTraTruoc = () => e => {
    if (refAddPhieuTraTruoc.current) {
      refAddPhieuTraTruoc.current.show({ idBooking: currentItem?.id });
    }
  }
  useEffect(() => {
    if (dsPhongDangKy) {
      let numberOfPerson = dsPhongDangKy?.reduce((acc, item) => {
        acc = parseInt(acc) + parseInt(item?.numberOfPerson);
        return acc;
      }, 0);
      setState({ numberOfPerson });
    }
  }, [dsPhongDangKy]);
  useEffect(() => {
    if (currentItem && currentItem?.id) {
      let payload = {
        checkinDate: moment(currentItem?.checkinDate),
        checkinTime: moment(currentItem?.checkinTime, "HH:mm"),
        checkoutDate: moment(currentItem?.checkoutDate),
        checkoutTime: moment(currentItem?.checkoutTime, "HH:mm"),
        idTravelAgency: currentItem?.idTravelAgency,
        deposit: currentItem?.receipts?.filter(i => i?.type == LOAI_PHIEU_THU.TRA_TRUOC)?.reduce((acc, item) => {
          acc = parseFloat(acc) + parseFloat(item?.totalMoney);
          return acc;
        }, 0),
        note: currentItem?.note,
        type: currentItem?.type,
      };
      setState(payload);
    }
  }, [currentItem]);
  useEffect(() => {
    onSearchTravelAgency({ dataSearch: { page: 1, size: 999 } });
  }, []);
  return (
    <Main>
      <div className="title">Thông tin đăng ký</div>
      <div className="main">
        <div className="panelInfo">
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator("checkinDate", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày ckeckin",
                    }
                  ],
                  initialValue: state.checkinDate,
                })(
                  <DatePicker
                    disabledDate={disabledDate}
                    format={"DD / MM / YYYY"}
                    placeholder="Ngày checkin"
                    onChange={onChange("checkinDate")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("checkinTime", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn thời gian checkin",
                    }
                  ],
                  initialValue: state.checkinTime,
                })(
                  <TimePicker
                    allowClear
                    format={FORMAT.FORMAT_TIME}
                    placeholder="Thời gian checkin"
                    onChange={onChange("checkinTime")}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator("checkoutDate", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày ckeckout",
                    }
                  ],
                  initialValue: state.checkoutDate,
                })(
                  <DatePicker
                    format={"DD / MM / YYYY"}
                    placeholder="Ngày checkin"
                    onChange={onChange("checkoutDate")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("checkoutTime", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn thời gian checkout",
                    }
                  ],
                  initialValue: state.checkoutTime,
                })(
                  <TimePicker
                    allowClear
                    format={FORMAT.FORMAT_TIME}
                    placeholder="Thời gian checkin"
                    onChange={onChange("checkoutTime")}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator("idTravelAgency", {
                  rules: [],
                  initialValue: state.idTravelAgency,
                })(
                  <Select
                    placeholder="Chọn đoàn/công ty lữ hành"
                    onChange={onChange("idTravelAgency")}
                  >
                    {dsTravelAgency?.map((item, index) => (
                      <Option key={`col${index}`} value={item?.id}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                icon="plus"
                onClick={showModalAddTravelAgency({})}
              />
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("type", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn hình thức thuê phòng",
                    }
                  ],
                  initialValue: state.type,
                })(
                  <Select
                    placeholder="Hình thức thuê"
                    onChange={onChange("type")}
                  >
                    {DS_?.map((item, index) => (
                      <Option key={`col${index}`} value={item?.value}>
                        {item?.title}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

        </div>
        <div className="panelInfo">
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("numberOfPerson", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập số khách thuê/đặt phòng!",
                    }
                  ],
                  initialValue: state.numberOfPerson,
                })(
                  <InputNumber
                    disabled
                    placeholder="Số khách thuê phòng"
                    min={0}
                  // onChange={onChange("numberOfPerson")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item>
                {getFieldDecorator("deposit", {
                  rules: [
                  ],
                  initialValue: state.deposit,
                })(
                  <InputNumber
                    disabled={currentItem?.id ? true : false}
                    placeholder="Trả trước"
                    onChange={onChange("deposit")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button
                disabled={
                  currentItem?.id
                    && currentItem?.isConfirm
                    ? true
                    : false
                }
                type="primary"
                icon="plus"
                onClick={showModalPhieuTraTruoc()}
              />
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("note", {
                  rules: [],
                  initialValue: state.note,
                })(
                  <TextArea
                    onChange={onChange("note")}
                    placeholder="Ghi chú"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>

      </div>
      <ModalAddTravelAgency wrappedComponentRef={refAddTravelAgency} />
      <ModalPhieuTraTruoc wrappedComponentRef={refAddPhieuTraTruoc} />
    </Main>
  );
}
export default connect(
  (state) => ({
    dsPhongDangKy: state.phieuThuePhong.dsPhongDangKy || [],
    dsTravelAgency: state.travelAgency.dsTravelAgency || [],
    currentItem: state.phieuThuePhong.currentItem,
  }),
  ({
    travelAgency: {
      onSearch: onSearchTravelAgency,
    }
  }) => {
    return {
      onSearchTravelAgency,
    };
  }
)(ThongTinDangKy);
