import styled from "styled-components/macro";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-y: auto;
  
  .fontColor{
    color:#0090da;
    font-size: 1.1rem;
  }
   
  .border{
    color:#0090da;
    border: 10px solid #0090da;
  }

  .Buttons_accept{
    display:flex;
    flex-direction: row;
    width:50%;
    font-size:1.2 rem;
    background-color:#32CD32;
    margin-left:10px;
    align-items: center;
    border-radius:10px;
    cursor: pointer;
  }

  .Buttons_reject{
    display:flex;
    flex-direction: row;
    width:50%;
    font-size:1.2 rem;
    background-color:#ff3232;
    margin-left:10px;
    align-items: center;
    border-radius:10px;
    cursor: pointer;
  }

  .btnRow{
    display:flex;
    flex-direction: row;
    font-size:1.2 rem;

  }
  & button {
    margin-bottom: 5px;
    margin-right: 5px;
    width: 50%;
    font-size: 1rem;
    font-weight: 550;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  & .name {
    color: #0459ba;
    font-size: 1.1rem;
    background-color:#d5ab4f;
    border-radius:5px;
    
    margin-bottom: 10px;
    padding: 5px 10px;
    & span {
      font-size: 1.3rem;
      font-weight: 600;
      text-align: center;
      width:100% ;
    }
  }
`;

export { Main };