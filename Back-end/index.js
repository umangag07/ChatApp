const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const PORT = process.env.PORT | 5000;
const app =express()
const server = http.createServer(app);
const router = require('./router');
const cors = require('cors')
const {addUser, removeUser, getUser, getUserInRoom} = require('./Users')


// using socket io instance instead of http request
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

// using middleware 
app.use(router);
app.use(cors());

// managing the socket that is connected
io.on('connection',(socket)=>{
    console.log("we have a new connection");
    

    socket.on('Join',({name, room},callback)=>{
         //console.log(name, room)
          
         const {error, user} = addUser({id:socket.id, name, room});

         if(error){
           return console.log(error);
         }
         //emitting the message from the admin tjo user that oined
         socket.emit('message', {user:'admin', text:`${user.name} welcome to the room named ${user.room}`})
         
         // Giving message to everyone in room
         socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined`})
         // user joining the room
         socket.join(user.room);

         callback();
    })

  socket.on('sendMessage',({message, callback})=>{
       const user = getUser(socket.id);
       io.to(user.room).emit('message',{user:user.name, text:message});
       callback(); // to do something on the front end after the message is sent
  })

    //when user left
    socket.on('disconnect',()=>{
        console.log("user has left")
    });

})

server.listen(PORT,()=>{
    console.log(`server has started on the port ${PORT}`)
})

