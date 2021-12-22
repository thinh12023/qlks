import React, {
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import { Main } from "./styled";
import {
  Button,
  Form,
  Input,
  Spin,
  Select,
  Row,
  Col,
} from "antd";
import { connect } from "react-redux";

const ModalAddTravelAgency = ({
  isLoadingCreate,
  onCreate,
  ...props
}, ref) => {
  const { form: { getFieldDecorator } } = props;

  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((state) => ({
      ...state,
      ...data,
    }));
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, isReadOnly) => {
      setState({
        show: true,
      });
      props.form.resetFields();
    },
  }));
  const onChange = (type) => (e) => {
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? e._d
          : e,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefaults();
  };
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          const payload = {
            name: state.name,
            tel: state.tel,
            mobile: state.mobile,
            email: state.email,
            address: state.address,
            note: state.note,
          };
          if (!state.id)
            //TODO: create room
            onCreate(payload)
              .then((s) => {
                setState({ show: false });
              })
              .catch((e) => {
                setState({ show: false });
              });
          // else
          //   // TODO: update room
          //   onUpdate({ id: state.id, payload })
          //     .then((s) => {
          //       setState({ show: false });
          //     })
          //     .catch((e) => {
          //       setState({ show: false });
          //     });
        }
      });
    } else setState({ show: false });
  };

  return (
    <Main
      visible={state.show}
      style={{ maxWidth: 660 }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={false}>
        <div className="modal-des">
          <h4 className="title-des">
            {state.id
              ? state.isReadOnly
                ? "THÔNG TIN"
                : "CHỈNH SỬA"
              : "THÊM MỚI"}{" "}
            CÔNG TY / GROUP
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item label={"Tên công ty / group"}>
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập tên công ty hoặc group!",
                        }
                      ],
                      initialValue: state.name,
                    })(
                      <Input
                        disabled={state.isReadOnly}
                        onChange={onChange("name")}
                        placeholder={"Nhập tên công ty / group"}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={"Tel"}>
                    {getFieldDecorator("tel", {
                      rules: [],
                      initialValue: state.tel,
                    })(
                      <Input
                        disabled={state.isReadOnly}
                        onChange={onChange("tel")}
                        placeholder={"Nhập số điện thoại công ty / group"}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={"Mobile"}>
                    {getFieldDecorator("mobile", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại di động!",
                        },
                      ],
                      initialValue: state.mobile,
                    })(
                      <Input
                        disabled={state.isReadOnly}
                        placeholder="Số điện thoại di động"
                        onChange={onChange("mobile")}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={"Email"}>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                      ],
                      initialValue: state.email,
                    })(
                      <Input
                        disabled={state.isReadOnly}
                        placeholder="Email"
                        onChange={onChange("email")}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={"Địa chỉ"}>
                    {getFieldDecorator("address", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập địa chỉ!",
                        },
                      ],
                      initialValue: state.address,
                    })(
                      <Input
                        disabled={state.isReadOnly}
                        placeholder="Địa chỉ"
                        onChange={onChange("address")}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={"Ghi chú"}>
                    {getFieldDecorator("note", {
                      rules: [],
                      initialValue: state.note,
                    })(
                      <Input.TextArea
                        disabled={state.isReadOnly}
                        placeholder="Ghi chú"
                        onChange={onChange("note")}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <div className="action-footer">
          {state.isReadOnly ? (
            <Button
              type="danger"
              style={{
                minWidth: 100,
              }}
              onClick={onOK(false)}
            >
              Đóng
            </Button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Spin>
    </Main>
  );
};

export default Form.create({})(
  connect(
    (state) => ({
      isLoadingCreate: state.travelAgency.isLoadingCreate || false,
    }),
    ({
      travelAgency: {
        onCreate,
      }
    }) => ({
      onCreate,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalAddTravelAgency))
);
