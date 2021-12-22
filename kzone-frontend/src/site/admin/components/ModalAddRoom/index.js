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
import { TRANG_THAI_PHONG } from "constant";
import { HOST } from "client/request";
const { Option } = Select;

const ModalAddRoom = (props, ref) => {
  const {
    isLoadingCreate,
    dsLoaiPhong,
    dsFloor,
    onCreate,
    onUpdate,
    onImageUpload ,
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
        idFloor: item?.idFloor,
        idRoomType: item?.idRoomType,
        isReadOnly: isReadOnly || false,
        image:item?.image || "",
        square: item?.square || "",
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
            idFloor: state.idFloor,
            status: state.status,
            active: state.active,
            idRoomType: state.idRoomType,
            square: state.square,
            image:state.image,
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
            if (!payload.active) {
              if (payload.status == (TRANG_THAI_PHONG.DA_DAT_PHONG.value || TRANG_THAI_PHONG.KHACH_DANG_O.value)) {
                message.error("Phòng đang có khách ở hoặc đặt trước!");
                return;
              }
            }
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
            PHÒNG
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label={"Số phòng"}>
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập số phòng!",
                        },
                        {
                          whitespace: true,
                          message: "Vui lòng nhập số phòng!",
                        },
                      ],
                      initialValue: state.name,
                    })(
                      <Input
                        disabled={state.id != ("" && undefined && null) || state.isReadOnly}
                        onChange={onChange("name")}
                        placeholder={"Nhập số phòng"}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Tầng"}>
                    {getFieldDecorator("idFloor", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập tầng cho phòng!",
                        },
                      ],
                      initialValue: state.idFloor,
                    })(
                      <Select
                        disabled={state.id != ("" && undefined && null) || state.isReadOnly}
                        placeholder="Tầng"
                        onChange={onChange("idFloor")}
                      >
                        {dsFloor?.map((floor, index) => (
                          <Option key={index} value={floor.id}>
                            {floor?.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Trạng thái phòng"}>
                    {getFieldDecorator("active", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng chọn trạng thái phòng!",
                        },
                      ],
                      initialValue: state.active,
                    })(
                      <Select
                        disabled={state.isReadOnly}
                        placeholder="Trạng thái phòng"
                        onChange={onChange("active")}
                      >
                        <Option
                          key="col1"
                          value={true}
                        >
                          Active
                        </Option>
                        <Option
                          key="col2"
                          value={false}
                        >
                          Disable
                        </Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Loại phòng"}>
                    {getFieldDecorator("idRoomType", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng chọn loại phòng!",
                        },
                      ],
                      initialValue: state.idRoomType,
                    })(
                      <Select
                        disabled={state.isReadOnly}
                        placeholder="Loại phòng"
                        onChange={onChange("idRoomType")}
                      >
                        {dsLoaiPhong?.map((type, index) => (
                          <Option key={index} value={type.id}>
                            {type?.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Diện Tích"}>
                    {getFieldDecorator("square", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập diện tích!",
                        },
                        {
                          whitespace: true,
                          message: "Vui lòng nhập diện tích!",
                        },
                      ],
                      initialValue: state.square,
                    })(
                      <Input
                        onChange={onChange("square")}
                        placeholder={"Nhập số phòng"}
                      />
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
                            alt="Ảnh Phong"
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
      isLoadingCreate: state.phong.isLoadingCreate || false,
      dsLoaiPhong: state.loaiPhong.dsLoaiPhong || [],
      dsFloor: state.floor.dsFloor || [],
      isUploadImage: state.image.isUploadImage || false,
    }),
    ({
      image: { onImageUpload },
      phong: {
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
  )(forwardRef(ModalAddRoom))
);
