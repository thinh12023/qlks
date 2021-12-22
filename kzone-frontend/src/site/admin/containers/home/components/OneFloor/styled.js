import styled from "styled-components/macro";

const Main = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-start;
  & .floor {
    flex-basis: 10%;
    margin-right: 0px;
    width: 10%;
  }
  & .list-room {
    flex-basis: 90%;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export { Main };