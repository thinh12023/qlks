import styled from "styled-components/macro";
const Main = styled.div`
  cursor: pointer;
  background-image: url(${({ bg }) => bg});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 48%;
  height: 250px;
  max-height: 400px;
  position: relative;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.6s ease-in-out;
  border-radius: 10px;
  margin-bottom: 20px;
  &:hover {
    /* filter: saturate(2.3); */
    /* transform: scaleX(1.1); */

    & .Content{
      visibility: visible;
    }
  }
  & .Content{
    position: absolute;
    bottom: 70px;
    right: 0;
    left: 0;
    width: 100%;
    height: 65%;
    background-color: #00000090;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    visibility: hidden;
    overflow:auto;
  }

  & .name {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    border-radius: 0 0 10px 10px;
    height: 15%;
    background-color: #00000090;
    color: #ffffff;
    display: flex;
    text-align: center;
    justify-content: flex-end;
    align-items: center;
    font-size: 1rem;
    font-weight: 550;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export { Main };