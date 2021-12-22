import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel, FilterBox } from "site/admin/components/admin";
import ModalAddService from "site/admin/components/ModalAddService";
import ModalAddServiceType from "site/admin/components/ModalAddServiceType";
import DichVu from "./components/DichVu";
import LoaiDichVu from "./components/LoaiDichVu";
import { Main } from "./styled";
import {
  Input,
  Select,
  Button,
  Spin,
  Tabs,
} from "antd";

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

function Service({
  total,
  size,
  page,
  isLoading,
  isLoadingCreate,
  dsDichVu,
  dsLoaiDichVu,
  onSearchLoaiDichVu,
  onSearchDichVu,
  onDeleteDichVu,
  onChangeInputSearch,
  ...props
}) {
  const refTimeOut = useRef(null);
  const refAddDichVu = useRef(null);
  const refAddLoaiDichVu = useRef(null);

  const [state, _setState] = useState({
    tabKey: "1",
  });

  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const onChangeInput = (type) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (value) => {
        onChangeInputSearch({
          [type]: value.trim(),
        });
      },
      300,
      e.target.value
    );
  };

  const onChangeSelect = (type) => (e) => {
    onChangeInputSearch({
      [type]: e && e.target ? e.target.value : e,
    });
  };

  const onChange = (type) => e => {
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? e._d
          : e
    })
  }

  const onClickAction = ({ type = "add", payload = {} }) => (e) => {
    switch (type) {
      case "add":
        if (state.tabKey == "1") {
          showModalAddDichVu({}, false);
        }
        else if (state.tabKey == "2") {
          showModalAddLoaiDichVu({}, false);
        }
        break;
    }
  };
  const showModalAddDichVu = (payload, isReadOnly) => {
    if (refAddDichVu.current) {
      refAddDichVu.current.show(payload, isReadOnly);
    }
  };
  const showModalAddLoaiDichVu = (payload, isReadOnly) => {
    if (refAddLoaiDichVu.current) {
      refAddLoaiDichVu.current.show(payload, isReadOnly);
    }
  };
  useEffect(() => {
    onSearchLoaiDichVu({});
    onSearchDichVu({});
  }, []);

  return (
    <Main>
      <AdminPage>
        <Panel
          title="Quản lý dịch vụ"
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              <div className="right-area">
                <Button icon="plus" type="primary" onClick={onClickAction({})}>
                  Thêm {state.tabKey == "1" ? "dịch vụ" : "loại dịch vụ"}
                </Button>
              </div>
            </div>
          }
        >
          <div className="page-container">
            <div className="page-filter">
              {/* <FilterBox
                title="Loại dịch vụ"
                showAddButton={false}
                showExpandButton={true}
              >
                <Select
                  placeholder="Tìm kiếm loại dịch vụ"
                  onChange={onChangeSelect("idServiceType")}
                >
                  <Option value="">===Tất cả===</Option>
                  {dsLoaiDichVu?.map((t, index) => (
                    <Option key={index} value={t.id}>
                      {t.name}
                    </Option>
                  ))}
                </Select>
              </FilterBox> */}
              <FilterBox
                title="Tên dịch vụ"
                showExpandButton={true}
                showAddButton={false}
              >
                <Search
                  // value={state.search}
                  placeholder="Tìm theo tên dịch vụ"
                  onChange={onChangeInput("name")}
                />
              </FilterBox>
            </div>
            <div className="page-main">
              <div className="fixed">
                <Spin spinning={false}>
                  <Tabs
                    activeKey={state.tabKey}
                    type="line"
                    onChange={onChange("tabKey")}
                  >
                    <TabPane key={1} tab="Dịch vụ">
                      <DichVu />
                    </TabPane>
                    <TabPane key={2} tab="Loại dịch vụ">
                      <LoaiDichVu />
                    </TabPane>
                  </Tabs>
                </Spin>
              </div>
            </div>
          </div>
          <ModalAddService wrappedComponentRef={refAddDichVu} />
          <ModalAddServiceType wrappedComponentRef={refAddLoaiDichVu} />
        </Panel>
      </AdminPage>
    </Main>
  );
}
export default connect(
  (state) => ({
    page: state.dichVu.page || 1,
    size: state.dichVu.size || 10,
    total: state.dichVu.total || 0,
    isLoading: state.dichVu.isLoading || false,
    isLoadingCreate: state.dichVu.isLoadingCreate || false,
    dsDichVu: state.dichVu.dsDichVu || [],
    dsLoaiDichVu: state.loaiDichVu.dsLoaiDichVu || [],
  }),
  ({
    loaiDichVu: {
      onSearch: onSearchLoaiDichVu,
    },
    dichVu: {
      onSearch: onSearchDichVu,
      onDelete: onDeleteDichVu,
      onChangeInputSearch,
    },
  }) => {
    return {
      onSearchLoaiDichVu,
      onSearchDichVu,
      onDeleteDichVu,
      onChangeInputSearch,
    };
  }
)(Service);
