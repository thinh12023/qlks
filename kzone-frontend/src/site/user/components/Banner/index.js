import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
function Banner({
  title,
  ...props
}) {

  return (
    <Main>
      <div className="title">{title}</div>
    </Main>
  )
}

export default connect()(Banner);