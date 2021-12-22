import styled from "styled-components/macro";

const Main = styled("div")`
  & .title {
    font-size: 1rem !important;
    font-weight: 600;
    color: #0095cc;
    margin-bottom: 10px;
  }
  & .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  & .panelInfo {
    width: 60%;
    height: 100%;
    min-height: 100%;
    border-radius: 5px;
    box-shadow: #004f78 0px 0px 9px -2px;
    padding: 5px;
    &:last-of-type{
      width: 39%;
    }
  }
`;

export { Main };
