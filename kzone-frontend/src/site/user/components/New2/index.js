import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { HOST } from "client/request";

function New2({
  item,
  ...props
}) {

  return (
    <Main {...props} bg={`${HOST}images/${item?.image}`}>
      <div className="name"><span>{item?.title}</span></div>
      <div className="Content">{item?.content}</div>
    </Main>
  )
}

export default connect()(New2);