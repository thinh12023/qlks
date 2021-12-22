import React, {
  useImperativeHandle,
  useState,
  useMemo,
  forwardRef,
} from "react";
import { Main } from "./styled";
import {
  Button,
  Form,
  Input,
  Spin,
  InputNumber,
  Select,
  Row,
  Col,
} from "antd";
import { connect } from "react-redux";

const ModalAddServiceType = (props, ref) => {
  const {
    isLoadingCreate,
    onCreate,
    onUpdate,
    form: { getFieldDecorator },
  } = props;

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
        id: item?.id != (undefined && null && "") ? item?.id : "",
        name: item?.name || "",
        note: item?.note || "",
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
            note: state.note,
          };
          if (state.id == undefined || state.id == null || state.id == "") {
            //TODO: create room
            onCreate(payload)
              .then((s) => {
                setState({ show: false });
              })
              .catch((e) => {
                setState({ show: false });
              });
          } else
            //TODO: update room
            onUpdate({ id: state.id, payload })
              .then((s) => {
                setState({ show: false });
              })
              .catch((e) => {
                setState({ show: false });
              });
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
      <Spin spinning={isLoadingCreate}>
        <div className="modal-des">
          <h4 className="title-des">
            {state.id
              ? state.isReadOnly
                ? "THÔNG TIN"
                : "CHỈNH SỬA"
              : "THÊM MỚI"}{" "}
            LOẠI DỊCH VỤ
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item label={"Tên loại dịch vụ"}>
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập tên loại dịch vụ!",
                        }
                      ],
                      initialValue: state.name,
                    })(
                      <Input
                        disabled={state.isReadOnly}
                        onChange={onChange("name")}
                        placeholder={"Nhập tên loại dịch vụ"}
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
                        onChange={onChange("note")}
                        placeholder={"Ghi chú"}
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
      isLoadingCreate: state.loaiDichVu.isLoadingCreate || false,
    }),
    ({
      loaiDichVu: {
        onCreate,
        onUpdate,
      },
    }) => ({
      onCreate,
      onUpdate,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalAddServiceType))
);
