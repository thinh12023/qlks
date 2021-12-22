import styled from "styled-components/macro";
const Main = styled.div`
  cursor: pointer;
  background-image: url(${({ bg }) => bg});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 40%;
  height: 250px;
  max-height: 400px;
  position: relative;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.6s ease-in-out;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-right:35px;
  margin-bottom: 100px;
  shape-outside: ellipse(130px 140px at 20% 20%);
  &:hover {
    filter: saturate(2.1);
    transform: scaleX(1.1);
    & .Content{
      visibility: visible;
    }
  }


  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #008CBA;
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: .5s ease;
  }

  & .subContent{
  

  }
  & .Content{
    position: absolute;
    bottom: 70px;
    width: 100%;
    height: 52%;
    background-color: #00000090;
    color: #de8500;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 550;
    visibility: hidden;
    padding-left:10px;
    padding-top:10px;
    padding-bottom:10px;
    padding-right:10px;
    overflow-x: scroll;
    text-overflow:ellipsis;
  }

  & .name {
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
    width: 100%;
    height: 15%;
    color: #de8500;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-self:center;
    text-align: center;

    font-size: 1.1rem;
    font-weight: 550;
    flex-direction: row-reverse;
    
  }

span{
  padding-top:150px;
  display:table;
  margin:0 auto;
 
}
`;

export { Main };