import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Main } from "./styled";
import { Button, Form, Input, Spin, InputNumber } from "antd";
import { connect } from "react-redux";

const ModalUpdateInfoHotel = ({
  onBuild,
  isLoading,
  ...props
}, ref) => {
  const { getFieldDecorator } = props.form;

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}) => {
      setState({
        show: true,
        numberOfFloor: "",
        maxRoomOfFloor: "",
      });
      props.form.resetFields();
    },
  }));

  const handleSubmit = () => { };

  const onChange = (type) => (e) => {
    setState({
      [type]: e?.hasOwnProperty("target") ? e.target.value : e,
    });
  };
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          let payload = {
            numberOfFloor: state.numberOfFloor,
            maxRoomOfFloor: state.maxRoomOfFloor,
          }
          onBuild(payload)
            .then(s => {
              setState({ show: false });
            })
            .catch(e => {
              setState({ show: false });
            });
        }
      });
    } else setState({ show: false });
  };
  return (
    <Main
      visible={state.show}
      style={{ maxWidth: 520 }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={isLoading}>
        <div className="modal-des">
          <h4 className="title-des">
            CẬP NHẬT THÔNG TIN KHÁCH SẠN
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Form.Item label={"Số tầng"}>
                {getFieldDecorator("numberOfFloor", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập số tầng khách sạn!",
                    },
                  ],
                  initialValue: state.numberOfFloor,
                })(
                  <InputNumber
                    onChange={onChange("numberOfFloor")}
                    placeholder={"Số tầng khách sạn"}
                  />
                )}
              </Form.Item>
              <Form.Item label={"Số phòng/1tầng"}>
                {getFieldDecorator("maxRoomOfFloor", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập số phòng 1 tầng khách sạn!",
                    },
                  ],
                  initialValue: state.maxRoomOfFloor,
                })(
                  <InputNumber
                    onChange={onChange("maxRoomOfFloor")}
                    placeholder={"Số phòng 1 tầng khách sạn"}
                  />
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="action-footer">
          <Button
            type="danger"
            style={{
              minWidth: 100,
            }}
            onClick={onOK(false)}
          >
            Huỷ
              </Button>
          <Button
            type="primary"
            style={{
              minWidth: 100,
            }}
            onClick={onOK(true)}
          >
            Lưu
              </Button>
        </div>
      </Spin>
    </Main>
  );
};

export default Form.create({})(
  connect(
    (state) => ({
      isLoading: state.setup.isLoading || false,
    }),
    ({
      setup: { onBuild }
    }) => ({
      onBuild,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalUpdateInfoHotel))
);
