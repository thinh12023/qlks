import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import RoomMap from "./components/RoomMap";
import Infomation from "./components/Infomation";
import { Main } from "./styled";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const CheckIn = ({
  ...props
}) => {

  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  }
  return (
    <Main>
      <AdminPage>
        <Panel
          title="Sơ đồ thuê phòng"
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              <div className="right-area">
              </div>
            </div>
          }
        >
          <div className="page-container">
            <div className="page-main">
              <div className="fixed">
                <RoomMap />
              </div>
            </div>
            <div className="page-main">
              <div className="fixed">
                <Infomation />
              </div>
            </div>
          </div>
        </Panel>
      </AdminPage>
    </Main>
  );
}
export default connect(
  (state) => {
    return {};
  },
  ({

  }) => {
    return {

    };
  }
)(CheckIn);
