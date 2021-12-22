import styled from "styled-components";

const Main = styled.div`
  display: ${({ isHide }) => isHide ? `block` : `flex`};
  height: ${({ isHide }) => isHide ? `0px` : `90px`};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all .5s ease-in;
  padding: ${({ isHide }) => isHide ? `0px` : `10px 50px`};
  & .left {
    width: 96%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    & .title {
      height: 30%;
      font-size: 1.2rem;
      font-weight: 600;
      color: #de8627;
    }
    & .content {
      margin-top: 10px;
      height: 69%;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      color: #4c8bc3;
      /* white-space: nowrap; */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  & .right {
    display: flex;
    align-items: initial;
    justify-content: center;
    height: 100%;
    width: 4%;
    & .anticon-plus {
      transform: rotate(45deg);
      & svg {
        width: 20px;
        height: 20px;
        fill: #de8627;
      }
    }
  }
`;

export { Main };