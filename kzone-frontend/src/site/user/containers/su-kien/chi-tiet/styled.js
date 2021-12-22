import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & .img {
    padding: 20px 350px;
    & img {
      width: 100%;
      object-fit: contain;
    }
  }
  & .content {
    text-align: justify;
    padding: 40px 350px;
    font-size: 1.2rem;
    line-height: 2;
  }
`;

export { Main };