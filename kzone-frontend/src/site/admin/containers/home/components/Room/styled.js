import styled from "styled-components/macro";

const Main = styled.div`
  color: #fff;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ bgColor }) => bgColor};
  width: 250px;
  min-width: 250px;
  border-top: 2px solid #1565C0;
  border-bottom: 2px solid #1565C0;
  border-left: 2px solid #1565C0;
  padding: 5px;

  span {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &:first-of-type {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  &:last-of-type {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border-right: 2px solid #1565C0;
  }
  .room {
    font-size: 1rem;
    font-weight: 550;
    color: #fff;
    width: 20%;
  }
  .info {
    margin-left: 10px;
    width: 78%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: #fff;
    position: relative;
    & .guest {
      color: #fff;
      background-color: #1565C0;
      padding:2px 5px;
      border-radius: 3px;
    }
    & .date {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-end;
      & .from {
        color: #fff;
      }
      & .to {
        color: #fff;
      }
    }
    & .travel {
      position: absolute;
      right: 2px;
      bottom: -5px;
      flex-wrap: wrap;
      width: 50%;
      overflow: hidden;
      font-size: .7rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: brown;
      padding: 2px 5px;
      border-radius: 2px;
    }
    & .number {

    }
  }
`;

export { Main };