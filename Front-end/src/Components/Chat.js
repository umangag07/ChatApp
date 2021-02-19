import React,{useEffect, useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;
 
function Chat({location}) {
    const[name, setName] = useState('');
    const[room, setRoom] = useState('');
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

    },[ENDPOINT, location.search])
    return (
        <div>
            chat compo
        </div>
    )
}

export default Chat
