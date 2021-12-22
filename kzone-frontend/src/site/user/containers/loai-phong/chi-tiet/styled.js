import styled from "styled-components";

const Main = styled.div`
  /* padding: 30px 30px; */
  /* overflow-y: auto; */
  min-height: 90vh;
  .image-gallery-svg {
    width: 30px;
    height: 50px;
  }
  .image-gallery-icon:active {
      background-color: transparent;
    }
  & ._row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: auto;
    justify-content: space-between;
    @media(max-width: 800px) {
      flex-direction: column;
    }
    width: 98%;
    & ._col {
      box-shadow: 0 0 8px -5px #000;
    border-radius: 10px;
    }
    & .col1 {
      padding: 5px 5px;
      min-height: 87vh;
      .title {
        font-size: 1.1rem;
        font-weight: 550;
        color: #b36f19;
        margin-bottom: 10px;
      }
      .content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        
        .item {
          width: 48%;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .icon {
            width: 20%;
            margin-right: 5px;
            img {
              width: 20px;
              height: 20px;
              object-fit: contain;
            }
          }
          .name {
            color: #005e7a;
            width: 80%;
            font-size: .9rem;
            font-weight: 550;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .content1 {
        .item {
          display: flex;
          margin-bottom: 5px;
          align-items: center;
          justify-content: flex-start;
          flex-direction: row;
          .label {
            margin-right: 2px;
            font-size: .9rem;
            font-weight: 450;
          }
          .value {
            color: #005e7a;
            font-size: .9rem;
            font-weight: 600;
          }
        }
      }
    }
    &:first-of-type {
      & ._col {
        &:nth-of-type(1) {
          width: 20%;
        }
        &:nth-of-type(2){
          box-shadow: unset;
          border-radius: unset;
          width: 52%;
          min-height: 75vh;
          max-height: 75vh;
          @media(max-width: 800px) {
            width: 100%;
            margin-bottom: 20px;
          }
          & img {
            width: 100%;
            max-height: 75vh;
            object-fit: contain;
          }
        }
        &:nth-of-type(3) {
          width: 28%;
          & ._i {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & img {
              width: 100px;
              height: 100px;
              border-radius: 5px;
            }
            & .price {
              padding: 0 5px;
              font-size: 1.5rem;
              font-weight: 400;
              color: #b36f19;
            }
          }
        }
        &:nth-of-type(3) {
          width: 24%;
          min-height: 80vh;

          @media(max-width: 800px) {
            width: 100%;
            margin-bottom: 20px;
          }
          & .form {
            overflow-y: auto;
            width: 100%;
            height: 100%;
            padding: 10px 10px;
          }
        }
      }
    }
  }
`;

export { Main };