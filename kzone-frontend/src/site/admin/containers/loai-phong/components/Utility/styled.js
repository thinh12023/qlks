import styled from "styled-components";

const Main = styled.div`
  .title {
    font-size: 1rem !important;
    font-weight: 600;
    color: #0095cc;
  }
  .utility {
    width: 100%;
    display: flex;
    padding: 5px;
    flex-direction: row;
    flex-wrap: wrap;
    & .item {
      padding-right: 10px;
      width: 48%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      & .group {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        & .icon {
        margin-right: 3px;
        object-fit: contain;
        width: 14px;
        height: 14px;
        }
        & .name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

export { Main };