import styled from "styled-components/macro";
import { Modal } from "antd";

const Main = styled(Modal)`
  border-radius: 5px;
  padding: 10px;
  margin-left: 10px;
  overflow-x: auto;
  margin-left: 10px;
  min-width: 800px;
  width: 800px;
& .ant-modal-body {
    padding: 20px;
    & .ant-form {
      & .ant-form-item {
        margin-bottom: 10px !important;
        & .ant-form-item-label {
          line-height: 25px;
          & .ant-form-item-required {
            // &:before {
            //   display: none;
            // }
          }
        }
        & .ant-input-number{
          width: 100%;
        }
      }
    }
  }
  .modal-des {
    color: #333;
    & p {
      margin-bottom: 0;
    }
    & .content-des {
      font-weight: 500;
    }
    & .title-des {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      color: #165974;
      padding-bottom: 5px;
      border-bottom: 0.5px solid #165974;
    }
  }
  & .action-footer {
    margin-top: 15px;
    justify-content: center;
    display: flex;
    & button {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  & .ant-modal-footer {
    border-top: 0;
    padding: 0px;
  }
  & .title {
    font-size: 1rem !important;
    font-weight: 600;
    color: #0095cc;
  }

    & ._row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & .floor {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      width: 15%;
      background-color: #1565C0;
      padding: 5px;
    }
    & .rooms {
      width: 84%;
      overflow-x: scroll;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      & .info {
        padding: 10px;
        font-size: .8rem !important;
        font-weight: 600;
        background-color: #009633;
        width: 100px;
        height: 80px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
        & .title {
          color: #fff;
        }
        & .room-type {
          font-size: large.6rem;
        }
      }
    }
  
  }
`;

export { Main };
