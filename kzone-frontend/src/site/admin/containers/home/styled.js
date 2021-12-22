import styled from "styled-components/macro";

const Main = styled("div")`
  & .page-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    & .page-main {
      min-height: 70vh;
      &:first-of-type {
        flex-basis: 75%;
      }
      &:last-of-type {
        flex-basis: 22%;
      }
    }
  }
`;

export { Main };
