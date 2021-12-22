import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import New from "../../components/New";
import Banner from "../../components/Banner";
import { Icon, message } from "antd";
import { useHistory } from "react-router";
import { Pagination, Table } from "site/admin/components/common";

function LoaiPhong({
  dsSuKien,
  onSearchSuKien,
  page,
  size,
  total,
  onSizeChange,
  ...props
}) {
  const { push } = useHistory();
  useEffect(() => {
    onSearchSuKien({ size: 3 })
  }, []);

  const onChangePage = (page) => {
    onSearchSuKien({ page: page });
  };
  const onChangeSize = (size) => {
    onSizeChange({ size: size });
  };
  return (
    <Main>
      <Banner title="Sự Kiện" />
      <div className="main">
        {dsSuKien?.map((item, index) => {
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
                push("/su-kien/" + item?.id)
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
    page: state.suKien.page || 1,
    size: state.suKien.size || 3,
    total: state.suKien.total || 0,
    dsSuKien: state.suKien.dsSuKien || [],
  }),
  ({
    suKien: {
      onSearch: onSearchSuKien,
      onSizeChange,

    }
  }) => ({
    onSearchSuKien,
    onSizeChange,

  })
)(LoaiPhong);