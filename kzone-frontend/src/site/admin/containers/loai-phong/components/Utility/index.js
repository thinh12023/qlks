import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { HOST } from "client/request";
import { Checkbox } from "antd";
import moment from "moment";

const Utility = ({
  filterOption,
  title,
  currentItem,
  form,
  onSearchTienIch,
  dsTienIch,
  setParentState,
  dsTienIchPhong,
  ...props
}) => {

  const [state, _setState] = useState({
    dsTienIchPhong: [],
  });
  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const onChange = (type) => (e) => {
    let newState = {
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
          : e,
    };
    setState(newState);
  };

  const handleChangeUtility = (item) => (e) => {
    let ds = dsTienIchPhong || [];
    const checked = e?.target.checked;
    if (checked) {
      ds.push(item);
    }
    else ds = ds?.filter(i => i.id != item?.id);
    setParentState({ dsTienIchPhong: [...ds] });
  }

  useEffect(() => {
    onSearchTienIch({ page: 0, size: 9999, dataSearch: { active: 0 } });
  }, []);

  return (
    <Main>
      <div className="title">
        {title}
      </div>
      <div className="utility">
        {dsTienIch?.map((item, index) => (
          <div className="item" key={index}>
            <div className="group">
              <img className="icon" src={`${HOST}images/${item?.image}`} alt={`${item?.name}`} />
              <div className="name">
                {item?.name}
              </div>
            </div>
            <div className="check">
              <Checkbox
                checked={dsTienIchPhong?.map(i => i?.id)?.includes(item?.id)}
                onChange={handleChangeUtility(item)}
              />
            </div>
          </div>
        ))}
      </div>
    </Main>
  )
}

export default connect(
  (state) => ({
    dsTienIch: state.tienIch.dsTienIch || [],
  }),
  ({
    tienIch: {
      onSearch: onSearchTienIch,
    }
  }) => ({
    onSearchTienIch,
  }),
)(Utility);