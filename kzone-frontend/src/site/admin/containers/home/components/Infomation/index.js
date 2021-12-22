import { message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { useHistory } from "react-router";
import { client } from "client/request";

function Infomation({
  isLoading,
  dsPhieuChuaXacNhan,
  onSearchUnConfirmedBooking,
  booking,
  ...props
}) {
  const { push } = useHistory();
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  }
  let [ready, readied] = useState("");
  let [notReady, notReadied] = useState("");
  let [order, ordered] = useState("");
  let [inuse, inused] = useState("");
  const [sent, setsent] = useState(false);
  let datas = {
    mails: "",
    titles: "",
    contents: "",
  }

  const handleReady = async () => {
    client.get('/room/getRoomReady')
      .then(res => {
        readied(res.data.data);
        return res.data;
      })
      .catch(function (error) {
        console.log("" + error);
      });
  };

  const handleNotReady = async () => {
    client.get('/room/getRoomNotReady')
      .then(res => {
        notReadied(res.data.data);
        return res.data;
      })
      .catch(function (error) {
        console.log("" + error);
      });
  };
  const handleInUse = async () => {
    client.get('/room/getRoomInUse')
      .then(res => {
        inused(res.data.data);
        return res.data;
      })
      .catch(function (error) {
        console.log("" + error);
      });
  };
  const handleOrder = async () => {
    client.get('/room/getRoomPreorder')
      .then(res => {
        ordered(res.data.data);
        return res.data;
      })
      .catch(function (error) {
        console.log("" + error);
      });
  };

  const handleSend = (mail, title, content) => {
    return new Promise((resolve, reject) => {
      setsent(true);
      client.post("/mail/send_mail", {
        mails: mail,
        titles: title,
        contents: content
      })
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const handleChangeConfirm = async (ids, mail) => {
    client.put(`/booking/changeConfirm/${ids}`)
      .then(res => {
        ordered(res.data.data);
        return handleSend(
          mail,
          "Đặt Phòng Thành Công",
          "Qúy khách đã đặt phòng thành công tại khách sạn Kzone Hotel"
        );
        // return res.data;
      })
      .then((s) => {
        message.success("Mail sent successfully!");
        window.location.reload();
      })
      .catch(function (error) {
        console.log("" + error);
      });
  };

  const handleReject = async (ids, mail) => {
    client.delete(`/booking/delete/${ids}`)
      .then((s) => {
        return handleSend(
          mail,
          "Đặt Phòng Thất Bại ",
          "Xin lỗi quý khách vì sự bất tiên , hiện tại khách sạn chúng tôi đã đầy phòng"
        )
      })
      .then((s) => {
        window.location.reload();
      })
      .catch(function (error) {
        console.log("" + error);
      });
  };

  useEffect(() => {
    onSearchUnConfirmedBooking({ isConfirm: 0 });
    handleReady();
    handleNotReady();
    handleOrder();
    handleInUse();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Main {...props}>
        <div className="fontColor" >Phòng còn trống:{ready} </div>
        <div className="fontColor">Phòng được đặt trước:{order} </div>
        <div className="fontColor">Phòng đang sử dụng:{inuse} </div>
        <div className="fontColor">Phòng đang sửa chữa, chưa dọn:{notReady} </div>
        <div className="border"></div>
        <div className="action">

        </div>
        <div className="info">
          {dsPhieuChuaXacNhan?.map((item, index) => (
            <div
              className="name"
              key={index}
            // onClick={() => {
            //   handleChangeConfirm(item.id)
            // }}
            >
              Khách: <span>{item?.guest?.profile?.name}</span> đã đặt online!
              <div className="btnRow">
                <div className="Buttons_accept"
                  onClick={() => { handleChangeConfirm(item.id, item?.guest?.profile?.email) }}
                // onClick={()=>{handleSend(item?.guest?.profile?.email)}}
                ><span>Accept</span></div>
                <div
                  onClick={() => { handleReject(item.id, item?.guest?.profile?.email) }}
                  className="Buttons_reject"><span>Reject</span></div>
              </div>

            </div>

          ))}

        </div>
      </Main>
    </Spin>
  );
}


export default connect(
  (state) => ({
    isLoading: state.phieuThuePhong.isLoading || false,
    dsPhieuChuaXacNhan: state.phieuThuePhong.dsPhieuChuaXacNhan || [],
  }),
  ({
    phieuThuePhong: {
      onSearchUnConfirmedBooking,
    }
  }) => ({
    onSearchUnConfirmedBooking,
  })
)(Infomation);