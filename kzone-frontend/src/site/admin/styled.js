import styled from "styled-components/macro";

const Main = styled("div")`
  *{
    font-size: 11px ;
  }

  &.filter-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .ant-radio-group {
      margin-bottom: 15px;
    }

    & * {
      color: #fff !important;
    }

    & .ant-input-search * {
      color: #2b2b2b !important;
    }
  }
  & .panel-tag {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-end;
    border-left: none;
    background: unset;
    padding: 2px;
    margin-bottom: 0 !important;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    padding-right: 10px;
    & .right-area {
      align-self: flex-end;
      display: flex;
      & button {
        margin-right: 10px;
      }

      .ant-btn {
        display: flex;
        align-items: center;
        & i {
          color: #fff;
          font-size: unset;
          padding-right: 10px;
        }
      }
    }
  }
  & .page-container {
    display: flex;
    & .page-filter {
      width: 250px;
      max-height: calc(100% - 10px);
      overflow-y: auto;
      overflow-x: hidden;
    }
    & .page-main {
      flex: 1;
      margin-left: 10px;
      overflow: auto;
      padding: 10px;
      border-radius: 15px;
      box-shadow: 0 0 4px 1px #c4e7fb;

      & .ant-tabs-bar {
        margin: 0px;

        & .ant-tabs-nav-wrap {
          & .ant-tabs-ink-bar {
            &.ant-tabs-ink-bar-animated {
              display: none !important;
            }
          }
        }
      }
      & .ant-tabs-top-content {
        border: 1px solid #e8e8e8;
        border-top: none;
      }
      & .list-action {
        display: flex;
        & button {
          margin: 2px;
        }
      }
    }
  }
  &.pagination-table{    
    display: flex;
    justify-items: center;
    flex: 1;
    margin-top: 5px !important;
    justify-content: flex-end;
    align-items: center;
   &.label{
    color: #9FA2B4;
    margin: 0px !important;
    padding: 0;
    margin-right: 30px !important;
    font-size: 14px;
   }
   &.btn-next{
       width: 10px;
       margin-left:20px;
       cursor: pointer;
   }
   &.btn-pre{
       width: 10px;
       margin-right: 20px;
       cursor: pointer;
   }
   &.current-page{
        font-weight: bold;
        font-size: 14px;
        margin: 0px 4px!important;
        padding: 3px 10px;
        border: 1px solid #0090da;
        border-radius: 4px;
        cursor: pointer;
   }
   &.active {
    background: #0090da;
    color: #fff;
   } 
  } 
  .ant-table {
    & .ant-table-body {
      max-height: 55vh !important;
      overflow-y: auto;
    }
    & .ant-select {
      width: 100%;
    }

    & .ant-table-thead {
      & .title-box {
        min-height: 25px;
        text-align: center;
      }
    }
    & .list-action {
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
      display: flex;
    }
    & .ant-table-tbody td {
      align-items: center;
      font-size: 0.7rem !important;
      color: #000000f7 !important;
      font-weight: 450 !important; 

      & .ant-select {
        color: #000 !important;
      } 
      & p {
        color: #000 !important;
        margin-bottom: 0 !important;
      }
    }
  }
  .nav-function-top .page-sidebar .primary-nav .nav-menu > li a {
    font-size: 13px !important;
    font-weight: 600;
    color: #0090da;
  }
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
`;

export { Main };
