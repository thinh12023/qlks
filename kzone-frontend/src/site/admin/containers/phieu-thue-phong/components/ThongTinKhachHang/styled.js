import styled from "styled-components/macro";

const Main = styled("div")`
  & .title {
    font-size: 1rem !important;
    font-weight: 600;
    color: #0095cc;
    margin-bottom: 10px;
  }
  & .panelInfo {
    width: 100%;
    height: 100%;
    min-height: 100%;
    border-radius: 5px;
    box-shadow: #004f78 0px 0px 9px -2px;
    padding: 5px;
  }
`;

export { Main };
