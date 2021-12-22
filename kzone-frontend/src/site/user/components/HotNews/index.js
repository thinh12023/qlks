import React, { useEffect, useState, useRef } from "react";
import { Main } from "./style";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const HotNews = ({
  dsTinNong,
  isHide,
  onSearchHotNews,
  updateDataBaiViet,
  ...props
}) => {
  const refInterval = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ...state,
      ...data,
    }))
  }

  const getRandomNews = (data = []) => {
    let news = {};
    if (data.length != 0) {
      const length = data?.length || 0;
      const index = Math.floor(Math.random() * 10) % length;
      news = data[index];
    }
    return news;
  }

  useEffect(() => {
    onSearchHotNews();
  }, []);

  useEffect(() => {
    setState({ isHide });
    if (isHide) {
      clearInterval(refInterval.current);
      refInterval.current = null;
    }
  }, [isHide])

  useEffect(() => {
    if (dsTinNong.length != 0) {
      setState({ currentNews: { ...getRandomNews(dsTinNong) } });
    }
    // if (refInterval.current) {
    //   clearInterval(refInterval.current);
    //   refInterval.current = null;
    // }
    refInterval.current = setInterval(() => {
      if (dsTinNong.length != 0) {
        setState({ currentNews: { ...getRandomNews(dsTinNong) } });
      }
    }, 8000);
    return () => {
      clearInterval(refInterval.current);
    }
  }, [dsTinNong]);

  return (
    <Main isHide={state.isHide}>
      <div className="left">
        <div className="title">
          {!state.isHide && state.currentNews?.title}
        </div>
        <div className="content">
          {!state.isHide && state.currentNews?.content}
        </div>
      </div>
      <div className="right">
        {/* <Button
          // icon={<PlusOutlined
          //   hidden={state.isHide}
          //   onClick={() => {
          //     updateDataBaiViet({ isHide: true });
          //   }}
          // />}
          type="link"
          onClick={() => {
            updateDataBaiViet({ isHide: true });
          }}
        >
          Close
        </Button> */}
        <PlusOutlined
          hidden={state.isHide}
          onClick={() => {
            updateDataBaiViet({ isHide: true });
          }}
        />
      </div>
    </Main>
  );
}

export default connect(
  (state) => ({
    dsTinNong: state.baiViet.dsTinNong || [],
    isHide: state.baiViet.isHide || false,
  }),
  ({
    baiViet: {
      onSearchHotNews,
      updateData: updateDataBaiViet
    }
  }) => ({
    onSearchHotNews,
    updateDataBaiViet,
  })
)(HotNews);