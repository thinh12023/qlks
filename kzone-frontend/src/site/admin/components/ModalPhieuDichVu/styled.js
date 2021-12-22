import styled from "styled-components/macro";
import { Modal } from "antd";

export const Main = styled(Modal)`
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
    justify-content: flex-end;
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

  .ant-input-number {
    width: 100%;
  }
   & .ant-table {
    .ant-select {
      width: 100%;
    }
    & .list-action {
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
      display: flex;
    }
    & .ant-table-tbody td {
     align-items: center;
     font-weight: 700 !important;
     padding: 2px 10px !important;
     font-size: .7rem !important;

     & * {
       font-size: .7rem !important;
     }

     & p {
       margin-bottom: 0 !important;
     }
    }
  }
`;
