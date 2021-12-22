import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { HOST } from "client/request";

function Newdv({
  item,
  ...props
}) {

  return (
    <Main {...props} bg={`${HOST}images/${item?.image}`}>
      <div className="name"><span>{item?.name}</span></div>
    </Main>
  )
}

export default connect()(Newdv);