import React, { useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import Room from "../Room";
import Floor from "../Floor";

function OneFloor({
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
  return (
    <Main {...props}>
      <div className="floor">
        <Floor item={item?.floor} />
      </div>
      <div className="list-room">
        {item?.rooms?.map((room, index) => (
          <Room
            item={room}
            key={index}
          />
        ))}
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
)(OneFloor);