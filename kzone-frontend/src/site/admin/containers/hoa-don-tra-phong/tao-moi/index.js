import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Main } from "./styled";
import ThongTinDangKy from "../components/ThongTinDangKy";
import TienPhongChiTiet from "../components/TienPhongChiTiet";
import HoaDonKyGui from "../components/HoaDonKyGui";
import HoaDonDichVu from "../components/HoaDonDichVu";
import { TRANG_THAI_THANH_TOAN } from "constant";
import {
  Form,
  Spin,
  Button,
  Select,
} from "antd";
import { useHistory } from "react-router";
const { Option } = Select;

function RoomBill({
  currentItem,
  typeOfBooking,
  isLoadingCreate,
  clearOldData,
  createHoaDonThuePhong,
  onConfirmGuestCheckout,
  updateHoaDonThuePhong,
  dsHoaDonDichVu,
  dsHoaDonPhong,
  onSearchById,
  ...props
}) {
  const { push } = useHistory();
  const [state, _setState] = useState({});
  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { getFieldDecorator } = props.form;

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

  const onSave = () => {
    props.form.validateFields((error, values) => {
      if (!error) {
        let payload = {
          currentItem,
          dsHoaDonPhong,
          dsHoaDonDichVu,
        };
        if (!state.id) {
          //TODO:create:
          onConfirmGuestCheckout(payload)
            .then(s => {
              push("/admin");
            })
            .catch(e => {

            });
        } else {
          //TODO: update

        }
      }
      else { push("/admin"); }
    });
  };

  useEffect(() => {
    if (props.match.params.id == "tao-moi") {

    } else {
      // TODO: get room type by id
      onSearchById(props.match.params.id,);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    //update theo loại thuê mới
  }, [typeOfBooking]);

  useEffect(() => {
    // if (!currentItem) {
    //   push("/admin");
    // }
    setState({
      id: currentItem?.id,
      status: currentItem?.status,
      isReadOnly: mode == "view" ? true : false,
    });
  }, [currentItem]);

  useEffect(() => { }, []);

  const filterOption = (input, option) => {
    return (
      (option.props.name || option.props.children)
        ?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };
  return (
    <Main>
      <AdminPage>
        <Panel
          title={`${props.match.params.id == "tao-moi"
            ? "THÊM MỚI"
            : state.isReadOnly
              ? "XEM THÔNG TIN"
              : "CHỈNH SỬA"
            } HÓA ĐƠN
          `}
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              <Form.Item>
                {getFieldDecorator("status", {
                  rules: [{
                    required: true,
                    message: "Vui lòng chọn trạng thái hóa đơn!"
                  }],
                  initialValue: state.status,
                })(
                  <Select
                    disabled={currentItem?.id ? true : false}
                    mode="default"
                    style={{ minWidth: 200 }}
                    placeholder="Trạng thái hóa đơn"
                  >
                    {TRANG_THAI_THANH_TOAN?.map((item, index) => (
                      <Option key={index} value={item?.value}>
                        {item?.title}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              {!state.isReadOnly && (
                <Button
                  style={{ minWidth: 100, marginRight: "10px" }}
                  type="primary"
                  onClick={onSave}
                  disabled={currentItem?.id ? true : false}
                >
                  Lưu
                </Button>
              )}
            </div>
          }
        >
          <Spin spinning={isLoadingCreate}>
            <Form>
              <div className="booking">
                <div
                  className="booking-info"
                >
                  <ThongTinDangKy
                    form={props.form}
                    filterOption={filterOption}
                  />
                </div>
                <div className="booking-info">
                  <TienPhongChiTiet form={props.form} />
                  <HoaDonKyGui form={props.form} />
                  <HoaDonDichVu form={props.form} />
                </div>
              </div>
            </Form>
          </Spin>
        </Panel>
      </AdminPage>
    </Main >
  );
}
export default Form.create({})(
  connect(
    (state) => ({
      isLoadingCreate: state.hoaDonThuePhong.isLoadingCreate || false,
      dsPhongDangKy: state.hoaDonThuePhong.dsPhongDangKy || [],
      currentItem: state.hoaDonThuePhong.currentItem,
      typeOfBooking: state.hoaDonThuePhong.typeOfBooking,
      dsHoaDonPhong: state.hoaDonThuePhong.dsHoaDonPhong || [],
      dsHoaDonDichVu: state.hoaDonThuePhong.dsHoaDonDichVu || [],
    }),
    ({
      hoaDonThuePhong: {
        onGetCodeBook,
        clearOldData,
        onSearchById,
        onConfirmGuestCheckout,
        onCreate: createHoaDonThuePhong,
        update: updateHoaDonThuePhong,
      }
    }) => {
      return {
        onSearchById,
        onConfirmGuestCheckout,
        onGetCodeBook,
        clearOldData,
        createHoaDonThuePhong,
        updateHoaDonThuePhong,
      }
    }
  )(RoomBill)
);
