import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";

function Floor({
  item,
  ...props
}) {
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  }
  useEffect(() => {

  }, [])
  return (
    <Main {...props}>
      {item?.name}
    </Main>
  );
}

export default connect(
  (state) => ({

  }),
  ({

  }) => ({

  })
)(Floor);