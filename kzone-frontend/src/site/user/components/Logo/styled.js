import styled from "styled-components/macro";

const Main = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  & img {
    object-fit: contain;
    width: auto;
    height: 100%;
  }
`;

export { Main };