import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import styled from "styled-components";
import './chat.css'
import Index from "../GetAllUserInRoom/Index";


const OuterComponent = styled.div`
      height:100vh;
      width:100vw;
      background: #201e20;
      display:flex;
      justify-content:center;
      align-items:center;
`;
const InnerComponent = styled.div`
      height:85vh;
      width: 90vw;
      /* background: white; */
      display:flex;
      border:1px solid red;
      @media(max-width:768px){
        height:100vh;
        width:100vw;
        justify-content:center;
      }
`;  
const ChatComponent = styled.div`
      height:85vh;
      width:50vw;
      /* background: white; */
      display:flex;
      border:1px solid cyan;
      @media(max-width:768px){
        height:100vh;
        width:100vw;
      }
      
`;  
const OnlineComponent = styled.div`
     
      height:85vh;
      width:40vw;
      /* background: white; */
      display:flex;
      border:1px solid white;
      font-family: 'Quicksand', sans-serif;
    
      @media(max-width:768px){
        display:none;

      }
      h1{
        color:white;
        font-size:4.5rem;
        
      }

`;  






let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState(""); // for single message
  const [messages, setMessages] = useState([]); // array of all the messages
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    // getting the data from the url
    // one way const Data = queryString.parse(location.search);
    const { name, room } = queryString.parse(location.search);

    // setting the instance of the socket
    socket = io(ENDPOINT);
    // console.log(socket);
    setName(name);
    setRoom(room);
    socket.emit("Join", { name, room }, () => {
      //  alert("callback called")
    });

    // return is for unmounting the component

    return () => {
      // it disconnect when component is unmounted
      //  socket.emit('disconnect');
      // it will turn off the connection for the person who joined
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // 2nd useeffect for handling messages
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("AllUserInRoom",(users) =>{
      setUsers(users);
    })
  }, []);

  //function for sending messages
  const sendMessage = (event) => {
    // console.log(event.Key)
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        return setMessage("");
      });
    }
  };

  console.log(messages);
  return (
    <>
      <OuterComponent>
          <InnerComponent>
             <ChatComponent></ChatComponent>
             <OnlineComponent> 
               <h1> Online People In The Room-:</h1>
               {/* <Index AllUsers = {users}></Index> */}
             </OnlineComponent>
        </InnerComponent>
     </OuterComponent>
    </>
  );
}

export default Chat;

/* <input
type="text"
value={message}
onChange={(event) => setMessage(event.target.value)}
onKeyPress={(event) =>
  event.code === "Enter" ? sendMessage(event) : null
}
/> */
