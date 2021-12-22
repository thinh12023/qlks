import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import SliderComponent from "../../components/SliderComponent";
import Room from "../../components/Room";
import New2 from "../../components/New2";
import Newdv from "../../components/Newdv";
import { useHistory } from "react-router";

function LoaiPhong({
  onSearchLoaiPhongsClient,
  onSearch,
  isLoading,
  isLoadingClient,
  dsLoaiPhongClient,
  dsBaiViet,
  onSearchBaiViet,
  onSearchDichVu,
  dsTinNoiBo,
  onSearchTinNoiBo,
  dsDichVu,
  dsSuKien,
  onSearchSuKien,
  ...props }) {
  const { push } = useHistory();

  useEffect(() => {
    onSearchLoaiPhongsClient();
    onSearchBaiViet({ size: 3 });
    onSearchTinNoiBo({ size: 3 });
    onSearchSuKien({ size: 3 });
    onSearchDichVu({ dataSearch: { size: 3 } });
  }, []);

  return (
    <Main>
      <SliderComponent />
      <div className="room">
        <div className="title">
          Phòng nghỉ
        </div>
        <div className="desc">
          Là sự lựa chon đầu tiên khi Quý khách đến với Hải Phòng, thành phố cảng năng động, phát triển
        </div>
        <div className="list__rooms">
          {dsLoaiPhongClient?.map((item, index) => (
            <Room
              key={index}
              item={item}
              onClick={() => {
                push(`/loai-phong/${item?.id}`);
              }}
            />
          ))}
        </div>
      </div>

      <div className="roomNews">
        <div className="title">
          Tin Tức
        </div>

        <div className="list__rooms">
          {dsBaiViet?.map((item, index) => (

            <New2
              key={index}
              item={item}
              onClick={(e) => {
                push("/tin-tuc/" + item?.id)
              }}
            >
            </New2>

          ))}
        </div>
      </div>

      <div className="roomInner">
        <div className="title">
          Tin Nội Bộ
        </div>

        <div className="list__rooms">
          {dsTinNoiBo?.map((item, index) => (
            <New2
              key={index}
              item={item}
              onClick={(e) => {
                push("/tin-noi-bo/" + item?.id)
              }}
            />
          ))}
        </div>
      </div>

      <div className="roomEvents">
        <div className="title">
          Sự Kiện
        </div>
        <div className="list__rooms">
          {dsSuKien?.map((item, index) => (
            <New2
              key={index}
              item={item}
              onClick={(e) => {
                push("/su-kien/" + item?.id)
              }}
            />
          ))}
        </div>
      </div>

      <div className="roomServices">
        <div className="title">
          Dịch Vụ
        </div>

        <div className="list__rooms">
          {dsDichVu?.map((item, index) => (
            <Newdv
              key={index}
              item={item}
              onClick={(e) => { }}
            />
          ))}
        </div>
      </div>
    </Main>
  )
}

export default connect(
  (state) => ({
    page: state.dichVu.page || 1,
    size: state.dichVu.size || 10,
    total: state.dichVu.total || 0,
    isLoading: state.dichVu.isLoading || false,
    isLoadingCreate: state.dichVu.isLoadingCreate || false,
    isLoadingClient: state.loaiPhong.isLoadingClient || false,
    dsLoaiPhongClient: state.loaiPhong.dsLoaiPhongClient || [],
    dsBaiViet: state.baiViet.dsBaiViet || [],
    dsDichVu: state.dichVu.dsDichVu || [],
    dsTinNoiBo: state.tinNoiBo.dsTinNoiBo || [],
    dsSuKien: state.suKien.dsSuKien || [],
  }),
  ({
    loaiPhong: {
      onSearchLoaiPhongsClient,
    },
    baiViet: {
      onSearch: onSearchBaiViet,
    },
    dichVu: {
      onSearch: onSearchDichVu,
    },
    suKien: {
      onSearch: onSearchSuKien,
    },
    tinNoiBo: {
      onSearch: onSearchTinNoiBo,
    }
  }) => ({
    onSearchLoaiPhongsClient,
    onSearchBaiViet,
    onSearchDichVu,
    onSearchTinNoiBo,
    onSearchSuKien,
  }),

)(LoaiPhong);

