import styled from "styled-components/macro";

const Main = styled.div`
  padding: 20px 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  @media(max-width: 900px) {
    flex-direction: column;
    padding: 20px 20px;
  }
`;

export { Main };