import styled from "styled-components/macro";

const Main = styled("div")`
  & .panel-tag {

    & .right-area {

      & .ant-select {

        & .ant-select-arrow {
          top: 40%;

          & i {
          padding: 0 !important;

          & svg {
            font-size: .8rem !important;
          }
        }
        }
      }
    }
  }

  & .txtColor{
      color:#0090da;
      font-size:1.1rem;
  }
  & .btn{
    Background-color:#ffffff;
    color:#0090da;
    font-weight:500;
    border-color:#0090da;
    border-weight:10px;
    margin-left:280px;
}
  & .form-mail{
      width:600px;
  }

  & .panel{
    color:#ffffff;
    width:700px;
    padding-left:20px;
    padding-right:20px;
    padding-bottom:20px;
}
  
`;

export { Main };
