import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Main } from "./styled";
import {
  Form,
  Select,
  Spin,
  Button,
} from "antd";
import { TRANG_THAI_PHIEU_S, TRANG_THAI_PHIEU } from "constant";
import { removeVietnameseTones } from "utils";
import ThongTinDangKy from "../components/ThongTinDangKy";
import DanhSachPhongDangKy from "../components/DanhSachPhongDangKy";
import ThongTinKhachHang from "../components/ThongTinKhachHang";
const { Option } = Select;

function PhieuThuePhong({
  currentItem,
  isLoadingCreate,
  onGetCodeBook,
  dsPhongDangKy,
  clearOldData,
  onCreatePhieuThuePhong,
  onUpdatePhieuThuePhong,
  onSearchById,
  taiKhoanDangNhap,
  ...props
}) {
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
          //thong tin chung
          checkinDate: props.form.getFieldValue("checkinDate").format("YYYY-MM-DD"),
          checkinTime: props.form.getFieldValue("checkinTime").format("HH:mm:ss"),
          checkoutDate: props.form.getFieldValue("checkoutDate").format("YYYY-MM-DD"),
          checkoutTime: props.form.getFieldValue("checkoutTime").format("HH:mm:ss"),
          idTravelAgency: props.form.getFieldValue("idTravelAgency"),
          idEmployee: taiKhoanDangNhap?.id,
          numberOfPerson: props.form.getFieldValue("numberOfPerson"),
          deposit: props.form.getFieldValue("deposit"),
          note: props.form.getFieldValue("note"),
          type: props.form.getFieldValue("type"),
          status: props.form.getFieldValue("status"),
          //thong tin khach 
          identifyNumber: props.form.getFieldValue("identifyNumber"),
          name: props.form.getFieldValue("name"),
          unsignedName: removeVietnameseTones(props.form.getFieldValue("name")),
          dob: props.form.getFieldValue("dob").format("YYYY-MM-DD"),
          email: props.form.getFieldValue("email"),
          phone: props.form.getFieldValue("phone"),
          address: props.form.getFieldValue("address"),
          gender: props.form.getFieldValue("gender"),
          currency: "vnd",
          isConfirm: true,
          typeOfOrder: state.typeOfOrder || 0,
        };
        if (!state.id) {
          //TODO:create:
          payload.idRooms = [...dsPhongDangKy?.map(item => ({
            id: item?.id,
            numberOfPerson: item?.numberOfPerson,
          }))];
          onCreatePhieuThuePhong(payload)
            .then(s => {
              props.history.push("/admin");
            })
            .catch(e => {

            });
        } else {
          //TODO: update
          payload.idRooms = [...dsPhongDangKy?.map(item => ({
            idRoom: item?.id,
            numberOfPerson: item?.numberOfPerson,
            id: item?.idItem,
          }))];
          payload.idGuest = currentItem?.guest?.id;
          onUpdatePhieuThuePhong({ id: currentItem?.id, payload })
            .then(s => {
              props.history.push("/admin");
            })
            .catch(e => {

            });
        }
      }
    });
  };

  useEffect(() => {
    if (props.match.params.id == "tao-moi") {
      clearOldData();
    } else {
      //TODO: get booking by id
      onSearchById(props.match.params.id);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    setState({
      id: currentItem?.id,
      status: currentItem?.status,
      typeOfOrder: currentItem?.typeOfOrder,
      // isReadOnly: mode == "view" ? true : false,
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
            } PHIẾU THUÊ PHÒNG
          `}
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              <Form.Item>
                {getFieldDecorator("status", {
                  rules: [{
                    required: true,
                    message: "Vui lòng chọn trạng thái phiếu thuê phòng!"
                  }],
                  initialValue: state.status,
                })(
                  <Select
                    disabled={currentItem?.id ? true : false}
                    mode="default"
                    style={{ minWidth: 200 }}
                    placeholder="Trạng thái phiếu"
                  >
                    {TRANG_THAI_PHIEU_S?.map((item, index) => (
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
                  disabled={currentItem?.id
                    ? currentItem?.status != TRANG_THAI_PHIEU.DAT_PHONG
                      ? true
                      : false
                    : false
                  }
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
                  <ThongTinKhachHang
                    form={props.form} ROOM_TYPE_SEARCH_CLIENT
                    filterOption={filterOption}
                  />
                </div>
                <div className="booking-info">
                  <DanhSachPhongDangKy form={props.form} />
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
      isLoadingCreate: state.phieuThuePhong.isLoadingCreate || false,
      dsPhongDangKy: state.phieuThuePhong.dsPhongDangKy || [],
      taiKhoanDangNhap: state.nhanVien.taiKhoanDangNhap,
      currentItem: state.phieuThuePhong.currentItem,
    }),
    ({
      phieuThuePhong: {
        onGetCodeBook,
        clearOldData,
        onCreate: onCreatePhieuThuePhong,
        onUpdate: onUpdatePhieuThuePhong,
        onSearchById,
      },
    }) => {
      return {
        onGetCodeBook,
        clearOldData,
        onCreatePhieuThuePhong,
        onUpdatePhieuThuePhong,
        onSearchById,
      };
    }
  )(PhieuThuePhong)
);
