import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";

function UnconfirmedBooking({
  booking,
  ...props
}) {
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  }
  const onClick = (type) => e => {
  }
  return (
    <Main {...props}>
      <div className="name">
        Khách: <span>{booking?.guest?.profile?.name}</span> đã đặt online!
      </div>
    </Main>
  );
}

export default connect(
  (state) => ({
  }),
  ({
  }) => ({
  })
)(UnconfirmedBooking);