import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Icon, message } from "antd";
function LoginScreen(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = () => () => {
    props.onLogin({ password, username }).then((s) => {
      props.history.replace("/admin");
    });
  };
  useEffect(() => {
    if (props.auth) {
      props.history.replace("/");
    }
  }, []);
  const onKeyDown = (e) => {
    if (e.nativeEvent.code === "Enter") {
      onLogin();
    }
  };
  return (
    <Main>
      <div className="container-login100">
        <div className="login-form">
          <section className="loginBox posR ovh login-forgot">
            <header className="txtC txtB">
              <a href className="logo dpib" tabIndex={-1}>
                <span>Đăng nhập hệ thống</span>
              </a>
            </header>
            <section className="loginFr ovh vi-VN">
              <h3 style={{ display: "none" }}>Đăng nhập</h3>
              <div className="posR">
                <input
                  name="username"
                  tabIndex={1}
                  type="text"
                  value={username}
                  placeholder="Nhập tài khoản"
                  onKeyDown={onKeyDown}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div className="posR">
                <input
                  name="password"
                  tabIndex={2}
                  type="password"
                  value={password}
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={onKeyDown}
                />
              </div>
            </section>
            <section className="lgBtn">
              <span className="loginBtn" onClick={onLogin()}>
                <Icon type="reconciliation" />
                <span tabIndex={4} name="quan-ly" type="submit">
                  Quản lý
                </span>
              </span>
            </section>
          </section>
        </div>
      </div>
    </Main>
  );
}

export default connect(
  (state) => ({
    auth: state.auth.auth,
  }),
  ({ auth: { onLogin, updateData } }) => {
    return {
      onLogin,
      updateData,
    };
  }
)(LoginScreen);
