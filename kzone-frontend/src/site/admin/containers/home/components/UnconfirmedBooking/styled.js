import styled from "styled-components/macro";

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 50px;
  background-color: #d5ab4f;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  & .name {
    color: #0459ba;
    font-size: 1.1rem;
    & span {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
`;

export { Main };