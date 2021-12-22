import styled from "styled-components/macro";

const Main = styled("div")`
  .container-login100 {
    width: 100%;
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url("img/backgrounds/bg-login.png");

    ::-moz-selection {
      background: #4bac4d;
      color: #fff;
      text-shadow: none;
    }
    ::selection {
      background: #4bac4d;
      color: #fff;
      text-shadow: none;
    }
    a {
      color: #fff;
      text-decoration: none;
    }
    a:hover {
      color: #d2edd6;
      text-decoration: none;
    }
    a:active {
      border: none;
    }
    a img {
      border: none;
    }
    form {
      margin: 0;
      padding: 0;
      height: 100%;
      margin-bottom: 140px;
    }
    button,
    html input[type="button"],
    input[type="reset"],
    input[type="submit"] {
      -webkit-appearance: button;
      cursor: pointer;
    }
    a,
    a:visited,
    input,
    a:focus {
      -webkit-transition: all 0.2s ease-out;
      -moz-transition: all 0.2s ease-out;
      -ms-transition: all 0.2s ease-out;
      -o-transition: all 0.2s ease-out;
      text-decoration: none;
    }
    .fll {
      float: left;
    }
    .flr {
      float: right;
    }
    .fln {
      float: none;
    }
    .clb {
      clear: both;
    }
    .txtB {
      font-weight: bold !important;
    }
    .txtN {
      font-weight: normal !important;
    }
    .txtC {
      text-align: center !important;
      background-color: #0090da;
    }
    .w100 {
      width: 100% !important;
    }
    .w99 {
      width: 99% !important;
    }
    .dpn {
      display: none !important;
    }
    .dpib {
      display: inline-block !important;
    }
    .dpb {
      display: block !important;
    }
    .ulN ul,
    .uln ul,
    .ulN {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .ovh {
      overflow: hidden !important;
    }
    .mb0 {
      margin-bottom: 0px !important;
    }
    .mb5 {
      margin-bottom: 5px !important;
    }
    .mb15 {
      margin-bottom: 15px !important;
    }
    .mb20 {
      margin-bottom: 20px !important;
    }
    .split {
      padding: 0 5px;
      display: inline-block;
    }
    .mainWrap {
      background: #000000
        url("http://cdn-app.kiotviet.vn/img/login-bg-update.png") no-repeat
        center bottom;
      background-size: cover;
      overflow: hidden;
      min-height: 100%;
      position: relative;
    }
    @media screen and (max-width: 1366px) {
      .mainWrap {
        background-position: 0 bottom;
      }
    }
    @media screen and (max-width: 1024px) {
      .mainWrap {
        background-position: -428px 0;
        background-size: cover;
      }
    }
    .quickaction_chk {
      margin: 0;
    }
    .quickaction_chk input {
      position: absolute;
      overflow: hidden;
      clip: rect(0 0 0 0);
      margin: -1px;
      padding: 0;
      border: 0;
    }
    .quickaction_chk span {
      width: 16px;
      height: 16px;
      font-size: 16px;
      cursor: pointer;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      margin-right: 10px;
    }
    .quickaction_chk span:before {
      font-family: "Font Awesome 5 Pro";
      content: "\f04d";
      position: absolute;
      top: -2px;
      left: 0;
      margin: 0;
      color: #999999;
    }
    .quickaction_chk input:checked + span:before,
    .quickaction_chk input:checked ~ span:before {
      content: "\f14a";
      color: #5cba47;
      font-weight: 900;
    }
    .validation-summary-errors {
      padding: 10px 15px 0;
      margin-bottom: 45px;
      color: #fff;
      font-size: 15px;
    }
    .validation-summary-errors ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .validation-summary-errors ul li {
      display: inline-block;
      color: #333333;
      text-align: center;
      line-height: 24px;
    }
    .validation-summary-errors ul li + li {
      margin: 0 0 0 10px;
    }
    header {
      background: #fff;
      border-radius: 15px 15px 0 0;
    }
    .logo {
      margin: 17px 0 12px;
    }
    .logo span {
      color: #fff;
      font-size: 11px;
      font-family: Arial, Helvetica, sans-serif;
      display: block;
      margin-bottom: 6px;
    }
    .loginBox {
      width: 440px;
      margin: 165px auto 20px;
      z-index: 5;
      overflow: hidden;
      height: 100%;
    }
    @media screen and (max-width: 1600px) {
      .loginBox {
        margin-top: 110px;
      }
    }
    @media screen and (max-width: 1366px) {
      .loginBox {
        margin-top: 95px;
      }
    }
    @media screen and (max-width: 1024px) {
      .loginBox {
        margin-top: 155px;
      }
    }
    @media screen and (max-width: 568px) {
      .loginBox {
        max-width: calc(100% - 20px);
      }
    }
    .loginFr {
      background: #ffffff;
      overflow: hidden;
      padding: 20px 25px 30px;
    }
    .loginFr label {
      display: block;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #999999;
    }
    .loginFr label.checkbox {
      display: inline-block;
      font-size: 11px;
    }
    .loginFr h3 {
      text-align: center;
      padding: 0 0 11px;
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }
    .loginFr .kv {
      font-size: 15px;
      color: #333;
      padding: 0 10px;
      line-height: 33px;
      border-radius: 0 2px 2px 0;
      background: #e4e4e4;
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .loginFr .remb {
      margin: 15px 0 0;
      color: #333333;
      display: flex;
      align-items: center;
    }
    .loginFr .remb label {
      font-size: 11px;
      color: #333333;
      text-shadow: none;
      line-height: 16px;
      white-space: nowrap;
      cursor: pointer;
    }
    .loginFr .remb .split {
      padding: 0 15px;
      margin-top: -1px;
      color: #bfbfbf;
    }
    .loginFr .remb a {
      text-decoration: none;
      color: #999999;
    }
    .loginFr .remb .prettycheckbox a:before,
    .loginFr .remb .prettyradio a:before {
      color: #fff;
      top: 0;
    }
    .loginFr .remb .remember-password input {
      background: transparent;
      border: none;
      color: #999999;
    }
    .loginFr .remb .remember-password input:hover {
      color: #333333;
    }
    .loginFr input.captcha[type="text"] {
      width: 50%;
      display: inline-block;
    }
    .loginFr input[type="text"],
    .loginFr input[type="password"] {
      border: none;
      background: transparent;
      font-size: 15px;
      color: #111111;
      margin: 0;
      overflow: visible;
      display: block;
      box-sizing: border-box;
      border-bottom: 1px solid #d1d1d1;
      font-family: Roboto, Helvetica, Arial, sans-serif;
    }
    .loginFr input[type="text"]:-webkit-autofill,
    .loginFr input[type="password"]:-webkit-autofill,
    .loginFr input[type="text"]:focus,
    .loginFr input[type="password"]:focus {
      background-color: transparent !important;
      background-image: none;
      border-color: #4bac4d;
      border-width: 2px;
      padding-bottom: 11px;
      -webkit-box-shadow: 0 0 0px 1000px white inset;
    }
    .loginFr input[type="text"]::placeholder,
    .loginFr input[type="password"]::placeholder {
      color: #999999;
    }
    .loginFr img {
      vertical-align: top;
    }
    .loginFr .refresh {
      vertical-align: middle;
      display: inline-block;
      border-radius: 100%;
      text-align: center;
      width: 31px;
      height: 31px;
      line-height: 31px;
      background: #147dba;
    }
    .loginFr .refresh:hover {
      background: #359e15;
    }
    .loginFr .fa-refresh {
      font-size: 18px;
      color: #fff;
      margin-top: 6px;
    }
    .loginFr .posR {
      display: flex;
      align-items: flex-start;
      margin-bottom: 25px;
    }
    .login-verify .loginFr {
      padding: 30px 25px 35px;
      border-radius: 15px;
    }
    .login-verify .loginFr h3 {
      padding: 0;
    }
    .login-verify .loginFr label {
      color: #666666;
      font-weight: normal;
      text-align: center;
      width: 100%;
      line-height: 24px;
    }
    .login-verify .loginFr .posR {
      margin-top: 75px;
      margin-bottom: 62px;
      & input {
        width: 100%;
      }
    }
    .login-verify .text-content {
      margin-top: 30px;
      margin-bottom: 33px;
      position: relative;
    }
    .login-verify .text-content label {
      font-size: 15px;
      color: #666666;
    }
    .login-verify .text-content p {
      color: #333333;
      margin-bottom: 0;
    }
    .login-verify .text-content #messageOTP {
      margin-bottom: 45px;
      padding: 0 20px;
    }
    .login-verify .text-content .form-group {
      margin-top: 5px;
      display: block;
      text-align: center;
    }
    .login-verify .text-content .validation-summary-errors {
      margin-bottom: 0;
      padding: 0;
      text-align: center;
      width: 100%;
    }
    .login-verify .text-content .validation-summary-errors li {
      font-size: 11px;
      color: #e64040;
      margin-top: -4px;
    }
    .login-verify .text-content #countdownOTP {
      color: #666666 !important;
      font-size: 11px;
    }
    .lgBtn {
      text-align: center;
      display: flex;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      overflow: hidden;
    }
    .lgBtn.btn-custom {
      border-radius: 0;
    }
    .lgBtn.btn-custom .loginBtn {
      border-radius: 5px;
      border: 1px solid #4bac4d;
      background: #4bac4d;
    }
    .lgBtn.btn-custom .loginBtn input {
      padding: 0;
      font-weight: 600;
    }
    .lgBtn.btn-custom .loginBtn input:focus {
      background: #2a6e05;
      border-color: #84ab6f #1b4503 #122e02 #578d3a;
      text-shadow: 2px 2px 2px #133202;
    }
    .lgBtn.btn-custom .loginBtn.loginBtnSale {
      background: #fff;
      margin-right: 12px;
    }
    .lgBtn.btn-custom .loginBtn.loginBtnSale input {
      color: #4bac4d;
    }
    .lgBtn.btn-custom .loginBtn.loginBtnSale input:focus {
      color: #fff;
      border-radius: 3px;
    }
    .field-validation-error {
      background: #db4e65;
      border-radius: 2px;
      font-size: 11px;
      padding: 6px 15px;
      color: #fff;
      position: absolute;
      right: 0;
      bottom: -29px;
    }
    .loginBtn {
      background: #0080c9;
      padding: 0;
      cursor: pointer;
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      height: 50px;
    }
    .loginBtn span {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 16px;
      display: block;
      margin-left: 5px;
      outline: none;
    }
    .loginBtn span:focus {
      background: #004880;
      border-color: #6c96b6 #002d51 #001e36 #366f9b;
      text-shadow: 2px 2px 2px #00223d;
    }
    .loginBtn:hover {
      background: #004880;
      border-color: #6c96b6 #002d51 #001e36 #366f9b;
    }
    .loginBtn i {
      font-size: 16px;
      color: #fff;
      /* margin-top: -1px; */
      /* position: absolute; */
      /* top: 16px; */
      /* left: 66px; */
    }
    @media screen and (max-width: 568px) {
      .loginBtn i {
        left: 44px;
      }
    }
    .loginBtnSale {
      background: #4bac4d;
    }
    .loginBtnSale input:focus {
      background: #2a6e05;
      border-color: #84ab6f #1b4503 #122e02 #578d3a;
      text-shadow: 2px 2px 2px #133202;
    }
    .loginBtnSale:hover {
      background: #2a6e05;
      border-color: #84ab6f #1b4503 #122e02 #578d3a;
    }
    .loginBtnSale .fa {
      text-shadow: 1px 1px 2px #187212;
    }
    .fgBtn input {
      padding-left: 48px;
    }
    .fgBtn .fa {
      font-size: 20px;
      top: 14px;
    }
    .loginNews {
      background: #f5f5f5;
      padding: 10px;
      width: 590px;
      margin: 0 auto;
      top: -100px;
    }
    .loginNews .loginNewsBtn a {
      display: inline-block;
      overflow: hidden;
      height: 16px;
      width: 0;
      padding-left: 17px;
      background: url(../img/nextprev.png) no-repeat 0 0;
    }
    .loginNews .loginNewsBtn a:hover {
      background-position: 0 -17px;
    }
    .loginNews .loginNewsBtn a.next {
      background-position: -16px 0;
    }
    .loginNews .loginNewsBtn a.next:hover {
      background-position: -17px -17px;
    }
    .other {
      font-size: 11px;
      color: #969696;
      text-align: center;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding-bottom: 70px;
    }
    .other a {
      color: #969696;
    }
    .captcha-bg {
      display: inline-block;
      vertical-align: top;
      width: 90px;
      height: 31px;
      background: url(https://cdn-app.kiotviet.vn/retailler/Content/captcha.png)
        no-repeat center center;
      margin: 0 5px 0 15px;
    }
    .confirm-phone--login {
      padding-left: 15px;
    }
    .confirm-phone--login ul {
      padding: 0;
      margin: 0;
    }
    .confirm-phone--login ul li {
      margin-right: 12px;
    }
    .confirm-phone--login ul li:last-child {
      margin-right: 0;
    }
    .confirm-phone--login ul li input[type="text"] {
      text-align: center;
      padding: 0 0 10px;
      font-size: 24px;
      color: #333333;
    }
    .confirm-phone--login ul li input[type="text"]:focus {
      padding-bottom: 9px;
    }
    #btnResent {
      color: #004ae1;
      text-decoration: none;
      font-size: 11px;
      cursor: pointer;
    }
    .forgot-password .loginFr {
      border-radius: 15px;
      padding: 30px 25px 35px;
    }
    .forgot-password .loginFr h3 {
      padding-bottom: 31px;
    }
    .forgot-password .loginFr #UserName {
      margin-top: 20px;
    }
    .forgot-password .forgot-container {
      position: relative;
    }
    .forgot-password .forgot-container .choose-container {
      display: flex;
      margin-bottom: 25px;
    }
    .forgot-password .forgot-container .choose-container .choose-content {
      padding-left: 20px;
    }
    .forgot-password .forgot-container .lgBtn {
      margin-top: 40px;
    }
    .forgot-password .forgot-container .phone-title--container {
      text-align: center;
    }
    .forgot-password .forgot-container .phone-title--container label {
      font-weight: 400;
      font-size: 15px;
      color: #666666;
      padding: 0 25px;
    }
    .forgot-password .forgot-container .phone-title--container label strong {
      color: #333333;
      font-weight: 600;
    }
    .forgot-password .forgot-container .form-group {
      text-align: center;
      margin-top: 30px;
    }
    .forgot-password .forgot-container .form-group.confirm-phone--login {
      margin-top: 50px;
    }
    .forgot-password .forgot-container .label-verify {
      display: none;
    }
    .forgot-password .forgot-container .validation-summary-errors {
      margin-bottom: 0;
      text-align: center;
      position: absolute;
      width: 100%;
      margin-top: -15px;
    }
    .forgot-password .forgot-container .validation-summary-errors ul li {
      color: #e65a67;
    }
    .forgot-password #messageOTP {
      font-weight: 400;
      font-size: 15px;
      color: #333333;
      text-align: center;
      padding: 0 30px;
      line-height: 18px;
      margin-bottom: 60px;
    }
    .forgot-password #messageOTP p {
      margin-top: 25px;
      color: #666666;
      font-size: 15px;
    }
    .forgot-password .confirm-phone--login {
      margin-top: 40px;
    }
    .forgot-password .warning--required {
      display: flex;
    }
    .forgot-password .warning--required .validation-summary-errors {
      background: transparent;
      margin: 0;
      padding: 0;
    }
    .forgot-password .validation-summary-errors {
      background: #fbe6e8;
      padding: 10px 25px;
      margin: 0 -25px;
      text-align: center;
    }
    .forgot-password .validation-summary-errors ul li {
      color: #e65a67;
    }
    .forgot-password .validation-summary-valid ul {
      margin: 0;
    }
    .prettyradio {
      position: relative;
      display: flex;
      align-items: center;
    }
    .prettyradio label {
      font-size: 15px;
      color: #666666;
      font-weight: 400;
      display: inline-block;
      margin-bottom: 3px;
      padding-left: 50px;
      position: relative;
    }
    .prettyradio label strong {
      color: #333333;
      font-weight: 600;
    }
    .prettyradio a {
      display: inline-block;
      cursor: pointer;
      position: absolute;
      font-weight: 400;
      top: 50%;
      left: 15px;
      transform: translate(0, -50%);
      width: 16px;
      height: 16px;
    }
    .prettyradio a:before {
      font-family: "Font Awesome 5 Pro";
      font-weight: 400;
      content: "\f111";
      color: #666;
      font-size: 16px;
    }
    .prettyradio a:focus {
      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 100%;
      -webkit-transition: all 0.2s ease-out;
      transition: all 0.2s ease-out;
      outline: 0;
    }
    .prettyradio a.checked:before {
      content: "\f192";
      color: #4bac4d;
    }
    .prettyradio input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 10;
      cursor: pointer;
      margin-top: 12px;
      margin-left: 16px;
    }
    .prettyradio input:focus {
      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 100%;
      -webkit-transition: all 0.2s ease-out;
      transition: all 0.2s ease-out;
      outline: 0;
    }
    .prettyradio input:checked + a:before {
      content: "\f192";
      color: #4bac4d;
    }
    .login-forgot .validation-summary-errors {
      background: #fbe6e8;
      margin: -10px -25px 20px;
      padding: 6px 45px;
      text-align: center;
    }
    .login-forgot .validation-summary-errors ul li {
      color: #e65a67;
      font-size: 11px;
    }
    .login-forgot .loginBtn input {
      font-weight: 600;
    }
    .reset-password--container .loginFr {
      border-radius: 15px;
      padding: 30px 25px 35px;
    }
    .reset-password--container .loginFr h3 {
      padding-bottom: 30px;
    }
    .reset-password--container .validation-summary-errors {
      padding: 10px 0 10px 25px;
      margin: 0 -25px 25px -25px;
      background: #fbe6e8;
    }
    .reset-password--container .validation-summary-errors ul li {
      color: #e65a67;
      display: block;
    }
    .reset-password--container .lgBtn {
      border-radius: 5px;
      margin-top: 50px;
    }
    .reset-password--container .lgBtn .loginBtn {
      background: #4bac4d;
    }
    .reset-password--container .lgBtn .loginBtn input {
      padding: 0;
      font-weight: 600;
    }
    .reset-password--container .lgBtn .loginBtn input:focus {
      background: #2a6e05;
      border-color: #84ab6f #1b4503 #122e02 #578d3a;
      text-shadow: 2px 2px 2px #133202;
    }
    footer {
      border-top: 1px solid #e8e8e8;
      padding: 20px 0 15px;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
  & .loginFr {
    & input {
      width: 100%;
    }
  }
`;

export { Main };
