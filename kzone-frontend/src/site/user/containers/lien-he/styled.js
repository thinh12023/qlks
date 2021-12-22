import styled from "styled-components/macro";
import img from "resources/images/social.jpeg";

const Main = styled.div`
& .contain{
    width:100%;
    height:405px;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: cover;  
    margin-top:30px;
    filter: brightness(80%);
}

& .title{
    font-size:1.6rem;
    color:#9d5e00;
    margin-left:580px;
    font-weight:500;
}

& .sizes{
    font-size:1.4rem;
    color: #0090da;
}

& .social {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom:30px;
    margin-left:500px;
    color: #0090da;
    
    svg {
      cursor: pointer;
      font-size: 3.3rem;
    }
    
}
`;

export { Main };