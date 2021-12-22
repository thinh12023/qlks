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
  Icon,
  Input,
  Spin,
  Select,
  Row,
  Col,
  message,
  InputNumber,
  Upload,
} from "antd";
import { connect } from "react-redux";
import { HOST } from "client/request";
const { Option } = Select;


const ModalAddService = ({
  isLoadingCreate,
  isUploadImage,
  dsLoaiDichVu,
  onCreate,
  onUpdate,
  onImageUpload,
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
        id: item?.id != (undefined && null && "") ? item?.id : "",
        name: item?.name || "",
        image: item?.image || "",
        price: item?.price || "",
        idServiceType: item?.idServiceType || "",
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

  const uploadButton = (
    <div>
      {isUploadImage ? <Icon type="loading" /> : <Icon type="plus" />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefaults();
  };

  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          const payload = {
            name: state.name,
            price: state.price,
            image: state.image,
            idServiceType: state.idServiceType,
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
            DỊCH VỤ
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
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
                <Col span={12}>
                  <Form.Item label={"Price"}>
                    {getFieldDecorator("price", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng chọn loại phòng!",
                        },
                      ],
                      initialValue: state.price,
                    })(
                      <InputNumber
                        disabled={state.isReadOnly}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        min={0}
                        onChange={onChange("price")}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Loại dịch vụ"}>
                    {getFieldDecorator("idServiceType", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng chọn loại phòng!",
                        },
                      ],
                      initialValue: state.idServiceType,
                    })(
                      <Select
                        disabled={state.isReadOnly}
                        placeholder="Loại dịch vụ"
                        onChange={onChange("idServiceType")}
                      >
                        {dsLoaiDichVu?.map((type, index) => (
                          <Option key={index} value={type.id}>
                            {type?.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                <Form.Item label="Ảnh">
                    {getFieldDecorator("image", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng upload ảnh!",
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
                            alt="Ảnh bài viết"
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
      isLoadingCreate: state.dichVu.isLoadingCreate || false,
      dsLoaiDichVu: state.loaiDichVu.dsLoaiDichVu || [],
      isUploadImage: state.image.isUploadImage || false,
    }),
    ({
      image: { onImageUpload },
      dichVu: {
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
  )(forwardRef(ModalAddService))
);
