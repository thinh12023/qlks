import styled from "styled-components/macro";

const Main = styled.div`
  
 


  & .title {
    font-size: 1.5rem;
    font-weight: 550;
    color: #de8500;
    margin-bottom:20px;
  }
  
  & .room {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px 0px;   
    width: 100%;
    background-color:#ffffff;
    & .desc {
      font-size: 1.2rem;
      font-weight: 300;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    & .list__rooms {
      width: 70%;
      display: flex;
      flex-direction: row;
      justify-content: space-around	;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  & .roomNews {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px 0px;   
    width: 100%;
    background-color:#E2F2DA;
    & .desc {
      font-size: 1.2rem;
      font-weight: 300;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    & .list__rooms {
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly	;
      align-items: center;     
    }
    & .newsContents{
      width:30%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly	;
      align-items: center;  
      text-align: center;
      overflow: hidden;

    }
  }

  & .roomInner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px 0px;   
    width: 100%;
    background-color:#BBE1DE;
    & .desc {
      font-size: 1.2rem;
      font-weight: 300;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    & .list__rooms {
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly	;
      align-items: center;     
     
    }
  }

  & .roomEvents {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px 0px;   
    width: 100%;
    background-color:#E2F2DA;
    & .desc {
      font-size: 1.2rem;
      font-weight: 300;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    & .list__rooms {
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly	;
      align-items: center;     
     
    }
  }


  & .roomServices {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px 0px;   
    width: 100%;
    background-color:#BBE1DE;
    & .desc{
      font-size: 1.2rem;
      font-weight: 300;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    & .list__rooms {
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly	;
      align-items: center;     
    }
  }
  

 
`;


export { Main };