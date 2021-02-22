import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
// import {Colors} from '../style'

const OuterComponent = styled.div`
   display:flex;
   flex-direction:column;
   height:100vh;
   width:100vw;
   /* border:1px solid red; */
   margin:0px;
   background: #201e20;
   align-items:center;
   justify-content:space-around; 
`;
const InnerComponent = styled.div`
   display:flex;
   flex-direction:column;
   justify-content:space-around;
   align-items:center;
   height:39rem;
   width:60rem;
   /* border:1px solid red; */

   background:#aed6dc;
   /* margin-top:-25rem; */
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
const HeadingComponent = styled.div`
     /* border:1px solid white; */
     height:10rem;
     width:80rem;
     font-size:${props=>props.size?props.size:"4rem"};
     align-items:center;
     text-align:center;
     color:${props=>props.color?props.color:"white"};
     /* margin-top:${props=>props.margin?props.margin:"-10rem"};; */
     
    
`
const Heading = styled.div`
margin-top:6.5rem;
flex:1;
`;
const JoinComp = styled.div`
flex:2;
`;
function Join() {
    const[name, setName] = useState('');
    const[room, setRoom] = useState('');
    console.log(name,room);
    const onHandle = ()=>{
       window.alert("One or the other option is Empty!!!")
    }
    return (
        <>
            <OuterComponent>
                <Heading>
                <HeadingComponent size="8rem"> Friendly Chat Room</HeadingComponent>
                <HeadingComponent size="2rem"  color="#d2601a"> (New Chat Room will be created if No Room Found)</HeadingComponent>
                </Heading>
                <JoinComp>
              <InnerComponent>
                 <h1>Join Room</h1>
                 <input type="text" placeholder="Enter Your Name" id = "Name" value={name} onChange={e=>setName(e.target.value)} />
                 <input type="text" placeholder="Enter Room Name" id = "Room" value={room} onChange={e=>setRoom(e.target.value)} />
                 <Link onClick={event=> (!name || !room) ? (event.preventDefault(), onHandle()): null}   to={`/chat?name=${name}&room=${room}`}><button>Enter</button></Link>
              </InnerComponent>
              </JoinComp>
            </OuterComponent>
        </>
    )
}

export default Join
