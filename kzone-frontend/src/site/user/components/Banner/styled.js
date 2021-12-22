import styled from "styled-components/macro";
import banner from "resources/images/banner.jpg";

const Main = styled.div`
  display: flex;
  background-image: url(${banner});
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 20vh;
  max-height: 20vh;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 20px;
`;

export { Main };