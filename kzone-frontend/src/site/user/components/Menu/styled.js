import styled from "styled-components/macro";

const Main = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-content: flex-end;
  @media(max-width: 800px) {
    position: relative;
  }
  & .men {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    /* padding: 10px 20px; */
    border-radius: 5px;
    
    & a {
      color: #de8500;
      width: 18%;
      height: 100%;
      padding: 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      @media(max-width: 800px) {
        width: 100%;
        font-size: 1rem;
        justify-content: flex-start;
      }
    }
    @media(max-width: 800px) {
      display: ${({ isHidden }) => isHidden ? "none" : "flex"};
      flex-direction: column;
      position: absolute;
      background-color: #fff;
      box-shadow: 0 0 7px -2px #935f00;
      right: -28px;
      top: 29px;
      width: 150px;
      padding: 10px 5px;
      height: auto;
      z-index: 10;
    }
  }
  & i {
    display: none;
    font-size: 1.3rem;
    font-weight: 700;
    @media(max-width: 800px) {
      display: block;
    }
  }
  & .font-s{
    font-size: 1.1rem;
  }
`;

export { Main };