import styled from "styled-components/macro";

const Main = styled.div`
  /* position: fixed; */
  z-index: 1;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  & .info {
    background-color: #fff3e0;
  }
  & .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #9d5e00;
    padding-left: 50px;
    padding-right: 50px;
    box-shadow: 0 4px 4px -4px #855000d1;
  }
`;

export { Main };