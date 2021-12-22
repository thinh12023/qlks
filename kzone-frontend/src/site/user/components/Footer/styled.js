import styled from "styled-components/macro";

const Main = styled.div`
  padding: 10px 20px;
  width: 100%;
  min-height: 15vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  & .footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & ._col {
      padding: 0 20px;
      width: 25%;
      display: flex;
      flex-direction: column;
      & ._row {
        margin-bottom: 10px;
        & div {
          margin-left: 5px;
        }
        color: #9d5e00;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start; 
        align-items: center;
        & img {
          width: 40%;
          border-radius: 3px;
          @media(max-width: 800px) {
            width: 15%;
          }
        }
        @media(max-width: 800px) {
          justify-content: flex-start;
          margin-bottom: 10px;
        }
      }
      & .social {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        svg {
          cursor: pointer;
          font-size: 3.3rem;
        }
        @media(max-width: 800px) {
          svg {
            font-size: 1.3rem;
          }
        }
      }
      @media(max-width: 800px) {
        width: 100%;
      }
    }
    @media(max-width: 800px) {
      flex-direction: column;
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

export { Main };