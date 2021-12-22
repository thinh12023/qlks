import styled from "styled-components/macro";
const Main = styled.div`
  margin-bottom: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: ${({ direction }) => `${direction}`};
  justify-content: space-between;
  & .img {
    width: 40%;
    & img {
      transition: all 470ms cubic-bezier(0.34, 1.25, 0.3, 1);
      width: 100%;
      border-radius: 5px;
      &:hover {
        transform: scale(1.3, 1.3);
      }
    }
  }
  & .info {
    width: 58%;
    & .title {
      font-size: 2rem;
      font-weight: 650;
      margin-bottom: 10px;
    }
    & .desc {
      margin-bottom: 10px;
    }
    & .content {
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 1.2rem;
    }
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export { Main };