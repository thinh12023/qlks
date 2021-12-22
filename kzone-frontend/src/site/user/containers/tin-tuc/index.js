import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import New from "../../components/New";
import Banner from "../../components/Banner";
import { Icon, message } from "antd";
import { useHistory } from "react-router";
import { Pagination, Table } from "site/admin/components/common";

function LoaiPhong({
  dsBaiViet,
  onSearchBaiViet,
  onSizeChange,
  page,
  size,
  total,
  ...props
}) {

  const { push } = useHistory();
  useEffect(() => {
    onSearchBaiViet({size: 3})
  }, []);

  const onChangePage = (page) => {
    onSearchBaiViet({ page: page });
  };
  const onChangeSize = (size) => {
    onSizeChange({ size: size });
  };
  return (
    <Main>
      <Banner title="Tin Tức Khách Sạn" />
      <div className="main">
        {dsBaiViet?.map((item, index) => {
          let direction = "row";
          if (index % 2 == 0) {
            direction = "row-reverse";
          }
          else direction = "row";
          return (
            <New
              direction={direction}
              item={item}
              key={index}
              onClick={(e) => {
                push("/tin-tuc/" + item?.id)
              }}
            />
          )
        })}

<div className="footer">
                    {total > 0 && (
                      <Pagination
                        onPageChange={onChangePage}
                        onChangeSize={onChangeSize}
                        page={page}
                        size={size}
                        total={total}
                        style={{ justifyContent: "flex-end" }}
                      />
                    )}
                  </div>
      </div>

    </Main>
  )
}

export default connect(
  (state) => ({
    page: state.baiViet.page || 1,
    size: state.baiViet.size || 3,
    total: state.baiViet.total || 0,
    dsBaiViet: state.baiViet.dsBaiViet || [],
  }),
  ({
    baiViet: {
      onSearch: onSearchBaiViet,
      onSizeChange,
    }
  }) => ({
    onSearchBaiViet,
    onSizeChange,
  })
)(LoaiPhong);