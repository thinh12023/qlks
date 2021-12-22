import React, { useState, } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Main } from "./styled";
function Logo(props) {
  const { location } = useHistory();
  const [recent, setRecent] = useState("/");
  return (
    <Main>
      <img src={require("resources/images/logo.png")} alt="" />
    </Main>
  )
}

export default connect()(Logo);