import styled from "styled-components/macro";

const Main = styled("div")`
  .rdw-editor-main {
    min-height: 40vh;
  }

  & > ul {
    padding: 10px;
    & li {
      color: red;
    }
  }
  .ant-input-number{
    width: 100% !important;
  }

  & .list-action {
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    display: flex;

    & button {
      background: none !important;
      color: #0075ab;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-around;

      & i {
        width: 25px;
        height: 25px;
        & svg {
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      width: 25px;
      height: 25px;
    }
  }

  .ant-table-tbody td {
    align-items: center;
    padding: 2px 10px !important;
    font-size: .7rem !important;

    & * {
     font-size: .8rem !important;
    }

    & p {
     margin-bottom: 0 !important;
    }
  }
  .title-p {
    font-size: 1rem !important;
    font-weight: 600;
    color: #0095cc;
  }
`;

export { Main };
