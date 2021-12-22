import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import moment from "moment";
import Infomation from "../components/Infomation";
import Content from "../components/Content";
import { Main } from "./styled";
import {
  Form,
  Spin,
  Button,
  Icon,
  message,
  Upload,
} from "antd";
import { HOST } from "client/request";
import { useHistory } from "react-router";

function BaiViet({
  isUploadImage,
  isLoading,
  isLoadingCreate,
  currentItem,
  onImageUpload,
  content,
  onCreate,
  onUpdate,
  onSearchById,
  updateData,
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
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
          : e,
    });
  };

  const onSave = () => {
    props.form.validateFields((error, values) => {
      if (!error) {
        let payload = {
          title: props.form.getFieldValue("title"),
          desc: props.form.getFieldValue("desc"),
          content: content,
          image: state.image,
        };
        if (!state.id) {
          //TODO:create:
          onCreate(payload)
            .then(s => {
              push("/admin/bai-viet");
            })
            .catch(e => {
              push("/admin/bai-viet");
            })
        } else {
          //TODO: update
          onUpdate({
            id: state.id,
            payload,
          })
        }
        push("/admin/bai-viet");
      }
    });
  };
  const uploadButton = (
    <div>
      {isUploadImage ? <Icon type="loading" /> : <Icon type="plus" />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
  useEffect(() => {
    if (props.match.params.id == "tao-moi") {
      updateData({
        currentItem: null,
      });
    } else {
      //TODO: get room type by id
      onSearchById(props.match.params.id);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    setState({
      id: currentItem?.id,
      isReadOnly: mode == "view" ? true : false,
      image: currentItem?.image,
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
            } BÀI VIẾT
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
                    title="Thông tin bài viết"
                    filterOption={filterOption}
                    form={props.form}
                  />
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
                </div>
                <div className="view-main__field">
                  <Content
                    form={props.form}
                    id={props.match.params.id}
                    title="Nội dung bài viết"
                    filterOption={filterOption}
                  />
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
      isLoading: state.baiViet.isLoading || false,
      isLoadingCreate: state.baiViet.isLoadingCreate || false,
      currentItem: state.baiViet.currentItem,
      content: state.baiViet.content,
      isUploadImage: state.image.isUploadImage || false,
    }),
    ({
      image: { onImageUpload },
      baiViet: {
        onUpdate,
        onCreate,
        onSearchById,
        updateData,
      }
    }) => {
      return {
        onCreate,
        onUpdate,
        updateData,
        onSearchById,
        onImageUpload,
      };
    }
  )(BaiViet)
);
