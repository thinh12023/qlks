import styled from "styled-components/macro";

const Main = styled.div`
    width: 40%;
    background-color: #ffffff;
    border-radius: 13px;
    color: #a07e00;
    padding: 10px 10px;
    box-shadow: inset 0 0 10px -5px #000;
    margin-bottom: 20px;
  & * {
    margin-bottom: 10px;
  }
  & .name {
    font-size: 1.8rem;
    font-weight: 550;
  }
  & .img {
    width: 100%;
    box-shadow: 0 0 5px -3px #001723;
    border-radius: 5px;
    height: 250px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: space-around;
    -webkit-justify-content: space-around;
    -ms-flex-pack: space-around;
    justify-content: space-around;
    overflow: hidden;
    & img {
      height: 250px;
      object-fit: contain;
      transition: all .2s ease-in-out;
      &:hover {
        transform: scale(1.3,1.3);
      }
    }
  }
  & .numberOfBed, .numberOfPerson {
    font-weight: 600;
  }
  & ._f {
    color: #a07e00;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .rate {
      font-size: 1.3rem;
      font-weight: 550;
    }
    & button {

    }
  }
  @media(max-width: 900px) {
    width: 80%;
  }
  @media(max-width: 600px) {
    width: 100%;
  }
`;

export { Main };