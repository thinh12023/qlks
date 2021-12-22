import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Spin } from "antd";
import DichVuComponent from "../../components/DichVuComponent";
import Banner from "../../components/Banner";
function LoaiPhong({
  
  isLoadingClient,
  onSearchDichVu,
  dsDichVu,
  ...props
}) {
  useEffect(() => {
    onSearchDichVu({});
  }, []);
  return (
    <div>
      <Banner title="Dịch Vụ"></Banner>
      <Main>  
        {dsDichVu?.map((room, index) => (
          <DichVuComponent key={index} room={room} />
        ))}
      </Main>
    </div>
      
  )
}

export default connect(
  (state) => ({
    page: state.dichVu.page || 1,
    size: state.dichVu.size || 10,
    total: state.dichVu.total || 0,
    isLoading: state.dichVu.isLoading || false,
    isLoadingCreate: state.dichVu.isLoadingCreate || false,
    dsDichVu: state.dichVu.dsDichVu || [],
  }),
  ({
    dichVu: {
      onSearch: onSearchDichVu,
    }
  }) => ({
    onSearchDichVu,
  }),

)(LoaiPhong);