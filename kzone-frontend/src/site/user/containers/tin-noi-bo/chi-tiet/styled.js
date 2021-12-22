import styled from "styled-components";

const Main = styled.div`

display: inline;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  .all{
    flex:5;
    margin-top:2%;
    margin-left:5%;
    margin-right:5%;
    border: 2px solid green;
    border-radius: 25px;
  }
  
  & .leftNews{
    text-align: center;
    flex:2;
    margin-top:2%;
    margin-left:2%;
    border: 2px solid green;
    border-radius: 25px;
    height:10%;
    cursor: pointer;
  }

   .leftImg{
    border-radius: 25px;
    width:100%; 
  }

 & .rightNews{
  text-align: center;
    flex:2;
    margin-top:2%;
    margin-right:2%;
    border: 2px solid green;
    border-radius: 25px;
    height:10%;
    cursor: pointer;
  }

   .rightImg{
    width: 100%;
    border-radius: 25px;
  }

  & .imgDiv {
    padding: 20px ;
    margin: auto;
    width: 80%;
    & img {
      width: 100%;
      object-fit: contain;
    }
  }
 
  }
  & .content {
    text-align: justify;
    font-size: 1.2rem;
    line-height: 2;
    margin-left:5%;
    margin-right:5%;
  }
  .date{
    margin-left:5%;
    margin-top:2%;
  }
`;

export { Main };