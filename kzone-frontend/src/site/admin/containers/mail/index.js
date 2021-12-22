import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel, FilterBox } from "site/admin/components/admin";
import { Main } from "./styled";
import {
  Input,
  Select,
  Modal,
  Icon,
  Form,
  Button,
  Tooltip,
  Tag,
  message,
} from "antd";
import { client } from "client/request";

function Room({
  total,
  size,
  page,
  sortType,
  isLoading,
  isLoadingCreate,
  ...props
}) {

  const [mail, setMail] = useState(null)
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)

  const [sent, setsent] = useState(false);
  const [text, settext] = useState("");

  let datas = {
    mails: mail,
    titles: title,
    contents: content,
  }
  const handleSend = async () => {
    setsent(true);
    try {
      const res = client.post("/mail/send_mail", { ...datas });
      console.info(res);
      if (res?.data?.code == 0) {
        message.success("Mail sent successfully!");
      }
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <Main>
      <AdminPage className="form-mail">
        <div className="panel" >
          <Form.Item className="">
            <div>
              <div className="txtColor">Nhập Địa Chỉ Mail Khách Hàng</div>
              <Input className="input-td" value={mail} onInput={e => setMail(e.target.value)}
                placeholder="Địa chỉ mail"
              />
            </div>

            <div>
              <div className="txtColor"  >Nhập Tiêu Đề Mail</div>
              <Input className="input-td" value={title} onInput={e => setTitle(e.target.value)}
                placeholder="Tiêu đề mail"
              />
            </div>
            <Input.TextArea rows={15} value={content} onInput={e => setContent(e.target.value)}

            ></Input.TextArea>
            <Button className="btn"
              style={{ minWidth: 100, marginRight: "10px" }}
              type="submit"
              onClick={handleSend}
            >
              Gửi
            </Button>
          </Form.Item>


        </div>
      </AdminPage>
    </Main>
  );
}
export default connect(
  (state) => ({

  }),

)(Room);
