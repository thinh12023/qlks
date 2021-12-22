import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import moment from "moment";
import Infomation from "../components/Infomation";
import Prices from "../components/Prices";
import Utility from "../components/Utility";
import { PlusOutlined } from "@ant-design/icons";
import { Main } from "./styled";
import {
  Form,
  Select,
  Spin,
  Button,
  Icon,
  message,
  Col,
  Upload,
} from "antd";
import { HOST } from "client/request";
const { Option } = Select;

function RoomType({
  isUploadImage,
  isLoading,
  isLoadingCreate,
  dsGiaTheoGio,
  dsPhuTroCheckinSomQuaDem,
  dsPhuTroCheckinSomTheoNgay,
  dsPhuTroCheckoutMuonQuaDem,
  dsPhuTroCheckoutMuonTheoNgay,
  currentItem,
  onCreateLoaiPhong,
  onUpdateLoaiPhong,
  onSearchById,
  clearOldData,
  onImageUpload,
  onDeleteImage,
  ...props
}) {
  const [state, _setState] = useState({
    fileList: [], // array: [{ uid: '-3', name: 'image.png', status: 'done', url: '',}]
    dsTienIchPhong: [],
  });
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
    setState({

    });
    props.form.validateFields((error, values) => {
      if (!error) {
        let payload = {
          name: props.form.getFieldValue("name"),
          numberOfBed: props.form.getFieldValue("numberOfBed"),
          numberOfPerson: props.form.getFieldValue("numberOfPerson"),
          dailyRate: props.form.getFieldValue("dailyRate"),
          overnightRate: props.form.getFieldValue("overnightRate"),
          monthlyRate: props.form.getFieldValue("monthlyRate"),
          overGuestNumberRate: props.form.getFieldValue("overGuestNumberRate"),
          hourlyRate: props.form.getFieldValue("hourlyRate"),
          // thumb: state.thumb,
          square: props.form.getFieldValue("square"),
          direction: props.form.getFieldValue("direction"),
          utilities: [...state.dsTienIchPhong],
        };
        let prices = [
          ...dsGiaTheoGio,
          ...dsPhuTroCheckinSomQuaDem,
          ...dsPhuTroCheckinSomTheoNgay,
          ...dsPhuTroCheckoutMuonQuaDem,
          ...dsPhuTroCheckoutMuonTheoNgay,
        ];
        prices = prices?.map((price, index) => ({ ...price, key: index }));
        payload = { ...payload, prices };
        if (!state.id) {
          payload = {
            ...payload,
            fileList: state.fileList?.map((image) => ({
              status: image.status,
              url: image.url,
              uid: image.uid,
              name: image.name,
            })),
          }
          // TODO: create:
          onCreateLoaiPhong(payload).then((s) => {
            props.history.push("/admin/loai-phong");
          });
        } else {
          payload = {
            ...payload,
            fileList: state.fileList?.map((image) => ({
              id: image?.id,
              status: image.status,
              url: image.url,
              uid: image.uid,
              name: image.name,
            })),
          }
          // TODO: update
          onUpdateLoaiPhong({
            id: state.id,
            payload,
          })
            .then((s) => {
              props.history.push("/admin/loai-phong");
            });
        }
        console.log(payload);
      }
    });
  };

  const handleChangeUploadImage = (data) => {
    // upload
    if (data.file.status == "uploading") {
      if (data.file.type.match('image.*') === null) {
        message.error("Vui lòng nhập đúng định dạng ảnh!")
        return;
      } else {
        onImageUpload({ file: data.file.originFileObj })
          .then((s) => {
            let ds = state.fileList || [];
            ds = [
              ...ds,
              {
                name: s,
                status: "done",
                uid: state.fileList.length + 1,
                url: `${HOST}images/${s}`
              },
            ];
            console.log(ds);
            setState({ fileList: [...ds] });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  const handleOnRemove = (item) => {
    if (item.status == "removed" && item?.id) {
      onDeleteImage({ id: item?.id })
        .then((s) => {
          let ds = state.fileList || [];
          ds = ds?.filter(i => i?.id != item?.id);
          setState({ fileList: [...ds] });
        })
        .catch((e) => {

        })
    }
  }

  useEffect(() => {
    if (props.match.params.id == "tao-moi") {
      clearOldData();
    } else {
      //TODO: get room type by id
      onSearchById({
        id: props.match.params.id,
      });
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (currentItem?.id && props.match.params.id != "tao-moi") {
      setState({
        id: currentItem?.id,
        isReadOnly: mode == "view" ? true : false,
        dsTienIchPhong: currentItem?.utilities || [],
        fileList: currentItem?.images?.map((item, index) => ({
          id: item.id,
          uid: index,
          status: "done",
          name: item?.path,
          url: `${HOST}images/${item?.path}`
        }))
      });
    }
    else {
      console.log(currentItem);
    }
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
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Main>
      <AdminPage>
        <Panel
          title={`${props.match.params.id == "tao-moi"
            ? "THÊM MỚI"
            : state.isReadOnly
              ? "XEM THÔNG TIN"
              : "CHỈNH SỬA"
            } LOẠI PHÒNG
          `}
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              {!state.isReadOnly && (
                <Button
                  style={{ minWidth: 100, marginRight: "10px" }}
                  type="primary"
                  onClick={onSave}
                >
                  Lưu
                </Button>
              )}
            </div>
          }
        >
          <Spin spinning={isLoadingCreate}>
            <Form>
              <div className="view-main">
                <div className="view-main__field">
                  <Infomation
                    title="Thông tin loại phòng"
                    filterOption={filterOption}
                    form={props.form}
                  />
                </div>
                <div className="view-main__field">
                  <Prices
                    title="Thông tin tiền phụ trợ"
                    filterOption={filterOption}
                  />
                </div>
                <div className="view-main__field">
                  <Utility
                    title="Tiện ích"
                    filterOption={filterOption}
                    form={props.form}
                    setParentState={setState}
                    dsTienIchPhong={state.dsTienIchPhong}
                  />
                </div>
              </div>
              <div className="images">
                <Col span={24}>
                  <Form.Item label="Ảnh">
                    {getFieldDecorator("fileList", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng upload ảnh!",
                        },
                      ],
                      initialValue: state.fileList,
                    })(
                      <Upload
                        fileList={state.fileList}
                        accept="image/*"
                        disabled={state.isReadOnly}
                        listType="picture-card"
                        className="avatar-uploader"
                        onRemove={handleOnRemove}
                        onChange={handleChangeUploadImage}

                      >
                        {state.fileList?.length > 8 ? null : (
                          uploadButton
                        )}
                      </Upload>
                    )}

                  </Form.Item>
                </Col>
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
      isLoading: state.loaiPhong.isLoading || false,
      isLoadingCreate: state.loaiPhong.isLoadingCreate || false,
      dsPhuTroCheckinSomTheoNgay: state.loaiPhong.dsPhuTroCheckinSomTheoNgay || [],
      dsPhuTroCheckoutMuonTheoNgay: state.loaiPhong.dsPhuTroCheckoutMuonTheoNgay || [],
      dsPhuTroCheckinSomQuaDem: state.loaiPhong.dsPhuTroCheckinSomQuaDem || [],
      dsPhuTroCheckoutMuonQuaDem: state.loaiPhong.dsPhuTroCheckoutMuonQuaDem || [],
      dsGiaTheoGio: state.loaiPhong.dsGiaTheoGio || [],
      currentItem: state.loaiPhong.currentItem,
      isUploadImage: state.image.isUploadImage || false,
    }),
    ({
      loaiPhong: {
        onCreate: onCreateLoaiPhong,
        onUpdate: onUpdateLoaiPhong,
        onSearchById,
        updateData,
        clearOldData,
      },
      image: { onImageUpload, onDelete: onDeleteImage },
    }) => {
      return {
        onCreateLoaiPhong,
        onUpdateLoaiPhong,
        onSearchById,
        updateData,
        clearOldData,
        onImageUpload,
        onDeleteImage,
      };
    }
  )(RoomType)
);
