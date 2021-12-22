import styled from "styled-components/macro";

export const Main = styled.div`
  overflow-x: auto;
  box-shadow: 0 0px 40px 0px rgb(0 0 0 / 15%);
  -moz-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 0 0px 40px 0px rgb(0 0 0 / 15%);
  -o-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
  -ms-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
  & table {
    border: none !important;
    & thead {
      -webkit-box-shadow: 0 5px 20px 0px rgb(0 0 0 / 10%);
      & th {
        font-size: 11px;
        color: #6d8ec9;
        line-height: 1.1;
        font-weight: bold;
        vertical-align: middle;
      }
    }
    & tbody {

      & td {
        font-size: 11px;
        color: #808080;
        line-height: 1.2;
        & .list-action {
          & .ant-btn-primary {
            background-color: #1e88e5;
          }
        }
      }
    }
  }
  &.ant-table {
    & .ant-table-body {
      min-height: 30vh !important; 
    }
  }
`;
