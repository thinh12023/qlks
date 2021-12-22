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
  Icon,
  message,
  Upload,
} from "antd";
import { connect } from "react-redux";
import { HOST } from "client/request";
const { Option } = Select;

const ModalAddTienIch = (props, ref) => {
  const {
    isLoadingCreate,
    onCreate,
    onUpdate,
    onImageUpload,
    isUploadImage,
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
        active: item?.active || false,
        image: item?.image || "",
        desc: item?.desc || "",
      });
      props.form.resetFields();
    },
  }));

  const handleChangeUploadImage = (data) => {
    if (data.file.status !== "uploading") {
      if (data.file.type.match('image.*') === null) {
        message.error("Vui lòng nhập đúng định dạng ảnh!")
        return;
      } else {
        onImageUpload({ file: data.file.originFileObj }).then((s) => {
          setState({
            image: s,
          });
        });
      }
    }
  };
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

  const uploadButton = (
    <div>
      {isUploadImage ? <Icon type="loading" /> : <Icon type="plus" />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          const payload = {
            name: state.name,
            active: state.active,
            desc: state.desc,
            image: state.image,
          };
          if (state.id == undefined || state.id == null || state.id == "") {
            //TODO: create room
            onCreate(payload)
              .then((s) => {
                setState({ show: false });
              })
              .catch((e) => {
                // setState({ show: false });
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
            TIỆN ÍCH
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label={"Tên tiện ích"}>
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập tên tiện ích!",
                        },
                        {
                          whitespace: true,
                          message: "Vui lòng nhập tên tiện ích!",
                        },
                      ],
                      initialValue: state.name,
                    })(
                      <Input
                        disabled={state.id != ("" && undefined && null) || state.isReadOnly}
                        onChange={onChange("name")}
                        placeholder={"Nhập tên tiện ích"}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Trạng thái"}>
                    {getFieldDecorator("active", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng chọn trạng thái!",
                        },
                      ],
                      initialValue: state.active,
                    })(
                      <Select
                        disabled={state.isReadOnly}
                        placeholder="Trạng thái"
                        onChange={onChange("active")}
                      >
                        <Option
                          key="col1"
                          value={true}
                        >
                          Khả dụng
                        </Option>
                        <Option
                          key="col2"
                          value={false}
                        >
                          Không khả dụng
                        </Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Mô tả"}>
                    {getFieldDecorator("desc", {
                      rules: [],
                      initialValue: state.desc,
                    })(
                      <Input
                        onChange={onChange("desc")}
                        placeholder={"Nhập mô tả"}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Icon">
                    {getFieldDecorator("image", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng upload icon!",
                        },
                      ],
                      initialValue: state.image,
                    })(
                      <Upload
                        accept="image/*"
                        disabled={state.isReadOnly}
                        showUploadList={false}
                        listType="picture-card"
                        className="avatar-uploader"
                        onChange={handleChangeUploadImage}

                      >
                        {state.image ? (
                          <img
                            src={HOST + `images/${state.image}`}
                            alt="Icon"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
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
      isLoadingCreate: state.tienIch.isLoadingCreate || false,
      isUploadImage: state.image.isUploadImage || false,
    }),
    ({
      image: { onImageUpload },
      tienIch: {
        onCreate,
        onUpdate,
      },
    }) => ({
      onCreate,
      onUpdate,
      onImageUpload,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalAddTienIch))
);
