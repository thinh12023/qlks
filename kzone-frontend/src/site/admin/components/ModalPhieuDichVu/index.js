import React, { useImperativeHandle, useEffect, useState, forwardRef, useMemo } from "react";
import { Main } from "./styled";
import { Button, Form, Input, Spin, InputNumber, Col, Row, Select, message } from "antd";
import { connect } from "react-redux";
import { Table } from "site/admin/components/common";
const { Option } = Select;
const { TextArea } = Input;

const ModalPhieuDichVu = ({
  dsDichVu,
  isLoadingCreate,
  isLoading,
  onSearchDichVu,
  onCreateHoaDonDichVu,
  onUpdateHoaDonDichVu,
  ...props
}, ref) => {
  const { getFieldDecorator } = props.form;
  const [state, _setState] = useState({
    dsDichVuDangKy: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, idRoom = null, idBooking = null) => {
      let dsDichVuDangKy = item?.serviceBillDetails?.map((s, i) => ({
        key: i,
        numberOfService: s?.numberOfService,
        cost: s?.cost,
        note: s?.note,
        totalMoney: s?.totalMoney,
        idService: s?.idService,
        name: dsDichVu?.find(d => d?.id == s?.idService)?.name,
      }));
      setState({
        show: true,
        idBooking,
        idRoom,
        id: item?.id,
        note: item?.note,
        status: item?.status,
        totalPayment: item?.totalPayment,
        dsDichVuDangKy: [...dsDichVuDangKy],
      });
      props.form.resetFields();
    },
  }));
  const handleSubmit = () => { };
  const onChange = (type) => (e) => {
    setState({
      [type]: e?.hasOwnProperty("target") ? e.target.value : e,
    });
  };
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          if (!state.dsDichVuDangKy.length) {
            message.error("Vui lòng chọn dịch vụ!");
            return;
          }
          let payload = {
            note: props.form.getFieldValue("note") || "",
            status: props.form.getFieldValue("status") || 1,
            totalPayment: props.form.getFieldValue("totalPayment"),
            idRoom: state.idRoom,
            idBooking: state.idBooking,
            listServices: [...state.dsDichVuDangKy],
          }
          if (!state.id) {
            onCreateHoaDonDichVu(payload);
          } else {
            // onUpdateHoaDonDichVu({ id: state.id, payload });
          }
        }
        setState({ show: false });
      });
    } else setState({ show: false });
  };
  const onChangeDs = e => {
    const service = dsDichVu?.find(i => i?.id == e);
    let dsDichVuDangKy = [
      ...state.dsDichVuDangKy,
      {
        key: state.dsDichVuDangKy?.length,
        numberOfService: 1,
        cost: service?.price,
        note: "",
        totalMoney: service?.price,
        idService: service?.id,
        name: service?.name,
      }
    ];
    setState({ dsDichVuDangKy })
  }
  useEffect(() => {
    if (state.show) {
      onSearchDichVu({ dataSearch: { size: 999 } });
      if (!state.id) setState({ dsDichVuDangKy: [], totalPayment: "", status: "", note: "" });
    }
  }, [state.show]);
  useEffect(() => {
    if (state.dsDichVuDangKy && state.dsDichVuDangKy.length) {
      let totalPayment = state.dsDichVuDangKy?.reduce((acc, item, index) => {
        acc += parseFloat(item?.numberOfService * item?.cost);
        return acc;
      }, 0);
      setState({ totalPayment });
    }
  }, [state.dsDichVuDangKy]);
  let ds = useMemo(() => {
    let d = [...state.dsDichVuDangKy, { id: -1, name: "Haa" }];
    return d;
  }, [state.dsDichVuDangKy]);
  return (
    <Main
      visible={state.show}
      style={{ minWidth: 800 }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={isLoading || isLoadingCreate}>
        <div className="modal-des">
          <h4 className="title-des">
            PHIẾU DỊCH VỤ
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label={"Trạng thái thanh toán"}>
                    {getFieldDecorator("status", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng chọn trạng thái thanh toán!",
                        },
                      ],
                      initialValue: state.status,
                    })(
                      <Select
                        onChange={onChange("status")}
                        placeholder="Trạng thái thanh toán"
                      >
                        <Option key="col1" value={1}>Chưa thanh toán</Option>
                        <Option key="col2" value={0}>Đã thanh toán</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Tổng tiền thanh toán"}>
                    {getFieldDecorator("totalPayment", {
                      rules: [],
                      initialValue: state.totalPayment,
                    })(
                      <InputNumber
                        placeholder="Tổng tiền"
                        disabled
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={"Ghi chú"}>
                    {getFieldDecorator("note", {
                      rules: [],
                      initialValue: state.note,
                    })(
                      <TextArea
                        placeholder="Ghi chú"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Table
                scroll={{ x: 400, y: 400 }}
                className="custom"
                rowKey={"key"}
                columns={[
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Tên dịch vụ</div>
                      </div>
                    ),
                    width: 50,
                    dataIndex: "name",
                    align: "center",
                    key: "col1",
                    render: (value, item, index) => {
                      if (item?.id == -1) {
                        return (
                          <Select
                            placeholder="Chọn dịch vụ"
                            onSelect={onChangeDs}
                          >
                            {dsDichVu?.map((dv, index) => (
                              <Option key={`col${index}`} value={dv?.id}>
                                {dv?.name}
                              </Option>
                            ))}
                          </Select>
                        )
                      }
                      else return value;
                    },
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Giá dịch vụ</div>
                      </div>
                    ),
                    width: 50,
                    dataIndex: "cost",
                    align: "center",
                    key: "col2",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Số lượng</div>
                      </div>
                    ),
                    width: 50,
                    dataIndex: "numberOfService",
                    align: "center",
                    key: "col3",
                    render: (value, item, index) => {
                      return item?.id == -1
                        ? null
                        : (
                          <InputNumber
                            min={1}
                            value={value}
                            onChange={(e) => {
                              const value = e?.hasOwnProperty("target")
                                ? e.target.value
                                : e;
                              let dsDichVuDangKy = state.dsDichVuDangKy?.map((dv, index) => {
                                if (dv.key == item.key) {
                                  dv.numberOfService = value;
                                  dv.totalMoney = dv.cost * value;
                                }
                                return dv;
                              })
                              setState({ dsDichVuDangKy });
                            }}
                          />
                        )
                    },
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Thành tiền</div>
                      </div>
                    ),
                    width: 50,
                    dataIndex: "totalMoney",
                    align: "center",
                    key: "col4",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Xóa</div>
                      </div>
                    ),
                    width: 30,
                    dataIndex: "",
                    align: "center",
                    key: "col5",
                    render: (value, item, index) => {
                      return item?.id == -1
                        ? null
                        : (
                          <div className="list-action">
                            <Button
                              type="primary"
                              icon="delete"
                              onClick={(e) => {
                                let dsDichVuDangKy = [...state.dsDichVuDangKy?.filter(i => i.key != item?.key)];
                                dsDichVuDangKy = dsDichVuDangKy?.map((item, index) => ({
                                  ...item,
                                  key: index,
                                }));
                                setState({ dsDichVuDangKy });
                              }}
                            />
                          </div>
                        );
                    }
                  }
                ]}
                dataSource={ds}
              />
            </Form>
          </div>
        </div>
        <div className="action-footer">
          <Button
            type="danger"
            style={{
              minWidth: 100,
            }}
            onClick={onOK(false)}
          >
            Huỷ
              </Button>
          <Button
            type="primary"
            style={{
              minWidth: 100,
            }}
            onClick={onOK(true)}
          >
            Lưu
              </Button>
        </div>
      </Spin>
    </Main>
  );
};

export default Form.create({})(
  connect(
    (state) => ({
      isLoading: state.phieuDichVu.isLoading || false,
      isLoadingCreate: state.phieuDichVu.isLoadingCreate || false,
      dsDichVu: state.dichVu.dsDichVu || [],
    }),
    ({
      phieuDichVu: {
        onCreate: onCreateHoaDonDichVu,
        onUpdate: onUpdateHoaDonDichVu,
      },
      dichVu: {
        onSearch: onSearchDichVu,
      }
    }) => ({
      onCreateHoaDonDichVu,
      onUpdateHoaDonDichVu,
      onSearchDichVu,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalPhieuDichVu))
);
