import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Form } from "antd";
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Content({
  filterOption,
  title,
  currentItem,
  updateData,
  form,
  ...props
}) {
  const [state, _setState] = useState({
    content: EditorState.createEmpty()
  });
  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const onChange = (type) => (e) => {
    const value = e;
    setState({ [type]: value });
    updateData({ content: value.getCurrentContent().getPlainText('\u0001') });
  };

  useEffect(() => {
    //TODO: update state with current item
    if (currentItem) {
      let newState = {
        content: EditorState.createWithContent(ContentState.createFromText(currentItem?.content)),
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
      <div className="title-p">{title}</div>
      <Form.Item>
        {getFieldDecorator("content", {
          rules: [
            {
              required: true,
              message: "Vui lòng nhập nội dung bài viết!",
            },
          ],
          initialValue: state.content,
        })(
          <Editor
            editorState={state.content}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onChange("content")}
          />
        )}
      </Form.Item>
    </Main>
  );
}
export default connect(
  (state) => ({
    currentItem: state.tinNoiBo.currentItem,
  }),
  ({
    tinNoiBo: {
      updateData,
    }
  }) => {
    return {
      updateData,
    };
  }
)(Content);
