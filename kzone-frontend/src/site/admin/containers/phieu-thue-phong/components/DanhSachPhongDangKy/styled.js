import styled from "styled-components/macro";

const Main = styled("div")`
  margin-left: 10px;
  .title-box {
    min-height: 30px !important;
  }
  .title {
    font-size: 1rem !important;
    font-weight: 600;
    color: #0095cc;
    display: flex;
    justify-content: space-between;
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

export { Main };
