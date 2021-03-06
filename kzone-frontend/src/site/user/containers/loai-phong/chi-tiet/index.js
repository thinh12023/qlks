import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { DatePicker, Form, Input, Spin, Button, InputNumber } from "antd";
import Banner from "../../../components/Banner";
import { HOST } from "client/request";
import moment from "moment";
import { removeVietnameseTones } from "utils";
import { useHistory } from "react-router";
import ImageGallery from 'react-image-gallery';
import { ROOM_DIRECTION } from "constant";
import { ReCaptcha } from "react-recaptcha-google";

function LoaiPhongChiTiet({
  isLoadingCreate,
  onGuestBookRoom,
  isLoadingClient,
  currentItemClient,
  onSearchLoaiPhongById,
  ...props
}) {
  const { push } = useHistory();
  const [state, _setState] = useState({
    isVerified: false,
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const onChange = (type) => (e) => {
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
          : e,
    })
  };
  const onSave = () => {
    props.form.validateFields((error, values) => {
      if (!error && state.isVerified) {
        const payload = {
          checkinDate: moment(state.checkinDate).format("YYYY-MM-DD"),
          checkoutDate: moment(state.checkoutDate).format("YYYY-MM-DD"),
          dob: moment(state.dob).format("YYYY-MM-DD"),
          numberOfRoom: state.numberOfRoom,
          name: state.name,
          phone: state.phone,
          email: state.email,
          address: state.address,
          note: state.note,
          //identifyNumber: state.identifyNumber,
          unsignedName: removeVietnameseTones(state.name),
          idRoomType: currentItemClient?.id,
        };
        onGuestBookRoom(payload)
          .then(s => {
            push("/");
          })
          .catch(e => {
            push("/");
          });
      }
    });
  }
  const handleRef = (data) => {
    console.log(data);
  }
  const onCallBack = (data) => {
    console.log(data);
  }
  const verifyCallBack = (data) => {
    if (data) {
      setState({
        isVerified: true,
      })
    }
    else {
      setState({
        isVerified: false,
      })
    }
  }
  const { getFieldDecorator } = props.form;
  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      onSearchLoaiPhongById(id);
    }
  }, [props.match.params.id]);
  useEffect(() => {

  }, []);
  return (
    <Spin spinning={isLoadingClient}>
      <Banner title={`${currentItemClient?.name}`} />
      <Main>
        <div className="_row">
          <div className="_col col1">
            <div className="title">Th??ng tin ph??ng</div>
            <div className="content1">
              <div className="item">
                <div className="label">Di???n t??ch: </div>
                <div className="value">{currentItemClient?.square} m<span>2</span></div>
              </div>
              <div className="item">
                <div className="label">H?????ng ph??ng: </div>
                <div className="value">{ROOM_DIRECTION.find(i => i.value == currentItemClient?.direction)?.name}</div>
              </div>
              <div className="item">
                <div className="label">S??? gi?????ng: </div>
                <div className="value">{currentItemClient?.numberOfBed}</div>
              </div>
            </div>
            <div className="title">Ti???n nghi v?? c?? s??? v???t ch???t</div>
            <div className="content">
              {currentItemClient?.utilities?.map((item, index) => (
                <div className="item" key={index}>
                  <div className="icon">
                    <img src={`${HOST}images/${item?.image}`} alt="" />
                  </div>
                  <div className="name">
                    {item?.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="_col">
            {/* <img src={`${HOST}images/${currentItemClient?.thumb}`} alt="" /> */}
            <ImageGallery
              items={(currentItemClient?.images || []).map(item => ({
                original: `${HOST}images/${item.path}`,
                thumbnail: `${HOST}images/${item.path}`,
              }))}
            />
          </div>
          <div className="_col">
            <div className="_i">
              <img src={require("resources/images/logo.png")} alt="" />
              <div className="price">{currentItemClient?.dailyRate} VN??/Ng??y</div>
            </div>
            <Form className="form">
              <Form.Item>
                {getFieldDecorator("checkinDate", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng ch???n ng??y nh???n ph??ng!"
                    }
                  ],
                  initialValue: state.checkinDate,
                })(
                  <DatePicker
                    placeholder="Ng??y checkin"
                    format="DD / MM / YYYY"
                    onChange={onChange("checkinDate")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("checkoutDate", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng ch???n ng??y tr??? ph??ng!"
                    }
                  ],
                  initialValue: state.checkoutDate,
                })(
                  <DatePicker
                    placeholder="Ng??y checkout"
                    format="DD / MM / YYYY"
                    onChange={onChange("checkoutDate")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("numberOfRoom", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng nh???p s??? ph??ng ?????t tr?????c!"
                    }
                  ],
                  initialValue: state.numberOfRoom,
                })(
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="S??? ph??ng ?????t tr?????c"
                    onChange={onChange("numberOfRoom")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng nh???p h??? v?? t??n!"
                    }
                  ],
                  initialValue: state.name,
                })(
                  <Input
                    placeholder="H??? v?? t??n"
                    onChange={onChange("name")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("dob", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng ch???n ng??y sinh!"
                    }
                  ],
                  initialValue: state.dob,
                })(
                  <DatePicker
                    placeholder="Ng??y sinh"
                    format="DD / MM / YYYY"
                    onChange={onChange("dob")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng nh???p s??? ??i???n tho???i!"
                    }
                  ],
                  initialValue: state.phone,
                })(
                  <Input
                    placeholder="S??? ??i???n tho???i"
                    onChange={onChange("phone")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng nh???p email!"
                    }
                  ],
                  initialValue: state.email,
                })(
                  <Input
                    placeholder="Email"
                    onChange={onChange("email")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng nh???p address!"
                    }
                  ],
                  initialValue: state.address,
                })(
                  <Input
                    placeholder="?????a ch???"
                    onChange={onChange("address")}
                  />
                )}
              </Form.Item>
              {/* <Form.Item>
                {getFieldDecorator("identifyNumber", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng nh???p CMND!"
                    }
                  ],
                  initialValue: state.identifyNumber,
                })(
                  <Input
                    placeholder="CMND"
                    onChange={onChange("identifyNumber")}
                  />
                )}
              </Form.Item> */}
              <Form.Item>
                {getFieldDecorator("note", {
                  rules: [],
                  initialValue: state.note,
                })(
                  <Input.TextArea
                    placeholder="Ghi ch??"
                    onChange={onChange("note")}
                  />
                )}
              </Form.Item>
              <ReCaptcha
                ref={handleRef}
                size="normal"
                data-theme="dark"
                render="explicit"
                sitekey="6Le5Jn8dAAAAALSBI2Z8fkFmm4gc3Q2x7gel6zLN"
                onloadCallback={onCallBack}
                verifyCallback={verifyCallBack}
              />
              {state.isVerified && (
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={onSave}
                >
                  ?????t ph??ng
                </Button>
              )}
            </Form>
          </div>
        </div>
      </Main>
    </Spin >
  )
}

export default Form.create({})(
  connect(
    (state) => ({
      isLoadingClient: state.loaiPhong.isLoadingClient || false,
      isLoadingCreate: state.phieuThuePhong.isLoadingCreate || false,
      currentItemClient: state.loaiPhong.currentItemClient,
    }),
    ({
      loaiPhong: {
        onSearchLoaiPhongById,
      },
      phieuThuePhong: {
        onGuestBookRoom,
      }
    }) => ({
      onSearchLoaiPhongById,
      onGuestBookRoom,
    }),

  )(LoaiPhongChiTiet)
);