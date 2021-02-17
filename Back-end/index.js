const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const PORT = process.env.PORT | 5000;
const app =express()
const server = http.createServer(app);
const router = require('./router');
const cors = require('cors')


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
    console.log("we have a new connection")

    //when user left
    socket.on('disconnet',()=>{
        console.log("user has left")
    });

})

server.listen(PORT,()=>{
    console.log(`server has started on the port ${PORT}`)
})

