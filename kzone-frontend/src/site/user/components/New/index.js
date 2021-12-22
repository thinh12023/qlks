import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { HOST } from "client/request";
function New({
  item,
  ...props
}) {

  return (
    <Main {...props}>
      <div className="img">
        <img src={`${HOST}images/${item?.image}`} />
      </div>
      <div className="info">
        <div className="title">
          {item?.title}
        </div>
        <div className="desc">
          {item?.desc}
        </div>
        <div className="content">
          {item?.content}
        </div>
      </div>
    </Main>
  )
}

export default connect()(New);