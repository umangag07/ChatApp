import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const OuterComponent = styled.div`
   display:flex;
   height:100vh;
   width:100vw;
   /* border:1px solid red; */
   margin:0px;
   background: #201e20;
   align-items:center;
   justify-content:center; 
  

`;
const InnerComponent = styled.div`
   display:flex;
   flex-direction:column;
   justify-content:space-around;
   align-items:center;
   height:35rem;
   width:55rem;
   /* border:1px solid red; */
   margin:0px;
   background:#aed6dc;
    
   /* @media(max-width:810px){
       
    } */
   h1{
       font-size:5.5rem;
     
   }
   input{
       width:50rem;
       height:5.7rem;
       border-radius:10px;
       box-shadow:0px;
       font-size:1.9rem;
       color:#d2601a;
       letter-spacing:2px;
       font-weight:500;
       border:0;
       ::placeholder{
           color:#4a536b;
           letter-spacing:2px;
           font-size:1.7rem;
           
       }
      
   }
   button{
       height:4.5rem;
       width:20rem;
       border-radius:10px;
       background-color: #201e20;
       color:#aed6dc;
       border:0;
      
   }
   
   
 
`;
function Join() {

    const[name, setName] = useState('');
    const[room, setRoom] = useState('');
    return (
        <>
            <OuterComponent>
              <InnerComponent>
                 <h1>Join Room</h1>
                 <input type="text" placeholder="Enter Your Name" id = "Name" />
                 <input type="text" placeholder="Enter Room Name" id = "Room" />
                 <Link to="/chat"><button>Enter</button></Link>
              </InnerComponent>
            </OuterComponent>
        </>
    )
}

export default Join
