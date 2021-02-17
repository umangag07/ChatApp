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

    })
    return (
        <div>
            chat compo
        </div>
    )
}

export default Chat
