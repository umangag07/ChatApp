import React,{useEffect, useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;
 
function Chat({location}) {
    const[name, setName] = useState('');
    const[room, setRoom] = useState('');
    const[message, setMessage] = useState(''); // for single message
    const[messages, setMessages] = useState([]);  // array of all the messages
    const  ENDPOINT = 'localhost:5000';
    useEffect(()=>{
            
        // getting the data from the url 
        // one way const Data = queryString.parse(location.search);
        const {name, room} = queryString.parse(location.search);
        
        // setting the instance of the socket
        socket = io(ENDPOINT);
        console.log(socket);
        setName(name);
        setRoom(room);   
        socket.emit('Join',{name, room},()=>{
            //  alert("callback called")
        }); 

        // return is for unmounting the component
        
        return ()=>{
            // it disconnect when component is unmounted
            //  socket.emit('disconnect');
            // it will turn off the connection for the person who joined
            socket.off();
        }

    },[ENDPOINT, location.search]);
 
    // 2nd useeffect for handling messages
    useEffect(()=>{
        socket.on('message',(message)=>{
        setMessages(...messages,message);
        })  

    },[messages]);

    // function for sending messages
    const sendMessage = (event)=>{
        setMessages(message);
        // event.preventDefault();
        if(message){
        socket.emit('sendMessage', message ,()=> setMessage(''));
        }
    } 
    console.log(message,"---Messagesarray:",messages);
    return (
        <div className="outerComponent">
           <div className="component">
            <input 
               type="text" 
               value = {message} 
               onChange={(event)=>setMessage(event.target.value)}
               onkeypress={event => event.Key === 'Enter' ? sendMessage(event) :null} />
               
            </div>           
        </div>
    )
}

export default Chat
