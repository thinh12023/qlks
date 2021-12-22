import styled from "styled-components/macro";

const Main = styled("div")`
  & * {
    font-size: .7rem !important;
  }
  & .panel-tag {
    display: flex;
    flex-direction: row;
    align-items: center;

    & button {
      margin-left: 10px;
    }
    & .ant-select-arrow {
      display: none;
    }
  }
  & .booking {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .booking-info {
      &:first-of-type {
      }
      &:last-of-type {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }
    }
  }
  & .list-action {
    display: flex;
    justify-content: space-around;
  }
  .error-message {
    width: 300px;
    height: auto;
    color: #282828;
    border-radius: 3px;
    box-shadow: 0px 1px 1px 1px grey;
  }
  & .view-main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .ant-input-number {
    width: 100%;
    & .ant-input-number-handler-wrap {
      display: none;
    }
  }
  .ant-time-picker {
    width: 100%;
  }
`;

export { Main };
