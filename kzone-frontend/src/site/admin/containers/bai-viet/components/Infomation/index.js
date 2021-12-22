import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Upload,
} from "antd";
import { Main } from "./styled";
import moment from "moment";

function Infomation({
  filterOption,
  title,
  currentItem,
  form,
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
  useEffect(() => {
    if (currentItem != null && (mode == "view" || mode == "edit")) {
      const item = currentItem;
      let newState = {
        title: item?.title,
        desc: item?.desc,
      };
      if (mode == "view") {
        newState.isReadOnly = true;
      }
      setState(newState);
    }
  }, [currentItem]);

  const { getFieldDecorator } = form;

  return (
    <Main>
      <div className="title">{title}</div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề bài viết!",
                },
              ],
              initialValue: state.title,
            })(
              <Input
                disabled={state.isReadOnly}
                placeholder="Tiêu đề bài viết"
                onChange={onChange("title")}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập mô tả bài viết!",
                },
              ],
              initialValue: state.desc,
            })(
              <Input
                disabled={state.isReadOnly}
                placeholder="Mô tả ngắn"
                onChange={onChange("desc")}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Main>
  );
}
export default connect(
  (state) => ({
    currentItem: state.baiViet.currentItem,
  }),
  ({

  }) => {
    return {
    };
  }
)(Infomation);
